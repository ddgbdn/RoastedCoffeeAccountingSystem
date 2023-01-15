

using Microsoft.EntityFrameworkCore;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<GreenCoffee> GreenCoffee { get; set; } = null!;
        public DbSet<Roasting> Roastings { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { 

        }

    }
}
