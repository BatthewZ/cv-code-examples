using Assignment2.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace AdminPortal.ViewModels;

public class TransactionsViewModel
{
    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm}", ApplyFormatInEditMode = true)]
    [Display(Name = "Starting Date")]
    public DateTime? StartDate { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm}", ApplyFormatInEditMode = true)]
    [Display(Name = "Ending Date")]
    public DateTime? EndDate { get; set; }

    public int AccountNumber { get; set; }
    public List<TransactionModel> Transactions { get; set; } = new List<TransactionModel>();
}
