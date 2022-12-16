using Assignment2.Data;
using SimpleHashing;
using Microsoft.AspNetCore.Mvc;
using Assignment2.Data.Models;
using Assignment2.Filters;

namespace Assignment2.Controllers;

public class LoginController : Controller
{
    private readonly DatabaseContext _context;

    public LoginController(DatabaseContext context) => _context = context;

    public IActionResult Login() => View();

    [HttpPost]
    public async Task<IActionResult> Login(string loginID, string password)
    {
        var login = await _context.Logins.FindAsync(loginID);

        if (login == null || string.IsNullOrEmpty(password) || !PBKDF2.Verify(login.PasswordHash, password))
        {
            ModelState.AddModelError("LoginFailed", "Login failed. Please try again.");
            return View(new LoginModel { LoginID = loginID });
        }
        else if (login.IsFrozen)
        {
            ModelState.AddModelError("LoginFailed", "This account has been frozen. Please contact the bank.");
            return View(new LoginModel { LoginID = loginID });
        }

        ////Set login session information
        HttpContext.Session.SetInt32(nameof(CustomerModel.ID), login.CustomerID);
        HttpContext.Session.SetString(nameof(CustomerModel.Name), login.Customer.Name);

        //// While Testing:
        //Console.WriteLine("\n\n\n :: TESTING IS ON - User/password validation turned off. :: \n\n\n");
        //HttpContext.Session.SetInt32(nameof(CustomerModel.ID), 2100);
        //HttpContext.Session.SetString(nameof(CustomerModel.Name), "Matthew Bolger");

        return RedirectToAction("Index", "User");
    }

    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return RedirectToAction("Index", "Home");
    }

}
