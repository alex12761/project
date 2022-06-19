using Microsoft.EntityFrameworkCore;
using pasha.Models;

namespace pasha.Contexts;

public class UserContext: DbContext
{
    public UserContext(DbContextOptions<UserContext> options): base(options)
    {
        // Database.SetInitializer(new MigrateDatabaseToLatestVersion<DishRepository>());
    }

    public DbSet<User> Users { get; set; }
}