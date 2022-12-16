using Assignment2.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Assignment2.ViewModels;

public class TransactionViewModel
{
    public virtual List<AccountModel> Accounts { get; set; }

    public char TransactionType { get; set; }

    [Display(Name = "Please enter an amount:")]
    public decimal Amount { get; set; }
    
    public int AccountNumber { get; set; }

    [Display(Name = "Enter Description (optional):")]
    public string? Comment { get; set; }

    [Display(Name = "Enter Destination Account Number:")]
    public int? destAcc { get; set; }
}
