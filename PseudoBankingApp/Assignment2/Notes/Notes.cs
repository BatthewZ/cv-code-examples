
//select* from Logins;
//select* from Customers;
//select* from Accounts;
//select* from Transactions;
//select* from Payee;
//select* From BillPay;



// To get the ADMIN portal happening, YOU WILL NEED TO LEAVE THE API RUNNING so that requests can be made to it by the Admin Portal!

// ----- Using the API:

// MvC sends an HTTP request to the Web API. The API uses information from that and accesses database. The Web API then returns JSON to MvC to be deserialized. Mvc then returns a view.


// ----- ADMIN portal website:

// DOES NOT USE EF CORE.  Only has models as DTOs. Can move models into the class library if you're feeling brave ;)
// Inside the Admin Portal program.cs, you must configure the API client:

//builder.Services.AddHttpClient("api", client =>
//{
//    client.BaseAddress = new Uri("http://localhost:5000");
//    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
//});

// OR you can specify that the API returns JSON:

//builder.Services.AddHttpClient(Options.DefaultName, client =>
//{
//    client.BaseAddress = new Uri("http://localhost:5000");
//    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
//});


// ----- Web API

// The point of our web API is to create usable code by other services, that interacts with the database on behalf of the client, serving in a sense as a middle man or maybe a
// facade between the client and the database.  This adds more security to the database because the client no longer has knowledge of how to access the DB.
// In this, our web API is about passing specified requests to the DB, and returning data from the DB. In our case, the data will be returned as JSON.

// As we start testing our web request, GET requests will easily show up in our browser, but POST requests will not. 
// Use the terminal to run your web api, and then VS to run the MVC project.

// -- Program.CS:

// We will need to add a DB context in here etc, much like our other Program.cs.
// Use: builder.services.AddControllers() (not AddControllersWithViews()).  
// No "app.UseStaticFiles()" here, because static files would include images and other view-stuff or stuff that isn't strictly the data we want to pass from the DB.

// app.MapControllers()::
// We are not mapping the default controller route here.  As this, we don't have a default routing rule (like <controllername>/<actionname>/<id?>: server.com/home/userlogin/success )
// Without including routing, we have no global routing at all. We CAN set it up, but with web APIs, we don't normally. 
// Typically, we specifically designate the route for each of our controller.
// On the controller itself, we specify its route. For example:

//[ApiController]
//[Route("[controller]")]
//public class WeatherForecastController : ControllerBase

// -- The Controller:

// Doesn't inherit from Controller. Inherits from ControllerBase.  Controller has more code that's use in MVC and so on that isn't required for our API. It's bulkier.




// Ideas for the API and how you want to categorise requests/labelling verbs:

// GET for read-only data.
// POST represents UPDATING
// PUT represents INSERT
// DELETE removes data.

// ----- Background Services

// 1) Create a class that inherits BackgroundService

// 2) Implement protected override async Task Execute Async(CancellationToken cancellationToken) <-- Token is optional.
//    Within this method, put a try/catch around the 'doing the work' that you actually want to do. Check Week9 tutorial.BackgroundServiceExample 

// 3) Create the async task method that contacts the DB: private async Task DoAThing(CancellationToken cancellationToken);

// 4) Within this method, create a scope, and GetRequiredService<YourDBContext> from that scope.

// using var scope = _services.CreateScope();
// var context = scope.ServiceProvider.GetRequiredService<PeopleContext>();

// Get all bills where payment time is less than now or something. Double check that logic :P. Compare to the minute.
//  For each bill, pay etc.

// 5) Make sure you include the await!! await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
//    If you don't include this, it will constantly loop as fast as the db/webserver can handle. It is a constant loop, and must have a Task.Delay.

// 6) In Program.cs include the new background service:
// builder.Services.AddHostedService<YourServiceClassNameHere>();

// Side Note: You can also check out hang.io as package for scheduling code etc.



// -----

//@for(int i = 0; i < Model.Count; i++)
//            {
//    var acc = Model.ElementAt(i);
//    var type = (AccountType)acc.Type;
//                @*Generate Radio Buttons:*@
//                < input type = "radio" id = "@acc.AccountNumber" value = "@acc.AccountNumber" name = "AccountNumber" class= "btn-check" />
//                < label for= "@acc.AccountNumber" class= "btn btn-primary" > @type </ label >

//                @*Hidden input used for validation purposes:*@
//                @*
//                < input type = "hidden" name = "Accounts[@i].AccountNumber" value = "@acc.AccountNumber" />
//                < input type = "hidden" name = "Accounts[@i].Type" value = "@acc.Type" />
//                < input type = "hidden" name = "Accounts[@i].CustomerID" value = "@acc.CustomerID" />
//                *@

//            }

// -----

// Week 7 Notes:

// ------- Building a login page, and how it works:

//1) Login, takes in login information.Check Login view for the inputs, types/names.
//This is through<form asp-action="Login'>.

//2) The Login method has an [HttpPost] attribute.It is also an async Task, taking in LoginID and password parameters.

//3) After validation, set the session information using the following: 
//	HttpContext.Session.SetInt32(nameof(Customer.CustomerID), login.CustomerID);

//This sets a key/pair value  in the session of CustomerID = context.Logins.FindAsync(LoginID).
//Also set the Customer.Name and anything else specifically relevant for the session. LoginID may be enough.

//4) Redirect to the Customer controller, using: return RedirectToAction("Index", "Customer");

//5) The CustomerController has a custom attribute, [AuthorizeCustomer] which is being used as a filter.

//AuthorizeCustomerAttribute : Attribute, IAuthorizationFilter
//{
//    public void OnAuthorization(AuthorizationFilterContext context)
//    {
//        var customerID = context.HttpContext.Session.GetInt32(nameof(Customer.CustomerID));
//        if (!customerID.HasValue)
//            context.Result = new RedirectToActionResult("Index", "Home", null);
//    }
//}

//6) The CustomerController sets its private int CustomerID = HttpContext.Session.GetInt32("CustomerID").Value;

//7) The Index() of the CustomerController then loads a customer from the DbContext based on its ID, and returns View(customerFromDbContext).

//8) The associated view, Customer/Index.cshtml , imports a @model Customer, in particular, @{ ViewData["Title"} = "Accounts"; }.

//9) To show the data to the view, we can now reference the customer object using @Model.ModelAttributeOrMethod.

//10) As we have specifically referenced ViewData["Title"] = "Accounts" in step 8, we can now reference that attribute specifically in asp tags.
// Look at <partial name="_AccountsTable" for "Accounts" /> in Customer.Index.cshtml


// --- Other Week7 Notes:

// check out Views/_ViewImports.cshtml and the @using ... list at the top.  These imports will be shared across all views, so if you want anything used
// globally, share them in here.

// If you want to be able to use a ViewComponent we must reference it somewhere.  In this case, it s referenced in (week7lectorial > ViewComponentDemo):
// - The HomeController returns a view.
// - Index.cshtml can have @(await Component.InvokeAsync<RecentArticlesViewComponent>()).  Doing it this way demands that the type passed is a ViewController.

// Using tag-helper syntax (ie <vc:recent-articles skip="3" take="3">), it uses kabel case. kabel case is where-things-have-hyphens-and-lower-case. Similar to css.

// Where should we store session information? If a serverside db, 

// --------------

// Create a basic M VM V C that loads a user's info from the TestLogins table,
// Represented in a Controller, then passes that to a View via a VM.
// In the view, include a form that shows some of the controller data, and has a 'confirmation page'

// Hard code a DB call to get a login by specified loginID (00000001 or 00000002)
// Allow a user to 'submit a new password'.  Include "old password", then two "new password" inputs.
// Make sure the old password matches the DB (get the controller to contact the model)
// Make sure the new passwords match.
// Get the new password, make a hash out of it, and update the context.

//Practice getting information from a form, including a password. Setting up the hash and putting it into the DB.

//Get a Dto from the rest call, and upload it to the db.

//Look into Filters


// ---------  Experimenting with JSON strings.

//CreateJsonAndSaveToFile(customer);

//OpenFolder(@"g:\bensNewJson.json");

// JSON string
//string output = JsonConvert.SerializeObject(customer, Formatting.Indented);
//        //Console.WriteLine(output);

//        //SaveStringToFile(output);

//        //Console.WriteLine("Output is:");
//        //Console.WriteLine(output);

//        //// Deserialized version:
//        //TestingCustomer deserializedCustomer = JsonConvert.DeserializeObject<TestingCustomer>(output);

//        //Console.WriteLine(customer.Accounts[0].Balance);
//        //Console.WriteLine(customer.Accounts[1].Balance);


//    }

//    private async Task SaveStringToFile(string s)
//{
//    string path = @"g:\", fileName = "bensNewJson.json";
//    Console.WriteLine("Saving to: " + path + fileName);
//    await File.WriteAllTextAsync(path + fileName, s);
//    OpenFolder(path);
//}

//private void CreateJsonAndSaveToFile(object itemToJsonify)
//{
//    string path = @"g:\", fileName = "bensNewJson.json";
//    Console.WriteLine("Saving in path: " + path);
//    JsonSerializer serializer = new JsonSerializer();
//    //serializer.Converters.Add(new JavaScriptDateTimeConverter());
//    serializer.NullValueHandling = NullValueHandling.Ignore;

//    using (StreamWriter sw = new StreamWriter(path + fileName))
//    using (JsonWriter writer = new JsonTextWriter(sw))
//    {
//        serializer.Serialize(writer, itemToJsonify);
//    };

//    Console.WriteLine("Hopefully complete!");
//    OpenFolder(path);
//}

//private void OpenFolder(string path)
//{
//    string windir = Environment.GetEnvironmentVariable("WINDIR");
//    System.Diagnostics.Process prc = new System.Diagnostics.Process();
//    prc.StartInfo.FileName = windir + @"\explorer.exe";
//    prc.StartInfo.Arguments = path;
//    prc.Start();
//}






// -------

// To inject our Controller classes with a database table of information, we must first do these things: 

// Create a context class and a connection to a database using the EF Framework:

// 1) Build the context class (MvcMovieContext) and inherit DbContext.
// 2) Add the DbSet of type (whatever our class is, that will match to the DB schema. In this case, Person).
// 3) Go to Program.cs and make MvcMovieContext a dependency using:

//  builder.Services.AddDbContext<MvcMovieContext>(options =>
//      options.UseSqlServer(builder.Configuration.GetConnectionString("MvcMovieContext"))); 

// 4) Make sure there is a connection string in appsettings.json like this:

//{
//    "Logging": {
//        "LogLevel": {
//            "Default": "Information",
//      "Microsoft.AspNetCore": "Warning"
//        }
//    },
//  "AllowedHosts": "*",
//  "ConnectionStrings": {
//        "BensFirstContext": "server=rmit.australiaeast.cloudapp.azure.com;TrustServerCertificate=True;uid=s3851558_a2;database=s3851558_a2;pwd=abc123"
//  }

// Now MvcMovie can be injected into our controllers. :D 

// We can then create the Data Seed objects (new Movies, or new Persons etc etc) (check Data.SeedData).

// THEN we need to create MIGRATIONS. To the terminal!

// Make sure dotnet's in PATH. Check with: 
// Make sure EntityFramework is also in PATH. Check with dotnet ef --version
//  Install:
//  dotnet tool install --global dotnet-ef
//  Update:
//  dotnet tool update --global dotnet-ef

// Add migrations:
//  dotnet ef migrations add MigrationNameHereLikeMaybeInitial

//  This scans the context class for DbSets,
//  Then gets the properties and attributes from those classes, and creates Migrations from them.
//  generates a new class with a table schema, with all of the constraints and keys and everything required.

// For some reason I can get it to create Person but not Movie schema...

// Run these commands in same folder as the csproj file:
// dotnet ef migrations add MigrationName

// This creates a schema in C# (when it works lel).

// ADD TABLES / RUN UPDATES:
//      dotnet ef database update

// No need to do any SQL create statements.
// 
