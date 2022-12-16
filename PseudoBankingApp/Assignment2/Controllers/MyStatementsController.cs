using Assignment2.Data;
using Assignment2.Data.Models;
using Microsoft.AspNetCore.Mvc;
using X.PagedList;
using Assignment2.Filters;

namespace Assignment2.Controllers;

[AuthorizeUser]
public class MyStatementsController : Controller
{
    private readonly DatabaseContext _context;
    private int CustomerID => HttpContext.Session.GetInt32(nameof(CustomerModel.ID))!.Value;
    
    // Describes the user's accounts:
    private const string UNSELECTED = "UNSELECTED";
    private const string HASNONE = "HASNONE";

    public MyStatementsController(DatabaseContext context) => _context = context;

    public async Task<IActionResult> Index(string accountnumber, int? page = 1)
    {
        List<AccountModel> accounts = GetAccounts().Result;
        if (accounts == null || accounts.Count == 0)
        {
            ViewBag.SelectedAcc = HASNONE;
            return View(null);
        }

        var selectedAccount = accounts.Find(acc => acc.AccountNumber.ToString().Equals(accountnumber));

        if (string.IsNullOrEmpty(accountnumber) || selectedAccount == null || accountnumber.ToUpper().Equals(UNSELECTED)) 
        {
            accountnumber = UNSELECTED;
            ViewBag.SelectedAcc = UNSELECTED;
        }
        else
        {
            accounts = new List<AccountModel> { selectedAccount };
            ViewBag.SelectedAcc = accountnumber;
            
            IPagedList<TransactionModel> pagedList = await _context.Transactions
                .Where(t => t.AccountNumber.ToString().Equals(accountnumber))
                .OrderByDescending(o => o.TransactionTimeUtc)
                .ToPagedListAsync(page, 4);

            ViewBag.TransactionPages = pagedList;
        }

        ViewBag.TransactionModel = new TransactionModel();

        return View(accounts);
    }

    private async Task<List<AccountModel>> GetAccounts()
    {
        var customer = await _context.Customers.FindAsync(CustomerID);
        return customer.Accounts;
    }
}
