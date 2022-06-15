using Microsoft.EntityFrameworkCore;
using pasha.Models;

namespace pasha.Contexts;

public class DishContext : DbContext
{
    public DishContext(DbContextOptions<DishContext> options): base(options)
    {
    }

    public DbSet<Dish> Dishes { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Address> Addresses { get; set; }
}