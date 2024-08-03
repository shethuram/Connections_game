using Microsoft.EntityFrameworkCore;
using ConnectionGame.Models;

namespace ConnectionGame.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Scoreboard> Scoreboard { get; set; }
    }
}
