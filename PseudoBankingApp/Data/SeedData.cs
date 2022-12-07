using Newtonsoft.Json.Linq;
using s3851558_a3.Models;

namespace s3851558_a3.Data;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider) 
    {
        var context = serviceProvider.GetRequiredService<SchoolDatabase>();
        if (context.Students.Any() || context.Courses.Any())
            return;


        Console.WriteLine("Seeding:");
        Console.WriteLine("Loading...");
        context.Courses.AddRange(new Course
        {
           CourseID = "COSC2276",
           Title = "How to Lose Friends and Alienate People",
           CreditPoints = 12,
           Career = "Postgraduate",
           Coordinator = "Someone Unlikeable"
        },
        new Course
        {
            CourseID = "COSC2277",
            Title = "School of Rock",
            CreditPoints = 12,
            Career = "Undergraduate",
            Coordinator = "Jack Black"
        });

        context.Students.AddRange(new Student
        {
            StudentID = "s1234567",
            FirstName = "Charlie",
            LastName = "Hankington",
            Email = "some@email.com.au",
            MobilePhone = "0411666444"
        },
        new Student
        {
            StudentID = "s7654321",
            FirstName = "Captain",
            LastName = "Codesalot",
            Email = "iam@sorryformyname.net",
        });

        context.Enrolled.AddRange(new Enrolled 
        { 
          StudentID = "s1234567",
          CourseID = "COSC2276"
        },
        new Enrolled
        {
          StudentID = "s7654321",
          CourseID = "COSC2276"
        },
        new Enrolled
        {
         StudentID = "s1234567",
         CourseID = "COSC2277"
        });

        Console.WriteLine("Saving changes...");
        context.SaveChanges();
    }
}
