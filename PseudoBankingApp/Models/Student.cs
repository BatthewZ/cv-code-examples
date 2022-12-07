using BensToolbox;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace s3851558_a3.Models;

public class Student
{
    [StringLength(8),
     DatabaseGenerated(DatabaseGeneratedOption.None),
     RegularExpression(MyRegex.STUDENT_ID, ErrorMessage = "Student ID must start with lower case 's' followed by 7 digits, ie: s1234567.")]
    public string StudentID { get; set; }

    [Required,
     MaxLength(30),
     RegularExpression(MyRegex.CAPITAL_FIRST_LETTER, ErrorMessage = "Must have alphabet characters only. Must start with a capital letter.")]
    public string FirstName { get; set; }

    [Required,
     MaxLength(30),
     RegularExpression(MyRegex.CAPITAL_FIRST_LETTER, ErrorMessage = "Must have alphabet characters only. Must start with a capital letter.")]
    public string LastName { get; set; }

    [Required, MaxLength(320), RegularExpression(MyRegex.EMAIL, ErrorMessage = "Must be a valid email address!")]
    public string Email { get; set; }

    [StringLength(10), RegularExpression(MyRegex.MOBILE_PHONE, ErrorMessage = "Must begin with 04, followed by 8 digits. No spaces or other characters permitted.")]
    public string? MobilePhone { get; set; }

    public virtual List<Enrolled> Enrolments { get; set; }

}
