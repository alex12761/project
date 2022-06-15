using System.Net;
using System.Net.Mail;

namespace pasha.Services.Notification;

public class EmailNotify :INotify
{
    public void Notify(string text)
    {
        MailMessage message = new MailMessage();  
        SmtpClient smtp = new SmtpClient();  
        message.From = new MailAddress("arhipov_sasha127@mail.ru");  
        message.To.Add(new MailAddress("arhipov_sasha127@mail.ru"));  
        message.Subject = "Test";  
        message.IsBodyHtml = true; //to make message body as html  
        message.Body = text;  
        smtp.Port = 587;  
        smtp.Host = "smtp.mail.ru"; //for gmail host  
        smtp.EnableSsl = true;  
        smtp.UseDefaultCredentials = false;  
        smtp.Credentials = new NetworkCredential("arhipov_sasha127@mail.ru", "");  
        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;  
        smtp.Send(message);  
    }

    public string GetUpdates()
    {
        throw new NotImplementedException();
    }
}