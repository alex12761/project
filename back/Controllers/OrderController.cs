using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pasha.Contexts;
using pasha.Models;
using pasha.Services.Notification;

namespace pasha.Controllers;

public class OrderController : Controller
{
    private DishContext _dishContext;
    private UserContext _userContext;
    
    private TelegramNotify _notify;
    
    public OrderController(DishContext dishContext, TelegramNotify notify, UserContext userContext)
    {
        _dishContext = dishContext;
        _notify = notify;
        _userContext = userContext;
    }
    
    [HttpPost]
    [Route("placeorder")]
    // [Authorize]
    [AllowAnonymous]
    public Order PlaceOrder([FromBody] OrderRequest order)
    {
        var newOrder = new Order();
        // var userName = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
        // var user = _userContext.Users.FirstOrDefault(x => x.UserName.Equals(userName));

        newOrder.Id = _dishContext.Orders.Count() > 0 ? _dishContext.Orders.Max(x => x.Id) + 1 : 1;
        var newLine = Environment.NewLine;
        newOrder.AddressData = order.Address;
        newOrder.UserData = order.userData;
        var listDishes = new List<string>();
        foreach (var dish in order.Dishes)
        {
            listDishes.Add($"{dish.Key} = {dish.Value}");
        }
        newOrder.DishesData = string.Join(Environment.NewLine, listDishes);

        _dishContext.Orders.Add(newOrder);
        _dishContext.SaveChanges();
        _notify.Notify(newOrder);
        return newOrder;
    }
}