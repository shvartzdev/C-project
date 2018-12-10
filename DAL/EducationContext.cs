using Microsoft.EntityFrameworkCore;
using Education.Models;

namespace Education.DAL
{
    public class EducationContext : DbContext
    {
        public EducationContext(DbContextOptions<EducationContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
    }
}