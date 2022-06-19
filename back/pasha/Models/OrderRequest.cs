namespace pasha.Models;

public class OrderRequest
{
    public string userData { get; set; }
    public string Address { get; set; }
    public Dictionary<string, int> Dishes { get; set; }
}