using System.ComponentModel.DataAnnotations;
using BMTools;

namespace Assignment2.ViewModels;

public class PasswordViewModel
{
    [Display(Name="Enter Old Password:")]
    public string OldPassword { get; set; }

    [Display(Name = "Enter New Password:")]
    public string NewPassword { get; set; }

    [Display(Name = "Confirm New Password:")]
    public string ConfirmPassword { get; set; }
}
