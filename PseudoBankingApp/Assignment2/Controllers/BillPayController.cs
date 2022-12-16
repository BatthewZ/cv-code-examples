using Assignment2.Data;
using Assignment2.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Assignment2.ViewModels;
using Assignment2.Filters;
using BMTools;

namespace Assignment2.Controllers;

[AuthorizeUser]
public class BillPayController : Controller
{
    private readonly DatabaseContext _context;
    private int CustomerID => HttpContext.Session.GetInt32(nameof(CustomerModel.ID))!.Value;

    public BillPayController(DatabaseContext context) => _context = context;

    public IActionResult Index()
    {
        return View(GetBPs().Result);
    }

    public IActionResult Modify(BpViewModel? vm, int? bpID = -1)
    {
        if (bpID > -1)
        {
            vm = BmConvert.PrefilledBpViewModel(_context, (int)bpID).Result;
        }
        if (vm != null) 
        {
            vm.BP_ID = (int)bpID;
            vm.UserAccounts = GetAccounts().Result;
            vm.PreviousPayees = GetPayees();
        }
        return View(vm ?? NewBPVM());
    }

    [HttpPost]
    public async Task<IActionResult> Confirm(BpViewModel vm)
    {
        vm.PreviousPayees = GetPayees();
        vm.UserAccounts = GetAccounts().Result;

        var validVM = Valid.BpViewModel(vm, ModelState);
        
        if (validVM != null)
        {
            // If new Payee:
            if (vm.Payee_ID == -1)
            {
                // Make new PayeeModel
                var newPayee = validVM.ConvertToPayeeModel();

                // Add it to the DB:
                if (await new Create(_context).Payee(newPayee))
                {
                    // If update successful set ID to the generated ID.
                    validVM.Payee_ID = _context.Payee.OrderByDescending(t => t.ID).FirstOrDefault().ID;
                }
            }

            // If new BillPay:
            if (validVM.BP_ID == -1)
            {
                // Create BillPay
                await new Create(_context).BillPay(validVM.ConvertToBillPayModel());
            }
            else
            {
                // Update existing BillPay
                await new Update(_context).BillPay(validVM);
            }
        }
        return validVM != null ? RedirectToAction("Index") : View("Modify", vm);
    }

    [HttpPost]
    public async Task<IActionResult> Delete(int bpID)
    {
        Console.WriteLine("About to delete with bpID: " + bpID);
        await new Delete(_context).BillPay(bpID);

        return RedirectToAction("Index");
    }

    private BpViewModel NewBPVM()
    {
        var vm = new BpViewModel();
        vm.PreviousPayees = GetPayees();
        vm.UserAccounts = GetAccounts().Result;

        return vm;
    }

    private async Task<List<AccountModel>> GetAccounts()
    {
        var customer = await _context.Customers.FindAsync(CustomerID);
        return customer.Accounts;
    }

    private List<PayeeModel> GetPayees()
    {
        List<PayeeModel> payees = new List<PayeeModel>();
        
        var usersBPs = GetBPs().Result;
        if (usersBPs != null && usersBPs.Count > 0)            
            usersBPs.ForEach(bp => payees.Add(_context.Payee.First(p => p.ID == bp.PayeeID)));

        payees = payees.Distinct().ToList();

        return payees;
    }

    private async Task<List<BillPayModel>> GetBPs()
    {
        List<BillPayModel> bps = new List<BillPayModel>();

        var customer = await _context.Customers.FindAsync(CustomerID);

        customer.Accounts.ForEach(account =>
        {
            List<BillPayModel> BP = _context.BillPay.Where(bp => bp.AccountNumber == account.AccountNumber).ToList();
            bps.AddRange(BP);
        });

        bps = bps.OrderBy(o => o.ScheduleTimeUtc).ToList();

        return bps;
    }
}
