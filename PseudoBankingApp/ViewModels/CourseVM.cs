using BensToolbox;
using s3851558_a3.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace s3851558_a3.ViewModels;

public class CourseVM
{
    [Range(1000, 9999, ErrorMessage = "ID must be four digits long."),Display(Name = "Course ID")]
    public int CourseID { get; set; }

    [Required, MaxLength(100), MinLength(1)]
    public string Title { get; set; }

    [Required, Range(1, 12, ErrorMessage = "Please select a number!")]
    public int CreditPoints { get; set; }

    [Required, RegularExpression(MyRegex.CAREER, ErrorMessage = "Please select 'Postgraduate' or 'Undergraduate'")]
    public string Career { get; set; }

    [Required, MaxLength(50), RegularExpression(@"^[a-zA-Z ]+$")]
    public string Coordinator { get; set; }



}
