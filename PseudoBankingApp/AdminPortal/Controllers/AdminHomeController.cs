using AdminPortal.Models;
using Assignment2.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AdminPortal.Controllers
{
    public class AdminHomeController : Controller
    {
        private readonly ILogger<AdminHomeController> _logger;

        public AdminHomeController(ILogger<AdminHomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var isLoggedIn = HttpContext.Session.GetInt32("ID").HasValue;
            if (isLoggedIn)
                return RedirectToAction("Index", "Admin");

            return View();
        }

        [HttpPost]
        public IActionResult Login(string user = "", string password = "") 
        {
            if (string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password)
                || !(user.ToUpper().Equals("ADMIN") && password.ToUpper().Equals("ADMIN"))) 
            {
                ModelState.AddModelError("invalidLogin", "Invalid login or password.");
                return View("index");
            }

            HttpContext.Session.SetInt32("ID", 1);

            return RedirectToAction("index", "Admin");
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return View("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}