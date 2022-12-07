using s3851558_a3.Models;
using System.ComponentModel.DataAnnotations;

namespace s3851558_a3.ViewModels;

public class EnrolStudentVM
{
    public List<Student>? Students { get; set; }
    public List<Course>? Courses { get; set; }

    [Required, RegularExpression(@"^[^\-1][a-zA-Z0-9]{7}$", ErrorMessage = "Please select a student!")]
    public string SelectedStudentID { get; set; } = "";

    [Required, RegularExpression(@"^[^\-1][a-zA-Z0-9]{7}$", ErrorMessage = "Please select a course!")]
    public string SelectedCourseID { get; set; } = "";
}
