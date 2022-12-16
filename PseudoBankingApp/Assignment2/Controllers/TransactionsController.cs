using Assignment2.Data;
using Assignment2.Data.Models;
using Assignment2.Filters;
using Assignment2.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Assignment2.Controllers;

[AuthorizeUser]
public class TransactionsController : Controller
{
    private readonly DatabaseContext _context;
    private int CustomerID => HttpContext.Session.GetInt32(nameof(CustomerModel.ID))!.Value;

    public TransactionsController(DatabaseContext context) => _context = context;

    public IActionResult Index(string transactionType)
    {
        // Redirect to home if transaction type is invalid.
        if (string.IsNullOrEmpty(transactionType) 
         || !Enum.IsDefined(typeof(TransactionType), transactionType) 
         || transactionType.Equals(TransactionType.SERVICECHARGE.ToString()))
        {
            return RedirectToAction("Index", "Home");
        }

        TransactionType type;
        Enum.TryParse(transactionType, out type);
        
        return View("Transaction", GetVM(type));
    }

    [HttpPost]
    public IActionResult Transaction(TransactionViewModel vm)
    {
        return View(vm);
    }

    [HttpPost]
    public IActionResult SubmitTransaction(TransactionViewModel vm)
    {
        // Reload Accounts
        vm.Accounts = GetCustomerAccounts().Result;

        // If attempting transaction type transfer:
        List<AccountModel> validDestAccs = null!;
        if ((TransactionType)vm.TransactionType == TransactionType.TRANSFER)
            validDestAccs = _context.Accounts.Where(acc => acc.AccountNumber != vm.AccountNumber).ToList();

        TransactionModel validTM = Valid.TransactionModelFromViewModel(vm, ModelState, validDestAccs);

        // If validation failed:
        if (validTM == null) 
            return View("Transaction", vm);

        return View("Confirmation", validTM);
    }

    [HttpPost]
    public IActionResult Confirmation(TransactionModel tm) 
    {
        return View(tm);
    }

    public async Task<IActionResult> UpdateDB(TransactionModel tm)
    {
        await new Update(_context).Transactions(tm);
        return RedirectToAction("Index", "Home");
    }

    public IActionResult Cancel() 
    {
        return RedirectToAction("Index", "Home");
    }

    private TransactionViewModel GetVM(TransactionType type)
    {
        var transactionViewModel = new TransactionViewModel
        {
            Accounts = GetCustomerAccounts().Result,
            TransactionType = (char)type,
        };

        return transactionViewModel;
    }

    private async Task<List<AccountModel>> GetCustomerAccounts()
    {
        var customer = await _context.Customers.FindAsync(CustomerID);
        return customer.Accounts;
    }
}