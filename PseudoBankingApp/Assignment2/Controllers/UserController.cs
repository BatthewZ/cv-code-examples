using Assignment2.Data;
using Assignment2.Data.Models;
using Assignment2.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Assignment2.Controllers;

[AuthorizeUser]
public class UserController : Controller
{
    private readonly DatabaseContext _context;
    private int CustomerID => HttpContext.Session.GetInt32(nameof(CustomerModel.ID))!.Value;

    public UserController(DatabaseContext context) => _context = context;

    public async Task<IActionResult> Index()
    {
        var customer = await _context.Customers.FindAsync(CustomerID);
        return View(customer);
    }

    
    [HttpPost]
    public async Task<IActionResult> ChangeName(string name)
    {
        var customer = await _context.Customers.FindAsync(CustomerID);

        if (customer == null || string.IsNullOrEmpty(name))
        {
            ModelState.AddModelError(nameof(name), "Please enter a valid name.");
        }
        else
        {
            customer.Name = name;
            await _context.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Index));
    }
}
