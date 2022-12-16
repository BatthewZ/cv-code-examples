using Assignment2.Data;
using Microsoft.EntityFrameworkCore;

namespace Assignment2.BackgroundServices;

public class BillPayBackgroundService : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<BillPayBackgroundService> _logger;

    public BillPayBackgroundService(IServiceProvider services, ILogger<BillPayBackgroundService> logger)
    {
        _services = services;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("BillPay background service is running.");

        while (!cancellationToken.IsCancellationRequested)
        {
            try 
            {
                await PayBills(cancellationToken);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error trying to process bills - Will try again later.");
            }
            await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
        }   
    }

    private async Task PayBills(CancellationToken cancellationToken)
    {
        using var scope = _services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        var billPays = await context.BillPay.ToListAsync(cancellationToken);
        var dueBillPays = billPays.Where(bp => DateTime.Now >= bp.ScheduleTimeUtc.ToLocalTime()).ToList();

        dueBillPays.ForEach(async bp =>
        {
            if (bp.Account.WillOverdraw(bp.Amount, TransactionType.BILLPAY)) 
            {
                Console.WriteLine("Trying to pay this BP right now will overdraw the account. Delaying payment attempt. ID is " + bp.ID);
             
            }
            else if (bp.IsFrozen)
            {
                Console.WriteLine("This payment is currently blocked by an admin.");
            }
            else
            {
                context.Transactions.Add(bp.ConvertToTransactionModel());
                var bpToUpdate = await context.BillPay.FindAsync(bp.ID);

                if (bp.Period == (char)BillPeriodType.ONEOFF)
                {
                    context.BillPay.Remove(bp);
                }
                else
                {
                    bpToUpdate.ScheduleTimeUtc = bpToUpdate.ScheduleTimeUtc.AddMonths(1);
                }
            } 
        });
        await context.SaveChangesAsync(cancellationToken);
    }
}
