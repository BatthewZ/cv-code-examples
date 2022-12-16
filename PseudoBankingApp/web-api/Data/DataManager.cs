using Assignment2.Data;
using Assignment2.Data.Models;
using Assignment2.ViewModels;

namespace web_api.Data;

public class DataManager : IRepo
{
    private readonly DatabaseContext _context;

    public DataManager(DatabaseContext context) => _context = context;

    public List<CustomerModel> GetAllCustomers() 
    {
        return _context.Customers.ToList();
    }

    public CustomerModel GetCustomer(int id) 
    {
        return _context.Customers.Find(id)!;
    }

    public bool UpdateCustomer(CustomerViewModel cvm)
    {
        return new Update(_context).CustomerInformation(cvm).Result;
    }

    public List<TransactionModel> GetTransactions(int accountNum) 
    {
        return _context.Transactions.Where(tr => tr.AccountNumber == accountNum).ToList();
    }

    public List<BillPayModel> GetBillPays(int accountNum) 
    {
        return _context.BillPay.Where(bp => bp.AccountNumber == accountNum).ToList();
    }

    public async Task<bool> UpdateBillPay(int id, bool isFrozen) 
    {
        var bp = await _context.BillPay.FindAsync(id);
        
        if (bp == null) 
            return false;

        bp.IsFrozen = isFrozen;

        return await _context.SaveChangesAsync() > 0 ? true : false; 
    }

    public async Task<bool> UpdateLogin(int customerID, bool isFrozen) 
    {
        var login = GetLogin(customerID);

        if (login == null)
            return false;

        login.IsFrozen = isFrozen;

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

    public List<AccountModel> GetAccounts(int customerID) 
    {
        return _context.Accounts.Where(acc => acc.CustomerID == customerID).ToList();
    }

    public LoginModel GetLogin(int customerID) 
    {
        var login = _context.Logins.FirstOrDefault(login => login.CustomerID == customerID);
        return login;
    }
}
