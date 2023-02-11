using Microsoft.EntityFrameworkCore;
using Repository.Configuration;
using RoastedCoffeeAccountingSystem.Models;

public class RepositoryContext : DbContext
{
    public RepositoryContext(DbContextOptions options)
    : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<GreenCoffee>? GreenCoffee { get; set; }
    public DbSet<Roasting>? Roastings { get; set; }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var today = DateTime.Now.Date;

        foreach (var changedEntity in ChangeTracker.Entries())
            if (changedEntity.Entity is Roasting entity)
                if (changedEntity.State == EntityState.Added)
                    entity.Date = today;

        var result = await base.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        return result;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new GreenCoffeeConfiguration());
        modelBuilder.ApplyConfiguration(new RoastingConfiguration());
    }
}
