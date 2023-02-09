using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RoastedCoffeeAccountingSystem.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GreenCoffee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Variety = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true),
                    Region = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true),
                    Weight = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GreenCoffee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roastings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "Date", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CoffeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roastings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roastings_GreenCoffee_CoffeeId",
                        column: x => x.CoffeeId,
                        principalTable: "GreenCoffee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "GreenCoffee",
                columns: new[] { "Id", "Country", "Region", "Variety", "Weight" },
                values: new object[,]
                {
                    { 1, "Brazil", "Santos", "Arabica", 59.5 },
                    { 2, "Columbia", "Excelso", "Arabica", 70.0 },
                    { 3, "Uganda", "Uganda", "Robusta", 20.0 }
                });

            migrationBuilder.InsertData(
                table: "Roastings",
                columns: new[] { "Id", "Amount", "CoffeeId", "Date" },
                values: new object[,]
                {
                    { 1, 8.1199999999999992, 1, new DateTime(2023, 2, 9, 23, 21, 47, 218, DateTimeKind.Local).AddTicks(3780) },
                    { 2, 4.0199999999999996, 2, new DateTime(2023, 2, 9, 23, 21, 47, 218, DateTimeKind.Local).AddTicks(3788) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roastings_CoffeeId",
                table: "Roastings",
                column: "CoffeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roastings");

            migrationBuilder.DropTable(
                name: "GreenCoffee");
        }
    }
}
