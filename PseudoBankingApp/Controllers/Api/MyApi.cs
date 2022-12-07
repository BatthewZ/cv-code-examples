using Microsoft.AspNetCore.Mvc;
using s3851558_a3.Models;

namespace s3851558_a3.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class MyApiController : ControllerBase
{
    private readonly MyRepoImplementerController _repo;

    public MyApiController(MyRepoImplementerController repo) => _repo = repo;

    [HttpGet]
    public List<Student> GetAllStudents() 
    {
        var students = _repo.GetStudents();
        return _repo.GetStudents();
    }
}
