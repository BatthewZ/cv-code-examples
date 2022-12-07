using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Data;
using s3851558_a3.Models;

namespace s3851558_a3.Controllers.Api;

public class MyRepoImplementerController : IMyRepo
{
    private readonly SchoolDatabase _context;

    public MyRepoImplementerController(SchoolDatabase context) => _context = context;

    public List<Student> GetStudents()
    {
        return _context.Students.ToList();
    }
}
