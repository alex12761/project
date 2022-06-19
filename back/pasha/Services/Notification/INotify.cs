namespace pasha.Services.Notification;

public interface INotify
{
    public void Notify(string text);

    public string GetUpdates();
}