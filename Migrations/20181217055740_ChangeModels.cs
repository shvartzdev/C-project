using Microsoft.EntityFrameworkCore.Migrations;

namespace Education.Migrations
{
    public partial class ChangeModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Themes_ThemeID",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Themes_Courses_CourseId",
                table: "Themes");

            migrationBuilder.DropIndex(
                name: "IX_Themes_CourseId",
                table: "Themes");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ThemeID",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "ThemeID",
                table: "Tasks",
                newName: "ThemeId");

            migrationBuilder.AlterColumn<int>(
                name: "CourseId",
                table: "Themes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ThemeId",
                table: "Tasks",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThemeId",
                table: "Tasks",
                newName: "ThemeID");

            migrationBuilder.AlterColumn<int>(
                name: "CourseId",
                table: "Themes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ThemeID",
                table: "Tasks",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Themes_CourseId",
                table: "Themes",
                column: "CourseId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Themes_Courses_CourseId",
                table: "Themes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
