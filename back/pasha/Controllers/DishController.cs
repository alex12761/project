using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pasha.Contexts;
using pasha.Models;
using pasha.Services;

namespace pasha.Controllers;

[ApiController]
[Route("/dish")]
public class DishController : Controller
{
    private readonly DishContext _dishContext;

    public DishController(DishContext dishContext)
    {
        _dishContext = dishContext;
    }

    [HttpPost]
    // [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public Dish Create([FromBody] Dish newDish)
    {
        var dishes = _dishContext.Dishes;
        newDish.Id = dishes.Count() > 0 ? dishes.Max(x => x.Id) + 1 : 1;
        var dish = _dishContext.Dishes.Add(newDish).Entity;
        _dishContext.SaveChanges();
        return dish;
    }

    [HttpGet]
    [Route("{id:int:min(1)}")]
    [AllowAnonymous]
    public Dish Get(int id)
    {
        return _dishContext.Dishes.FirstOrDefault(x => x.Id == id);
    }

    [HttpGet]
    [Route("get")]
    [AllowAnonymous]
    public List<Dish> Get(string category)
    {
        if (category.Equals("all"))
            return _dishContext.Dishes.ToList();
        return _dishContext.Dishes.Where(x => x.Category.Equals(category)).ToList();
    }
    
    [HttpGet]
    // [Route("get")]
    [AllowAnonymous]
    public List<Dish> Get(int _end, string _order, string _sort, int _start)
    {
        var countAllDishes = _dishContext.Dishes.Count();
        var newEnd = _end > countAllDishes ? countAllDishes: _end;
        var dishes = _dishContext.Dishes.ToList()
            .GetRange(_start, newEnd - _start);
        Response.Headers.Add("Access-Control-Expose-Headers", "X-Total-Count");
        Response.Headers.Add("X-Total-Count", countAllDishes.ToString());
        return dishes;
    }

    [HttpPut]
    // [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public Dish Update([FromBody] Dish newDish)
    {
        var oldDish = _dishContext.Dishes.FirstOrDefault(x => x.Id == newDish.Id);
        if (oldDish == null)
            return null;
        oldDish.Category = newDish.Category;
        oldDish.Description = newDish.Description;
        oldDish.Title = newDish.Title;
        oldDish.Image = newDish.Image;
        oldDish.Price = newDish.Price;
        oldDish.Rating = newDish.Rating;
        _dishContext.SaveChanges();

        return newDish;
    }

    [HttpDelete]
    [Route("{id:int:min(1)}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public bool Delete(int id)
    {
        var dish = _dishContext.Dishes.FirstOrDefault(x => x.Id == id);
        if (dish == null)
            return false;
        _dishContext.Dishes.Remove(dish);
        _dishContext.SaveChanges();
        return true;
    }
}