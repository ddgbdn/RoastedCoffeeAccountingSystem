using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RoastedCoffeeAccountingSystem.Migrations
{
    /// <inheritdoc />
    public partial class ExhaustedFieldAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsExhausted",
                table: "GreenCoffee",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "GreenCoffee",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsExhausted",
                value: false);

            migrationBuilder.UpdateData(
                table: "GreenCoffee",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsExhausted",
                value: false);

            migrationBuilder.UpdateData(
                table: "GreenCoffee",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsExhausted",
                value: false);

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 3, 2, 15, 39, 55, 629, DateTimeKind.Local).AddTicks(3149));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 3, 2, 15, 39, 55, 629, DateTimeKind.Local).AddTicks(3160));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "139f7b2a-5825-4a18-b9a4-f893141c866d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21cf4cd2-6c2c-4c45-a5ea-82155b8c9fde");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f83c269b-a8d2-4dbc-b841-dd84c809be90");

            migrationBuilder.DropColumn(
                name: "IsExhausted",
                table: "GreenCoffee");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0864fa8e-2eb8-4501-9d29-8a3fa9eb22db", "0185c9da-2c16-428b-a0c7-599a6ba06c17", "Manager", "MANAGER" },
                    { "6e57b4fb-befe-41b3-b0bb-f0bdf2269ee1", "9b5b23cf-411f-46d6-b274-24f13c76f4a2", "Viewer", "VIEWER" },
                    { "deb13067-ec9e-47a5-9bb0-571aac71fe23", "a103f5ac-b9b4-4d9a-a862-e3977cf34152", "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 2, 28, 19, 11, 34, 319, DateTimeKind.Local).AddTicks(1511));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 2, 28, 19, 11, 34, 319, DateTimeKind.Local).AddTicks(1524));
        }
    }
}
