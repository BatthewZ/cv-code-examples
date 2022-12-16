using Assignment2.Data;
using Assignment2.Data.Models;
using SimpleHashing;

namespace Assignment2.Testing;

public static class TestingValidModelCreation
{
    // For testing purposes (This class was set up long before learning about how to properly do unit testing):

    public static void RunTest()
    {
        PrintListOfClassPropsAndVals(CreateValidCustomers());
        PrintListOfClassPropsAndVals(CreateValidAccounts());
        PrintListOfClassPropsAndVals(CreateValidLogins());
        PrintListOfClassPropsAndVals(CreateValidTransactions());
        PrintListOfClassPropsAndVals(CreateValidPayees());
        PrintListOfClassPropsAndVals(CreateValidBillPays());
    }

    public static void PrintListOfClassPropsAndVals<T>(List<T> obs)
    {
        if (obs == null || obs.Count() <= 0)
            return;

        Console.WriteLine("\n\n" + obs.ElementAt(0).GetType().Name + " Count = " + obs.Count);
        obs.ForEach(o => {
            var props = o.GetType().GetProperties();
            Console.WriteLine("\n--- " + o.GetType().Name + ": ");
            props.ToList().ForEach(prop => Console.WriteLine("{0,-20} : {1,-20}", prop.Name, prop.GetValue(o) ?? null));
        });

        Console.WriteLine("\n\nHit Enter to Continue.");
        Console.ReadLine();
    }

    private static List<CustomerModel> CreateValidCustomers()
    {
        var customers = new List<CustomerModel> {
            
            // Should return length of 3.
            Valid.CustomerModel(9999, "Boris the Brilliant")
            ,Valid.CustomerModel(9998, "Terence Billy", AusRegion.WA, 123456789, "42 Stirling Way", "Perth", 5000, 0482031423)
            ,Valid.CustomerModel(9997, "Billy OneDone", AusRegion.NSW, 123456789, "182 Pathfinder St", "Melbournia", 8000, 433123123)
            ,Valid.CustomerModel(100000, "failed")// should fail
            ,Valid.CustomerModel(9998, "Billy OneDone", AusRegion.WA, 123456789, "42 Stirling Way", "Perth", 2, 0482031423) // Should Fail
            ,Valid.CustomerModel(9998, "Billy OneDone", AusRegion.WA, 123456789, "42 Stirling Way", "Perth", 5000, 1482031423) // Should Fail
            ,Valid.CustomerModel(-5, "failed") // Should fail.
        };

        customers.RemoveAll(item => item == null);
        return customers;
    }

    private static List<AccountModel> CreateValidAccounts()
    {
        var accounts = new List<AccountModel>
        {
            // Should return length of 2.
            Valid.AccountModel(9999, AccountType.SAVINGS, 9999),
            Valid.AccountModel(9998, AccountType.CHECKING, 9999),
            Valid.AccountModel(19999, AccountType.SAVINGS, 9999),// Should fail
            Valid.AccountModel(9999, AccountType.SAVINGS, 19999) // should fail
        };

        accounts.RemoveAll(item => item == null);
        return accounts;
    }

    private static List<TransactionModel> CreateValidTransactions()
    {
        var transactions = new List<TransactionModel>
        {
            // Should return length of 2.
            Valid.TransactionModel(TransactionType.DEPOSIT, 9999, 50.23123m, DateTime.UtcNow),
            Valid.TransactionModel(TransactionType.DEPOSIT, 9999, 50.23123m, DateTime.UtcNow, 1000, "Hi!"),
            Valid.TransactionModel(TransactionType.DEPOSIT, 9999, -50.23123m, DateTime.UtcNow, 1000, "Hi!"), // Should Fail
            Valid.TransactionModel(TransactionType.WITHDRAW, 19999, 25, DateTime.UtcNow), // Should Fail
            Valid.TransactionModel(TransactionType.DEPOSIT, 9999, 50.23123m, DateTime.UtcNow, 9, "Hi!") // Should fail
        };

        transactions.RemoveAll(item => item == null);
        return transactions;
    }

    private static List<LoginModel> CreateValidLogins()
    {
        var logins = new List<LoginModel>
        {
            // Should return length of 2.
            Valid.LoginModel(1, 9999, PBKDF2.Hash("abc123")),
            Valid.LoginModel(87654321, 9998, PBKDF2.Hash("abc123")),
            Valid.LoginModel(0, 9998, PBKDF2.Hash("abc123")), // Should Fail:
            Valid.LoginModel(187654321, 9998, PBKDF2.Hash("abc123")), // should fail
            Valid.LoginModel(87654321, 19998, PBKDF2.Hash("abc123"))// should fail
        };

        logins.RemoveAll(item => item == null);
        return logins;
    }

    // Need to set up a 'payee' before we can set up a 'Billpay' including that payee's ID.
    private static List<PayeeModel> CreateValidPayees()
    {
        var payees = new List<PayeeModel>
        {
            // Should be 1 valid Payee.
            Valid.PayeeModel("Francis III", "42 Salmon Wavenyew", "Perth", AusRegion.NSW, 1234, 0892341234)
            ,Valid.PayeeModel("", "42 Salmon Wavenyew", "Perth", AusRegion.NSW, 1234, 0892341234) // Should return false
            ,Valid.PayeeModel("Francis III", "", "Perth", AusRegion.NSW, 1234, 0892341234) // should return false
            ,Valid.PayeeModel("Francis III", "42 Salmon Wavenyew", "", AusRegion.NSW, 700, 0892341234) // should return false
            ,Valid.PayeeModel("Francis III", "42 Salmon Wavenyew", "Perth", AusRegion.NSW, 1234, 1892341234) // should return false
            ,Valid.PayeeModel("Francis III", "42 Salmon Wavenyew", "Perth", AusRegion.NSW, 1234, 234) // should return false
    };

        payees.RemoveAll(item => item == null);
        return payees;
    }

    private static List<BillPayModel> CreateValidBillPays()
    {
        var billpays = new List<BillPayModel>
        {
            // Should return length of 1.
            Valid.BillPayModel(9999, 1, 1234.23m, DateTime.UtcNow, BillPeriodType.MONTHLY)
            ,Valid.BillPayModel(19999, 1, 1234.23m, DateTime.UtcNow, BillPeriodType.MONTHLY) // should fail
            ,Valid.BillPayModel(9999, -1, 1234.23m, DateTime.UtcNow, BillPeriodType.MONTHLY) // should fail
            ,Valid.BillPayModel(9999, 1, -1234.23m, DateTime.UtcNow, BillPeriodType.MONTHLY) // should fail
        };

        billpays.RemoveAll(item => item == null);
        return billpays;
    }
}
