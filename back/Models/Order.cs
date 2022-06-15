using System.ComponentModel.DataAnnotations.Schema;

namespace pasha.Models;

public class Order
{
    public int Id { get; set; }
    public string UserData { get; set; }
    public string DishesData { get; set; }
    public string AddressData { get; set; }
}