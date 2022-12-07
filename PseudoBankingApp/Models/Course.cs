using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BensToolbox;

namespace s3851558_a3.Models;

public class Course
{
    [StringLength(8), DatabaseGenerated(DatabaseGeneratedOption.None),
     RegularExpression(MyRegex.COURSE_ID, ErrorMessage = "Course ID must be 'COSC' followed by 4 digits, ie: COSC1234"),
     Display(Name = "CourseID")]
    public string CourseID { get; set; }

    [Required, MaxLength(100), MinLength(1)]
    public string Title { get; set; }

    [Required, Range(1, 12, ErrorMessage = "Amount must be between {0} and {1} (inclusive).")]
    public int CreditPoints { get; set; }

    [Required, MaxLength(30),
        RegularExpression(MyRegex.CAREER, ErrorMessage = "Career must be 'Postgraduate' or 'Undergraduate'")]
    public string Career { get; set; }

    [Required, MaxLength(50), RegularExpression(MyRegex.COORDINATOR_NAME, ErrorMessage = "Coordinator's name must start with a capital letter, and only contain alphabet characters and spaces.")]
    public string Coordinator { get; set; }

    public virtual List<Enrolled> Enrolments { get; set; }
}
