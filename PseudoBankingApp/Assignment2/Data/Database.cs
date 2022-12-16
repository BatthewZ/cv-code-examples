using Assignment2.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Assignment2.Data;

public class DatabaseContext : DbContext
{
    public DbSet<CustomerModel> Customers { get; set; }
    public DbSet<LoginModel> Logins { get; set; }
    public DbSet<AccountModel> Accounts { get; set; }
    public DbSet<TransactionModel> Transactions { get; set; }
    public DbSet<BillPayModel> BillPay { get; set; }
    public DbSet<PayeeModel> Payee { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
}
