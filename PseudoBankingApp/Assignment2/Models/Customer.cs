using BMTools;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace Assignment2.Data.Models;

public class CustomerModel
{
    [NotMapped]
    int _id;
    [NotMapped]
    string _name;
    [NotMapped]
    string? _tfn;
    [NotMapped]
    string? _address;
    [NotMapped]
    string? _city;
    [NotMapped]
    string? _stateOrTerritory;
    [NotMapped]
    string? _postcode;
    [NotMapped]
    string? _mobileNumber;

    [Key, StringLength(4), DatabaseGenerated(DatabaseGeneratedOption.None),
     RegularExpression(RegexPattern.FOUR_DIGITS, ErrorMessage = "CustomerID must be 4 digits."),
        Display(Name = "CustomerID")]
    public int ID 
    { 
        get { return _id; }      
        set { if (value.IsValidID("CustomerID")) _id = value; } 
    }

    [Required, StringLength(50)]
    public string Name 
    {
        get { return _name; }
        set { _name = value.HasLengthUpTo(50) ?? _name; }
    }

    [StringLength(11), 
     RegularExpression(RegexPattern.TAX_FILE_NUMBER, ErrorMessage = "Tax File Number must be in the format: XXX XXX XXX")]
    public string? TFN
    {
        get { return _tfn; }
        set {
            if (string.IsNullOrEmpty(value))
                return;

            // If it's already formatted as a TFN
            if (Regex.IsMatch(value, RegexPattern.TAX_FILE_NUMBER))
            {
                _tfn = value;
                return;
            }
            // If it's tidied and parsed, attempt to format it. Leave it as it was if formatting fails.
            int tfnNum = 0;
            if (int.TryParse(value.Trim().Replace(" ", ""), out tfnNum))
            {
                _tfn = Formatter.FormatTfn(tfnNum) ?? _tfn;
                return;
            }
            Console.WriteLine("Customer: TFN was invalid; did not update.");
        }
    }

    [StringLength(50)]
    public string? Address
    {
        get { return _address; }
        set { _address = value.HasLengthUpTo(50); }
    }

    [StringLength(40)]
    public string? City
    {
        get { return _city; }
        set { _city = value.HasLengthUpTo(40); }
    }

    [StringLength(3), MinLength(2),
     RegularExpression(RegexPattern.AUS_REGIONS, ErrorMessage = "Customer: Must be a valid Australian state or territory: "+RegexPattern.AUS_REGIONS)]
    public string? StateOrTerritory
    {
        get { return _stateOrTerritory; }
        set 
        {
            if (string.IsNullOrEmpty(value))
                return;

            value = value.ToUpper();
            if (Enum.IsDefined(typeof(AusRegion), value))
            {
                _stateOrTerritory = value;
                return;
            }
            Console.WriteLine("Customer: State or Territory was invaild; did not update.");
        }
    }

    [StringLength(4), RegularExpression(RegexPattern.FOUR_DIGITS, ErrorMessage = "Postcode must be 4 digits.")]
    public string? PostCode
    {
        get { return _postcode; }
        set 
        {
            if (string.IsNullOrEmpty(value))
                return;

            // If it's a valid postcode
            if (Regex.IsMatch(value, RegexPattern.FOUR_DIGITS))
            {
                _postcode = value;
                return;
            }
            // Otherwise, try to convert it to a postcode:
            int pc = 0;
            if (int.TryParse(value.Trim().Replace(" ", ""), out pc))
            {
                _postcode = Formatter.FormatPostCode(pc) ?? _postcode;
                return;
            }
            Console.WriteLine("Customer: Postcode was invalid; did not update.");
        }
    }

    [StringLength(12), Display(Name = "Mobile Number"),
     RegularExpression(RegexPattern.MOBILE_NUMBER, ErrorMessage = "Mobile number must be in the format: 04XX XXX XXX")]
    public string? MobileNumber
    {
        get { return _mobileNumber; }
        set 
        {
            if (string.IsNullOrEmpty(value))
                return;

            // If it's a valid Mobile Number
            if (Regex.IsMatch(value, RegexPattern.MOBILE_NUMBER))
            {
                _mobileNumber = value;
                return;
            }
            // Otherwise, try to convert it to a Mobile Number:
            int mobNum = 0;
            if (int.TryParse(value.Trim().Replace(" ", ""), out mobNum))
            {
                _mobileNumber = Formatter.FormatMobileNum(mobNum) ?? _mobileNumber;
                return;
            }
            Console.WriteLine("Customer: MobileNumber was invalid; did not update.");
        }
    }
    public virtual List<AccountModel> Accounts { get; set; }
}