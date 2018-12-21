using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class AddStudentGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "Groups",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "GroupID",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupID",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Groups",
                newName: "GroupId");
        }
    }
}
