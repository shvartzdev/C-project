using Microsoft.EntityFrameworkCore;
using Education.Models;

namespace Education.DAL
{
    public class EducationContext : DbContext
    {
        public EducationContext(DbContextOptions<EducationContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<User> Users {get; set;}
        public DbSet<Role> Roles {get; set;}
        public DbSet<Group> Groups {get;set;}
        public DbSet<Theme> Themes {get;set;}
        public DbSet<Task> Tasks {get;set;}
    }
}