﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RoastedCoffeeAccountingSystem.Models;

#nullable disable

namespace RoastedCoffeeAccountingSystem.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20230115094139_RoastingDateGenerationAndCoffeeConstraintsAdded")]
    partial class RoastingDateGenerationAndCoffeeConstraintsAdded
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RoastedCoffeeAccountingSystem.Models.GreenCoffee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Region")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Variety")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("GreenCoffee");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Country = "Brazil",
                            Region = "Santos",
                            Variety = "Arabica",
                            Weight = 59.5
                        },
                        new
                        {
                            Id = 2,
                            Country = "Columbia",
                            Region = "Excelso",
                            Variety = "Arabica",
                            Weight = 70.0
                        },
                        new
                        {
                            Id = 3,
                            Country = "Uganda",
                            Variety = "Robusta",
                            Weight = 20.0
                        });
                });

            modelBuilder.Entity("RoastedCoffeeAccountingSystem.Models.Roasting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<int>("CoffeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("Date");

                    b.HasKey("Id");

                    b.HasIndex("CoffeeId");

                    b.ToTable("Roastings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 8.1199999999999992,
                            CoffeeId = 1,
                            Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            Amount = 4.0199999999999996,
                            CoffeeId = 2,
                            Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("RoastedCoffeeAccountingSystem.Models.Roasting", b =>
                {
                    b.HasOne("RoastedCoffeeAccountingSystem.Models.GreenCoffee", "Coffee")
                        .WithMany()
                        .HasForeignKey("CoffeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coffee");
                });
#pragma warning restore 612, 618
        }
    }
}
