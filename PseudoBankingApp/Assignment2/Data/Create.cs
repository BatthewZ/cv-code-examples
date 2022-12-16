using Assignment2.Data.Models;
using Assignment2.ViewModels;

namespace Assignment2.Data;

public class Create
{
    private readonly DatabaseContext _context;
    public Create(DatabaseContext context) => _context = context;

    public async Task<bool> BillPay(BillPayModel bpm)
    {
        if (bpm == null)
            return false;

        _context.BillPay.Add(bpm);

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<bool> Payee(PayeeModel pm)
    {
        if (pm == null)
            return false; 

        _context.Payee.Add(pm);
        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<bool> Transaction(TransactionModel tm)
    {
        if (tm == null)
            return false;

        _context.Transactions.Add(tm);
        return await _context.SaveChangesAsync() > 0 ? true : false;
    }

}
