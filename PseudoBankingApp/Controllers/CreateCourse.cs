using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Models;
using s3851558_a3.Data;
using s3851558_a3.ViewModels;
using BensToolbox;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace s3851558_a3.Controllers;

public class CreateCourse : Controller
{
    private readonly SchoolDatabase _context;

    public CreateCourse(SchoolDatabase context) => _context = context;

    public IActionResult Index() 
    {
        return View("CreateCourse", new CourseVM());
    }

    public IActionResult ValidateViewModel(CourseVM course) 
    {
        CourseVM validCourse = ValidCourse(course, ModelState);

        if (validCourse != null) 
        {
            _context.Courses.Add(ToCourseModel(validCourse));
            _context.SaveChanges();
            return RedirectToAction("Index", "DisplayCourses");
        }

        return View("CreateCourse", validCourse ?? course);
    }

    private Course ToCourseModel(CourseVM cvm)
    {
        // Validation should be done before this method is called.
        return new Course
        {
            CourseID = "COSC" + cvm.CourseID,
            Title = cvm.Title,
            CreditPoints = cvm.CreditPoints,
            Career = cvm.Career,
            Coordinator = cvm.Coordinator,
        };
    }

    private CourseVM ValidCourse(CourseVM cvm, ModelStateDictionary modelState) 
    {
        bool isValid = true;
       
        if (!BmHelper.WithinRange(cvm.CourseID, 1000, 9999)) 
        {
            modelState.AddModelError("InvalidCourseID", "ID was not within the range (1000-9999");
            isValid = false;
        }

        var existingCourseID = _context.Courses.Find("COSC" + cvm.CourseID);

        if (existingCourseID != null)
        {
            modelState.AddModelError("InvalidCourseID", "ID is already in use. Please choose another course ID.");
            isValid = false;
        }

        cvm.Title = cvm.Title.CapitalizeAllFirstLetters();

        if (string.IsNullOrEmpty(cvm.Title.Trim()))
        {
            modelState.AddModelError("InvalidTitle", "Title must not be empty");
            isValid = false;
        }

        if (cvm.CreditPoints == -1) 
        {
            modelState.AddModelError("InvalidCreditPoints", "Please select a number!");
            isValid = false;
        }

        if (cvm.Career.Equals("-1")) 
        {
            modelState.AddModelError("InvalidCareer", "Please select Postgraduate or Undergraduate!");
            isValid = false;
        }

        cvm.Coordinator = cvm.Coordinator.CapitalizeAllFirstLetters();

        if (string.IsNullOrEmpty(cvm.Coordinator.Trim()))
        {
            modelState.AddModelError("InvalidCoordinator", "Coordinator's name must not be empty");
            isValid = false;
        }

        return isValid ? cvm : null;
    }
}
