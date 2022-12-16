using Assignment2.Data.Models;
using Assignment2.ViewModels;

namespace web_api.Data;

public interface IRepo
{
    public List<CustomerModel> GetAllCustomers();
    
    public CustomerModel GetCustomer(int id);

    public bool UpdateCustomer(CustomerViewModel cvm); 
    
    public List<TransactionModel> GetTransactions(int accountNum);

    public List<BillPayModel> GetBillPays(int accountNum);

    public Task<bool> UpdateBillPay(int id, bool isFrozen);

    public Task<bool> UpdateLogin(int customerID, bool isFrozen);

    public List<AccountModel> GetAccounts(int customerID);

    public LoginModel GetLogin(int customerID);
}
