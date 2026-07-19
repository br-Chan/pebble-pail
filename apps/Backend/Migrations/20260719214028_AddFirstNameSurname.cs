using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFirstNameSurname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Friends",
                newName: "Surname");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Friends",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Friends",
                newName: "Name");
        }
    }
}
