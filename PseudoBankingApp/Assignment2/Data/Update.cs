using Assignment2.Data.Models;
using Assignment2.ViewModels;
using SimpleHashing;

namespace Assignment2.Data;

public class Update
{
    private readonly DatabaseContext _context;
    public Update(DatabaseContext context) => _context = context;

    public async Task<bool> Transactions(TransactionModel tm)
    {

        if (tm == null)
            return false;
        // Make sure validation as happened before passing into this method.

        tm.Account = await _context.Accounts.FindAsync(tm.AccountNumber);
        tm.TransactionTimeUtc = DateTime.UtcNow;

        _context.Transactions.Add(tm);

        // Prepare service fee transaction and add it to the context.
        if (Valid.Fee((TransactionType)tm.TransactionType) > 0 && tm.Account.ChargeServiceFee())
            _context.Transactions.Add(Valid.ServiceFeeTransactionModel(tm));

        // Prepare the transfer transaction for the destination account.
        if ((TransactionType)tm.TransactionType == TransactionType.TRANSFER)
        {
            tm.DestinationAccount = await _context.Accounts.FindAsync(tm.DestinationAccountNumber);
            var destAccTm = Valid.TransferDepositTransactionModel(tm);

            // If valid, add it to the context.
            if (destAccTm != null)
            {
                _context.Transactions.Add(destAccTm);
            }
            else
                Console.WriteLine("Something went wrong when preparing the destination account number.");
        }

        Console.WriteLine("UPDATING THE DB ----------");

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<bool> CustomerInformation(CustomerViewModel cvm)
    {
        if (cvm == null)
            return false;

        var customer = await _context.Customers.FindAsync(cvm.ID);

        if (customer == null) {
            Console.WriteLine("Could not find customer; did not update");
            return false;
        }

        customer.Name = cvm.Name;
        customer.TFN = cvm.TFN;
        customer.Address = cvm.Address;
        customer.City = cvm.City;
        customer.PostCode = cvm.PostCode;
        customer.StateOrTerritory = cvm.StateOrTerritory;
        customer.MobileNumber = cvm.MobileNumber;

        return await _context.SaveChangesAsync() > 0 ? true : false ;
    }

    public async Task<bool> Password(string newPassword, int currentCustomerID)
    {
        var login = _context.Logins.First(login => login.CustomerID == currentCustomerID);
        login.PasswordHash = PBKDF2.Hash(newPassword);

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<bool> BillPay(BpViewModel vm)
    {
        var billPay = await _context.BillPay.FindAsync(vm.BP_ID);

        if (billPay == null)
            return false;

        billPay.AccountNumber = vm.BP_AccountNumber;
        billPay.PayeeID = vm.Payee_ID;
        billPay.Amount = vm.Amount;
        billPay.ScheduleTimeUtc = vm.ScheduledTimeNow.ToUniversalTime();
        billPay.Period = (char)vm.Period;

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }
}
