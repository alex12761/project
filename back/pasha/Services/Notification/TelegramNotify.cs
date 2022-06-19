using Microsoft.EntityFrameworkCore;
using pasha.Contexts;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Extensions.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using pasha.Models;
using File = System.IO.File;

namespace pasha.Services.Notification;

public class TelegramNotify : INotify
{
    private ITelegramBotClient _bot;
    private CancellationTokenSource _cts;
    private List<TelegramUser> _telegramUsers;
    private string _pathTelegramUsers = @"telegramUsers.json";

    public List<TelegramUser> TelegramUsers
    {
        get
        {
            return _telegramUsers;
        }
    }

    public bool ChangeUser(long chatId, bool needNotify)
    {
        var user = _telegramUsers.Where(x => x.ChatId.Equals(chatId)).FirstOrDefault();
        if (user != null)
        {
            user.NeedSend = needNotify;
            SaveChanges();
            return true;
        }

        return false;
    }
    
    public void Notify(string text)
    {
        var notifyUsers = _telegramUsers.Where(x => x.NeedSend);
        foreach (var user in notifyUsers)
        {
            _bot.SendTextMessageAsync(new ChatId(user.ChatId), text);
        }
    }
    
    public void Notify(Order order)
    {
        var notifyUsers = _telegramUsers.Where(x => x.NeedSend);

        var newLine = Environment.NewLine;

        var dishesData = order.DishesData.Replace("||", newLine);
        var addressData = order.AddressData.Replace("||", newLine);
        var userData = order.UserData.Replace("||", newLine);
        var text = $"Получен заказ №{order.Id}: {newLine}" +
                   $"{dishesData}{newLine}" +
                   $"{addressData}{newLine}" +
                   $"{userData}";
        
        foreach (var user in notifyUsers)
        {
            _bot.SendTextMessageAsync(new ChatId(user.ChatId), text);
        }
    }

    public string GetUpdates()
    {
        var qwe = _bot.GetUpdatesAsync();
        try
        {
            var text = qwe.Result.FirstOrDefault().Message.Text;
            Console.WriteLine(text);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            Console.WriteLine("no updates");
        }

        return "ok";
    }

    public TelegramNotify()
    {
        _bot = new TelegramBotClient("5233946390:AAEchdgM-3tqJhb44xaLMQ3CvjOEj5JW77I");
        _cts = new CancellationTokenSource();
        var jsonText = File.ReadAllText(_pathTelegramUsers);
        _telegramUsers =
            JsonConvert.DeserializeObject<List<TelegramUser>>(
                jsonText); //JObject.Parse(System.IO.File.ReadAllText(_pathTelegramUsers));
        Console.WriteLine(_telegramUsers.ToString());
        _bot.StartReceiving(
            updateHandler: HandleUpdateAsync,
            errorHandler: HandleErrorAsync,
            receiverOptions: new ReceiverOptions()
            {
                AllowedUpdates = Array.Empty<UpdateType>()
            },
            cancellationToken: _cts.Token);
    }

    ~TelegramNotify()
    {
        _cts.Cancel();
    }

    public static Task HandleErrorAsync(ITelegramBotClient botClient, Exception exception,
        CancellationToken cancellationToken)
    {
        var ErrorMessage = exception switch
        {
            ApiRequestException apiRequestException =>
                $"Telegram API Error:\n[{apiRequestException.ErrorCode}]\n{apiRequestException.Message}",
            _ => exception.ToString()
        };

        Console.WriteLine(ErrorMessage);
        return Task.CompletedTask;
    }

    public async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update,
        CancellationToken cancellationToken)
    {
        var handler = update.Type switch
        {
            UpdateType.Message => BotOnMessageReceived(update)
        };

        try
        {
            await handler;
        }
        catch (Exception exception)
        {
            await HandleErrorAsync(botClient, exception, cancellationToken);
        }
    }

    private void SaveChanges()
    {
        var outputText = JsonConvert.SerializeObject(_telegramUsers);
        System.IO.File.WriteAllText(_pathTelegramUsers, outputText);
    }
    
    private async Task BotOnMessageReceived(Update update)
    {
        var chatId = update.Message.Chat.Id;
        var message = update.Message.Text;
        var userName = update.Message.Chat.Username;
        _bot.SendTextMessageAsync(new ChatId(chatId), message);
        
        if (_telegramUsers.FirstOrDefault(x => x.ChatId == chatId) is null)
        {
            _telegramUsers.Add(new TelegramUser() {GivenName = userName, ChatId = chatId, NeedSend = false});
            SaveChanges();
        }
    }
}

public class TelegramUser
{
    public string GivenName { get; set; }
    public long ChatId { get; set; }
    public bool NeedSend { get; set; }
}