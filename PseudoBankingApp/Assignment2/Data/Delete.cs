namespace Assignment2.Data;

public class Delete
{
    private readonly DatabaseContext _context;
    public Delete(DatabaseContext context) => _context = context;

    public async Task<bool> BillPay(int ID)
    {
        var bp = await _context.BillPay.FindAsync(ID);

        if (bp == null)
            return false;

        _context.BillPay.Remove(bp);

        return await _context.SaveChangesAsync() > 0 ? true : false;
    }
}
