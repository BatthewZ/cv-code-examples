using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment2.Data.Models;

public class BillPayModel
{
    [Key, Display(Name = "BillPayID")]
    public int ID { get; set; }

    [Required, ForeignKey("Account")]
    public int AccountNumber { get; set; }
    public virtual AccountModel Account { get; set; }

    [Required, ForeignKey("Payee")]
    public int PayeeID { get; set; }
    public virtual PayeeModel Payee { get; set; }

    [Required, Column(TypeName = "money")]
    public decimal Amount { get; set; }

    [Required, Column(TypeName = "datetime2")]
    public DateTime ScheduleTimeUtc { get; set; }

    [Required, Column(TypeName = "char"),
        RegularExpression(@"O|M", ErrorMessage = "BillPay Type must be 'C' or 'S'.")]
    public char Period { get; set; }

    public bool IsFrozen { get; set; } = false;
}
