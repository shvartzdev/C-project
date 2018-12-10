using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class CourseDuration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Courses",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Courses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Courses");
        }
    }
}
