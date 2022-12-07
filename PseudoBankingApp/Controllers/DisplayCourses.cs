using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Models;
using s3851558_a3.Data;
using s3851558_a3.ViewModels;

namespace s3851558_a3.Controllers;

public class DisplayCourses : Controller
{
    private readonly SchoolDatabase _context;

    public DisplayCourses(SchoolDatabase context) => _context = context;

    public IActionResult Index() 
    {
        var listOfCourses = _context.Courses.ToList();
        return View("DisplayCourses", listOfCourses);
    }
}
