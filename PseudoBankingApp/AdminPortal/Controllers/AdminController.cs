using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Assignment2.Data.Models;
using Assignment2.ViewModels;
using Assignment2.Data;
using AdminPortal.ViewModels;
using AdminPortal.Filters;

namespace AdminPortal.Controllers;

[AuthorizeUser]
public class AdminController : Controller
{
    private readonly IHttpClientFactory _clientFactory;
    private HttpClient Client => _clientFactory.CreateClient("api");

    public AdminController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;

    public async Task<IActionResult> Index()
    {
        var allCustomersJsonString = await Client.GetStringAsync("api/Admin/AllCustomers");

        Console.WriteLine("Converting from JSON.");
        var customers = JsonConvert.DeserializeObject<List<CustomerModel>>(allCustomersJsonString);
        
        Console.WriteLine("Converting Customers to ViewModels.");
        var viewModels = ConvertAllToVMs(customers!);

        return View(viewModels);
    }

    public async Task<IActionResult> UpdateLogin(int customerID, bool isFrozen)
    {
        var response = await Client.GetAsync("api/Admin/UpdateLogin/" + customerID + "/" + isFrozen);
        return RedirectToAction("index");
    }

    public async Task<IActionResult> EditCustomer(int customerID = -1)
    {
        if (customerID == -1)
            return RedirectToAction("index");

        return View(await GetCustomerVM(customerID));
    }

    [HttpPost]
    public IActionResult ConfirmProfileEdits(CustomerViewModel cvm)
    {
        if (!ModelState.IsValid)
            ModelState.ToList().ForEach(m => Console.WriteLine(m.Key + " : " + m.Value.ValidationState));

        var validVM = Valid.CustomerViewModel(cvm, ModelState);

        if (validVM == null)
        {
            return View("EditCustomer", cvm);
        }
        else
        {
            // Update
            var content = new StringContent(JsonConvert.SerializeObject(validVM), Encoding.UTF8, "application/json");
            var response = Client.PostAsync("api/admin/UpdateCustomer", content).Result;

            Console.WriteLine("\n\n\n\n\n Response Message is: " + response);
        }

        return RedirectToAction("EditCustomer", cvm.ID); // (EditCustomer, cvm)
    }

    [HttpPost]
    public async Task<IActionResult> SelectAccount(int customerID, string redirectToAction)
    {
        var customerJSON = await Client.GetStringAsync("api/Admin/Customer/"+customerID);
        var customer = JsonConvert.DeserializeObject<CustomerModel>(customerJSON);
        
        ViewBag.RedirectToAction = redirectToAction;

        return View(customer.Accounts);
    }

    [HttpPost]
    public IActionResult PassAccountNumToTvm(int accountNumber)
    {
        TransactionsViewModel tvm = new TransactionsViewModel { AccountNumber = accountNumber };
        return RedirectToAction("ViewTransactions", tvm);
    }

    public async Task<IActionResult> BillPays(int accountNumber)
    {
        return View(await GetBillPays(accountNumber));
    }

    public async Task<IActionResult> UpdateBillPay(int bpID, bool isFrozen, int accountNumber)
    {
        var response = await Client.GetAsync("api/Admin/UpdateBillPay/" + bpID + "/" + isFrozen);
        return View("BillPays", await GetBillPays(accountNumber));
    }

    public async Task<IActionResult> ViewTransactions(TransactionsViewModel tvm) {

        var transactionsJson = await Client.GetStringAsync("api/Admin/GetTransactions/"+tvm.AccountNumber);
        var transactionsList = JsonConvert.DeserializeObject<List<TransactionModel>>(transactionsJson);

        // If dates have been set by the user, get all within date range
        if (tvm.StartDate.HasValue && tvm.EndDate.HasValue)
        {
            transactionsList = transactionsList.Where(t => t.TransactionTimeUtc.ToLocalTime() >= tvm.StartDate && t.TransactionTimeUtc.ToLocalTime() <= tvm.EndDate).ToList();

        } // get all after start date
        else if (tvm.StartDate.HasValue) 
        {
            transactionsList = transactionsList.Where(t => t.TransactionTimeUtc.ToLocalTime() >= tvm.StartDate).ToList();

        } // get all before end date
        else if (tvm.EndDate.HasValue)
        {
            transactionsList = transactionsList.Where(t => t.TransactionTimeUtc.ToLocalTime() <= tvm.EndDate).ToList();
        }

        transactionsList = transactionsList.OrderByDescending(o => o.TransactionTimeUtc).ToList();

        tvm.Transactions = transactionsList;

        return View(tvm);
    }

    private async Task<CustomerViewModel> GetCustomerVM(int customerID)
    {
        var customerJson = await Client.GetStringAsync("api/Admin/Customer/" + customerID);
        var customer = JsonConvert.DeserializeObject<CustomerModel>(customerJson);
        var cvm = BmConvert.CustomerModelToViewModel(customer);
        cvm = AddLoginStatusToCvm(customer.ID, cvm);
        return cvm;
    }

    private List<CustomerViewModel> ConvertAllToVMs(List<CustomerModel> customerModels)
    {
        List<CustomerViewModel> cvms = new List<CustomerViewModel>();

        if (customerModels == null)
        {
            return cvms;
        }

        customerModels.ForEach(cm =>
        {
            var vm = BmConvert.CustomerModelToViewModel(cm);
            vm = AddLoginStatusToCvm(cm.ID, vm);
            //var login = GetLogin(cm.ID).Result;
            //vm.LoginIsFrozen = login.IsFrozen;
            cvms.Add(vm);
        });

        return cvms;
    }

    private CustomerViewModel AddLoginStatusToCvm(int customerID, CustomerViewModel cvm)
    {
        cvm.LoginIsFrozen = GetLogin(customerID).Result.IsFrozen;
        return cvm;
    }

    private async Task<List<BillPayModel>> GetBillPays(int accountNumber)
    {
        var billPayJson = await Client.GetStringAsync("api/Admin/GetBillPays/" + accountNumber);
        var billPayList = JsonConvert.DeserializeObject<List<BillPayModel>>(billPayJson);

        if (billPayList != null)
            billPayList = billPayList.OrderByDescending(bp => bp.ScheduleTimeUtc).ToList();

        return billPayList;
    }

    private async Task<LoginModel> GetLogin(int customerID) 
    {
        var login = await Client.GetStringAsync("api/Admin/GetLogin/" + customerID);
        var loginModel = JsonConvert.DeserializeObject<LoginModel>(login);
        return loginModel;
    }
}
