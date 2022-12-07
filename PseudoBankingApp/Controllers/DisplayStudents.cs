using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using s3851558_a3.Data;
using s3851558_a3.Models;

namespace s3851558_a3.Controllers;

public class DisplayStudentsController : Controller
{
    private readonly IHttpClientFactory _clientFactory;
    private HttpClient Client => _clientFactory.CreateClient();

    public DisplayStudentsController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;

    public async Task<IActionResult> Index()
    {
        var studentsJSON = await Client.GetStringAsync("https://localhost:7148/api/MyApi");
        var students = JsonConvert.DeserializeObject<List<Student>>(studentsJSON);

        return View("DisplayStudents", students);
    }
}
