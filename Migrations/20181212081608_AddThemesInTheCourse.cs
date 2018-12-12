using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class AddThemesInTheCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Themes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Themes_CourseId",
                table: "Themes",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Themes_Courses_CourseId",
                table: "Themes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Themes_Courses_CourseId",
                table: "Themes");

            migrationBuilder.DropIndex(
                name: "IX_Themes_CourseId",
                table: "Themes");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Themes");
        }
    }
}
