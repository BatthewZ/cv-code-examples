using BMTools;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment2.Data.Models;

public class LoginModel
{
    [Key, StringLength(8), Column(TypeName = "nchar"),
        RegularExpression(RegexPattern.EIGHT_DIGITS, ErrorMessage = "Login must be 8 digits.")]
    public string LoginID { get; set; }

    [Required]
    public int CustomerID { get; set; }
    public virtual CustomerModel Customer { get; set; }

    [Required,
        StringLength(64), 
        Column(TypeName = "nchar"),
        Display(Name = "Password"),
        RegularExpression(@"^[!-~]{64}$", ErrorMessage = "Password Hash is invalid.")]
    public string PasswordHash { get; set; }

    public bool IsFrozen { get; set; } = false;
}
