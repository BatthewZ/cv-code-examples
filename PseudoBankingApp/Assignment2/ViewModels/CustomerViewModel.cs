using BMTools;
using System.ComponentModel.DataAnnotations;

namespace Assignment2.ViewModels;

public class CustomerViewModel
{
    [Required, Display(Name = "Customer Number")]
    public int ID { get; set; }

    [Required]
    public string Name { get; set; }
   
    [Display(Name = "Tax File Number")]
    public string? TFN { get; set; }
  
    [Display(Name = "Street Address")]
    public string? Address { get; set; }
 
    public string? City { get; set; }
  
    [Display(Name = "State or Territory")]
    public string? StateOrTerritory { get; set; }
  
    [Display(Name = "Australian Post Code")]
    public string? PostCode { get; set; }
  
    [Display(Name = "Australian Mobile Number")]
    public string? MobileNumber { get; set; }

    [Display(Name = "Account Status")]
    public bool LoginIsFrozen { get; set; } = false;
}
