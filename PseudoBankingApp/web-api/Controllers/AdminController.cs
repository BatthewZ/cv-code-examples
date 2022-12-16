using Assignment2.Data.Models;
using Assignment2.ViewModels;
using Microsoft.AspNetCore.Mvc;
using web_api.Data;

namespace web_api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AdminController : ControllerBase
{
    private readonly DataManager _repo;

    public AdminController(DataManager repo) => _repo = repo;

    [HttpGet]
    public List<CustomerModel> AllCustomers() 
    {
        return _repo.GetAllCustomers();
    }

    [HttpGet("{id}")] // This might break it? Should be: Admin/Customer/1
    public CustomerModel Customer(int id) 
    {
        return _repo.GetCustomer(id);
    }

    [HttpGet("{customerID}")] // This might break it? Should be: Admin/Customer/1
    public List<AccountModel> Accounts(int customerID)
    {   
        return _repo.GetAccounts(customerID);
    }

    [HttpPost]
    public void UpdateCustomer([FromBody] CustomerViewModel cvm) 
    {
        _repo.UpdateCustomer(cvm);
    }

    [HttpGet("{accountNum}")]
    public List<TransactionModel> GetTransactions(int accountNum) 
    {
        return _repo.GetTransactions(accountNum);
    }

    [HttpGet("{accountNum}")]
    public List<BillPayModel> GetBillPays(int accountNum)
    {
        return _repo.GetBillPays(accountNum);
    }

    [HttpGet("{id}/{isFrozen}")]
    public bool UpdateBillPay(int id, bool isFrozen) 
    {
        return _repo.UpdateBillPay(id, isFrozen).Result;
    }

    [HttpGet("{customerID}/{isFrozen}")]
    public bool UpdateLogin(int customerID, bool isFrozen)
    {
        Console.WriteLine("\n\n\nUPDATE LOGIN PARAMETERS ARE: " + customerID + " : " + isFrozen);
        return _repo.UpdateLogin(customerID, isFrozen).Result;
    }

    [HttpGet("{customerID}")]
    public LoginModel GetLogin(int customerID) 
    { 
        return _repo.GetLogin(customerID);
    }
}
