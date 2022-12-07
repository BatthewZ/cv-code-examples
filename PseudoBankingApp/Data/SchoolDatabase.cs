using Microsoft.EntityFrameworkCore;
using s3851558_a3.Models;

namespace s3851558_a3.Data;

public class SchoolDatabase : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrolled> Enrolled { get; set; }
    
    public SchoolDatabase(DbContextOptions<SchoolDatabase> options) : base(options) { }

    // Set up composite key:
    protected override void OnModelCreating(ModelBuilder builder) 
    {
        base.OnModelCreating(builder);
        builder.Entity<Enrolled>().HasKey(x => new {x.StudentID, x.CourseID});
    }
}
