

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
            Database.EnsureCreated();
        }

        public override int SaveChanges()
        {
            var today = DateTime.Now.Date;

            foreach(var changedEntity in ChangeTracker.Entries())
                if (changedEntity.Entity is Roasting entity) 
                    if (changedEntity.State == EntityState.Added)
                        entity.Date = today;
            
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var brazilSantos = new GreenCoffee { Id = 1, Variety = "Arabica", Country = "Brazil", Region = "Santos", Weight = 59.5 };
            var columbiaExcelso = new GreenCoffee { Id = 2, Variety = "Arabica", Country = "Columbia", Region = "Excelso", Weight = 70 };
            var Uganda = new GreenCoffee { Id = 3, Variety = "Robusta", Country = "Uganda", Weight = 20 };

            var firstRoasting = new Roasting { Id = 1, Amount = 8.12, CoffeeId = 1, Date = DateTime.Now};
            var secondRoasting = new Roasting { Id = 2, Amount = 4.02, CoffeeId = 2, Date = DateTime.Now };

            modelBuilder.Entity<GreenCoffee>().HasData(brazilSantos, columbiaExcelso, Uganda);
            modelBuilder.Entity<Roasting>().HasData(firstRoasting, secondRoasting);
        }
    }
}
