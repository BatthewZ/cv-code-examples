using Assignment2.Data.Models;
using Assignment2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Assignment2.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var isLoggedIn = HttpContext.Session.GetInt32(nameof(CustomerModel.ID)).HasValue;
        if (isLoggedIn)
            return RedirectToAction("Index", "User");

        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}