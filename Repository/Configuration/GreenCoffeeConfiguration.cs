﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoastedCoffeeAccountingSystem.Models;

namespace Repository.Configuration
{
    public class GreenCoffeeConfiguration : IEntityTypeConfiguration<GreenCoffee>
    {
        public void Configure(EntityTypeBuilder<GreenCoffee> builder)
        {
            builder.HasData
            (
                new GreenCoffee
                {
                    Id = 1,
                    Variety = "Arabica",
                    Country = "Brazil",
                    Region = "Santos",
                    Weight = 59.5,
                    IsExhausted = false
                },
                new GreenCoffee
                {
                    Id = 2,
                    Variety = "Arabica",
                    Country = "Columbia",
                    Region = "Excelso",
                    Weight = 70,
                    IsExhausted = false
                },
                new GreenCoffee
                {
                    Id = 3,
                    Variety = "Robusta",
                    Country = "Uganda",
                    Region = null,
                    Weight = 20,
                    IsExhausted = true
                }
            );
        }
    }
}
