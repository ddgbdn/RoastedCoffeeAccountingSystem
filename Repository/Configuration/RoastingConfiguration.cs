using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoastedCoffeeAccountingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Configuration
{
    public class RoastingConfiguration : IEntityTypeConfiguration<Roasting>
    {
        public void Configure(EntityTypeBuilder<Roasting> builder)
        {
            builder.HasData
            (
                new Roasting
                {
                    Id = 1,
                    Amount = 8.12,
                    CoffeeId = 1,
                    Date = DateTime.Now
                },
                new Roasting
                {
                    Id = 2,
                    Amount = 4.02,
                    CoffeeId = 2,
                    Date = DateTime.Now
                }
            );
        }
    }
}
