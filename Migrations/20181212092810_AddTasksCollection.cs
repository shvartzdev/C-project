using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class AddTasksCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ThemeID",
                table: "Tasks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ThemeID",
                table: "Tasks",
                column: "ThemeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Themes_ThemeID",
                table: "Tasks",
                column: "ThemeID",
                principalTable: "Themes",
                principalColumn: "ThemeID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Themes_ThemeID",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ThemeID",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ThemeID",
                table: "Tasks");
        }
    }
}
