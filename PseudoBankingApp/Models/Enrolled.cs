using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace s3851558_a3.Models;

public class Enrolled
{
    [Key, Required]
    public string CourseID { get; set; }
    public virtual Course Course { get; set; }

    [Key, Required]
    public string StudentID { get; set; }
    public virtual Student Student { get; set; }
}
