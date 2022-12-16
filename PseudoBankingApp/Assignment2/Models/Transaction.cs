using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment2.Data.Models;

public class TransactionModel
{
    [Key, Display(Name = "TransactionID")]
    public int ID { get; set; }

    [Required, Column(TypeName = "char"),
        RegularExpression(@"D|W|T|S|B", ErrorMessage = "Transaction Type must be 'D','W', 'T', 'S', or 'B'.")]
    public char TransactionType { get; set; }

    [Required, ForeignKey("Account")]
    public int AccountNumber { get; set; }
    public virtual AccountModel Account { get; set; }

    [ForeignKey("DestinationAccount")]
    public int? DestinationAccountNumber { get; set; }
    public virtual AccountModel DestinationAccount { get; set; }

    [Required, Column(TypeName = "money"), Range(0.01, 999999999, ErrorMessage = "Amount must be between {1} and {2}")]
    public decimal Amount { get; set; }

    [StringLength(30)]
    public string? Comment { get; set; }

    [Required, Column(TypeName = "datetime2")]
    public DateTime TransactionTimeUtc { get; set; }
}

