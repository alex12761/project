namespace pasha.Models;

public class TelegramUserUpdate
{
    public long ChatId { get; set; }
    public bool NeedSend { get; set; }
}