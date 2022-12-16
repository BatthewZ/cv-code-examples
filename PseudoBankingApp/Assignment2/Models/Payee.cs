namespace Assignment2.Data.Models;

using BMTools;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PayeeModel
{
    [Key, Display(Name = "PayeeID")]
    public int ID { get; set; }

    [Required, StringLength(50)]
    public string Name { get; set; }

    [Required, StringLength(50)]
    public string Address { get; set; }

    [Required, StringLength(40)]
    public string City { get; set; }

    [Required, StringLength(3), MinLength(2),
     RegularExpression(RegexPattern.AUS_REGIONS, ErrorMessage = "Payee: Must be a valid Australian state or territory: " + RegexPattern.AUS_REGIONS)]
    public string State { get; set; }

    [Required, StringLength(4),
        RegularExpression(RegexPattern.FOUR_DIGITS, ErrorMessage = "PostCode must be four digits.")]
    public string PostCode { get; set; }

    [Required, StringLength(14),
        RegularExpression(RegexPattern.PHONE_NUMBER, ErrorMessage = "Invalid phone number format. Must be: (0X) XXXX XXXX")]
    public string Phone { get; set; }
}
