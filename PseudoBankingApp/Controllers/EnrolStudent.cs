using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Models;
using s3851558_a3.Data;
using s3851558_a3.ViewModels;


namespace s3851558_a3.Controllers;

public class EnrolStudent : Controller
{
    private readonly SchoolDatabase _context;

    public EnrolStudent(SchoolDatabase context) => _context = context;

    public IActionResult Index() 
    {

        return View("EnrolStudent", GetVM());
    }

    public IActionResult ValidateNewEnrolment(EnrolStudentVM vm)
    {
        if (ModelState.IsValid)
        {
            if (IsAlreadyEnrolled(vm))
            {
                ModelState.AddModelError("AlreadyEnrolled", "The student is already enrolled in that unit!");
            }
            else 
            {
                _context.Add(new Enrolled
                {
                    StudentID = vm.SelectedStudentID,
                    CourseID = vm.SelectedCourseID
                });
                _context.SaveChanges();
                return RedirectToAction("Index", "DisplayCourses");
            }
        }

        return View("EnrolStudent", GetVM());
    }

    private EnrolStudentVM GetVM() 
    {
        return new EnrolStudentVM
        {
            Students = _context.Students.ToList(),
            Courses = _context.Courses.ToList(),
        };
    }

    private bool IsAlreadyEnrolled(EnrolStudentVM vm) 
    {
        if (vm == null) {
            Console.WriteLine("VM was null");
            return false;
        }

        var found = _context.Enrolled
            .Where(en => 
                en.CourseID.Equals(vm.SelectedCourseID) 
                && en.StudentID.Equals(vm.SelectedStudentID)
            ).ToList();

        return found.Count == 0 ? false : true;
    }
    
}
