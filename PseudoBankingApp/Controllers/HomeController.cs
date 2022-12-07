using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Data;
using s3851558_a3.Models;
using System.Diagnostics;

namespace s3851558_a3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SchoolDatabase _context;
        
        public HomeController(ILogger<HomeController> logger, SchoolDatabase context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            _context.Students.ToList().ForEach(student => 
            {
                Console.WriteLine("Printing enrolments for: " + student.FirstName);
                student.Enrolments.ForEach(enrolment => Console.WriteLine(enrolment.StudentID));
            });

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
}