using Assignment2.Data;
using Assignment2.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Assignment2.ViewModels;


public class BpViewModel
{
    // -1 = 'new bill pay' versus 'modify old billpay'.
    public int BP_ID { get; set; } = -1; 

    public List<AccountModel>? UserAccounts { get; set; } = new List<AccountModel>();

    public int BP_AccountNumber { get; set; }

    public List<PayeeModel>? PreviousPayees { get; set; } = new List<PayeeModel>();

    [Display (Name = "Amount:")]
    public decimal Amount { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm}", ApplyFormatInEditMode = true)]
    [Display (Name = "Schedule Start Time:")]
    public DateTime ScheduledTimeNow { get; set; } = DateTime.Now;

    public BillPeriodType? Period { get; set; }

    public int Payee_ID { get; set; } = -1;

    [Display (Name ="Payee Name:")]
    public string? Payee_Name { get; set; }

    [Display(Name = "Payee Address:")]
    public string? Payee_Address { get; set; }

    [Display(Name = "Payee City:")]
    public string? Payee_City { get; set; }

    public string? Payee_State { get; set; }

    [Display(Name = "Payee PostCode:")]
    public string? Payee_PostCode { get; set; }

    [Display(Name = "Payee's Land-Line Phone:")]
    public string? Payee_Phone { get; set; }

}
