using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoastedCoffeeAccountingSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedViaConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 2, 9, 23, 34, 51, 963, DateTimeKind.Local).AddTicks(9898));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 2, 9, 23, 34, 51, 963, DateTimeKind.Local).AddTicks(9911));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 2, 9, 23, 21, 47, 218, DateTimeKind.Local).AddTicks(3780));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 2, 9, 23, 21, 47, 218, DateTimeKind.Local).AddTicks(3788));
        }
    }
}
