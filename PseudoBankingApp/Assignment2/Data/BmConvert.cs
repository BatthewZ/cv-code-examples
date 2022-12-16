using Assignment2.Data.Models;
using Assignment2.ViewModels;

namespace Assignment2.Data;

public static class BmConvert
{
    public static CustomerViewModel CustomerModelToViewModel(CustomerModel model)
    {
        return new CustomerViewModel
        {
            ID = model.ID,
            Name = model.Name,
            TFN = model.TFN,
            Address = model.Address,
            City = model.City,
            StateOrTerritory = model.StateOrTerritory,
            PostCode = model.PostCode,
            MobileNumber = model.MobileNumber
        };
    }

    public static BillPayModel ConvertToBillPayModel(this BpViewModel vm)
    {
        if (vm.Payee_ID == -1) 
        {
            Console.WriteLine("Error: Payee ID was still unset.  You must set the payee ID before you can create a valid BP Model.");
            return null;

        }
        return new BillPayModel
        {
            AccountNumber = vm.BP_AccountNumber,
            PayeeID = vm.Payee_ID,
            Amount = vm.Amount,
            ScheduleTimeUtc = vm.ScheduledTimeNow.ToUniversalTime(),
            Period = (char) vm.Period
        };
    }

    public static PayeeModel ConvertToPayeeModel(this BpViewModel vm)
    {
        return new PayeeModel 
        { 
            Name = vm.Payee_Name,
            Address = vm.Payee_Address,
            City = vm.Payee_City,
            State = vm.Payee_State,
            PostCode = vm.Payee_PostCode,
            Phone = vm.Payee_Phone
        };
    }

    public static async Task<BpViewModel> PrefilledBpViewModel(DatabaseContext context, int bpID)
    {
        if (bpID == -1)
            return null;

        var bp = await context.BillPay.FindAsync(bpID);
        if (bp == null)
            return null;

        return new BpViewModel
        {
            BP_ID = bp.ID,
            BP_AccountNumber = bp.AccountNumber,
            Amount = bp.Amount,
            ScheduledTimeNow = bp.ScheduleTimeUtc.ToLocalTime(),
            Period = (BillPeriodType)bp.Period,
            Payee_ID = bp.PayeeID,
            Payee_Name = bp.Payee.Name,
            Payee_Address = bp.Payee.Address,
            Payee_City = bp.Payee.City,
            Payee_State = bp.Payee.State,
            Payee_PostCode = bp.Payee.PostCode,
            Payee_Phone = bp.Payee.Phone
        };

    }

    public static TransactionModel ConvertToTransactionModel(this BillPayModel bpm)
    {
        return new TransactionModel
        {
            TransactionType = (char)TransactionType.BILLPAY,
            AccountNumber = bpm.AccountNumber,
            Account = bpm.Account,
            Amount = bpm.Amount,
            Comment = ("Bill Payment to " + bpm.Payee.Name).HasLengthUpTo(30),
            TransactionTimeUtc = bpm.ScheduleTimeUtc.ToUniversalTime()
        };
    }
}
