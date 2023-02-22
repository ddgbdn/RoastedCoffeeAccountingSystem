using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RoastedCoffeeAccountingSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0864fa8e-2eb8-4501-9d29-8a3fa9eb22db", "b67426ef-912b-4d5d-8574-3dfde3103089", "Manager", "MANAGER" },
                    { "6e57b4fb-befe-41b3-b0bb-f0bdf2269ee1", "8ea4e933-6391-452d-bae7-7f74e19cdffc", "Viewer", "VIEWER" },
                    { "deb13067-ec9e-47a5-9bb0-571aac71fe23", "32413c53-d9d2-45f6-9a10-6fa232fa9736", "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 2, 22, 20, 35, 15, 56, DateTimeKind.Local).AddTicks(6688));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 2, 22, 20, 35, 15, 56, DateTimeKind.Local).AddTicks(6701));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0864fa8e-2eb8-4501-9d29-8a3fa9eb22db");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e57b4fb-befe-41b3-b0bb-f0bdf2269ee1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "deb13067-ec9e-47a5-9bb0-571aac71fe23");

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 2, 22, 18, 22, 47, 214, DateTimeKind.Local).AddTicks(4924));

            migrationBuilder.UpdateData(
                table: "Roastings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 2, 22, 18, 22, 47, 214, DateTimeKind.Local).AddTicks(4936));
        }
    }
}
