using Assignment2.Data;
using Assignment2.Data.Models;
using Assignment2.ViewModels;
using Assignment2.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Assignment2.Controllers;

[AuthorizeUser]
public class ProfileController : Controller
{
    private readonly DatabaseContext _context;
    private int CustomerID => HttpContext.Session.GetInt32(nameof(CustomerModel.ID))!.Value;

    public ProfileController(DatabaseContext context) => _context = context;

    public async Task<IActionResult> Index()
    {
        if (!HttpContext.Session.GetInt32(nameof(CustomerModel.ID)).HasValue)
            return RedirectToAction("Index", "Home");

        var vm = await GetCustomerVM();
        return View(vm);
    }
    
    public IActionResult Edit() 
    {
        return View(GetCustomerVM().Result);
    }

    [HttpPost]
    public async Task<IActionResult> Submit(CustomerViewModel formDetails) 
    {
        var validVM = Valid.CustomerViewModel(formDetails, ModelState);

        if (validVM == null)
        {
            return View("Edit", formDetails);
        }
        else
        {
            await new Update(_context).CustomerInformation(validVM);
        }
        return View("Index", await GetCustomerVM());
    }

    [HttpPost]
    public IActionResult ChangePassword(bool changeSuccess = false)
    {
        var pvm = new PasswordViewModel();
        return View(pvm);
    }

    [HttpPost]
    public async Task<IActionResult> SubmitPassword(PasswordViewModel pvm)
    {
        if (Valid.PasswordChange(pvm, GetLoginModel(), ModelState))
        {
            if (await new Update(_context).Password(pvm.NewPassword, CustomerID))
                return View("Success");
        }

        return View("ChangePassword");
    }

    private async Task<CustomerViewModel> GetCustomerVM()
    {
        var model = await _context.Customers.FindAsync(CustomerID);
        return BmConvert.CustomerModelToViewModel(model);
    }

    private LoginModel GetLoginModel()
    {
        return _context.Logins.First(login => login.CustomerID == CustomerID); 
    }
}
