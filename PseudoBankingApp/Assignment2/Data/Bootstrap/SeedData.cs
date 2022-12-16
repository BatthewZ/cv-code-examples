using Assignment2.Data.Models;
using SimpleHashing;

namespace Assignment2.Data.Bootstrap;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<DatabaseContext>();

        if (context.Customers.Any())
        {
            Console.WriteLine("NO BOOTSTRAP TODAY LOL");
            return;
        }

        var customerDtos = DtoManager.LoadDtos();

        Console.WriteLine("Seeding:");
        Console.WriteLine("Loading context...");
        context = AddDtosToContext(context, customerDtos);
        Console.WriteLine("Saving changes to Database...");
        context.SaveChanges();
    }

    private static DatabaseContext AddDtosToContext(DatabaseContext context, List<CustomerDTO> customerDtos)
    {
        context.AddRange(CustomerModelsFromDto(customerDtos));
        context.AddRange(LoginModelsFromDto(customerDtos));
        context.AddRange(AccountModelsFromDto(customerDtos));
        context.AddRange(TransactionModelsFromDto(customerDtos));
        return context;
    }

    private static List<CustomerModel> CustomerModelsFromDto(List<CustomerDTO> customerDtos)
    {
        var customerModels = new List<CustomerModel>();

        customerDtos.ForEach(customer =>
        {
            customerModels.Add(
                Valid.CustomerModel(
                    customer.CustomerID
                    , customer.Name
                    , null   // AusRegion
                    , -1    // TFN
                    , customer.Address
                    , customer.City
                    , string.IsNullOrEmpty(customer.PostCode) ? -1 : int.Parse(customer.PostCode)
                    , -1 // MobileNumber
                )
            );
        });
        customerModels.RemoveAll(item => item == null);
        return customerModels;
    }

    private static List<LoginModel> LoginModelsFromDto(List<CustomerDTO> customerDtos)
    {
        var loginModels = new List<LoginModel>();

        customerDtos.ForEach(customer =>
        {
            Console.WriteLine(customer.Login.LoginID);
            int loginId = 0;
            int.TryParse(customer.Login.LoginID, out loginId);
            Console.WriteLine(loginId);

            loginModels.Add(
                Valid.LoginModel(
                    loginId,
                    customer.CustomerID,
                    customer.Login.PasswordHash
                )
            );
        });

        loginModels.RemoveAll(item => item == null);
        return loginModels;
    }

    private static List<AccountModel> AccountModelsFromDto(List<CustomerDTO> customerDtos)
    {
        var accountModels = new List<AccountModel>();

        customerDtos.ForEach(customer =>
        {
            customer.Accounts.ToList().ForEach(account =>
            {
                accountModels.Add(Valid.AccountModel(account.AccountNumber, (AccountType)account.AccountType[0], customer.CustomerID));
            });
        });

        accountModels.RemoveAll(item => item == null);
        return accountModels;
    }

    private static List<TransactionModel> TransactionModelsFromDto(List<CustomerDTO> customerDtos)
    {
        var transactionModels = new List<TransactionModel>();

        // For every account in every customer, convert TransactionDto to Transactionmodels.
        customerDtos.ForEach(customer =>
        {
            customer.Accounts.ToList().ForEach(account =>
            {
                account.Transactions.ToList().ForEach(transaction =>
                {
                    transactionModels.Add(
                        Valid.TransactionModel(
                            TransactionType.DEPOSIT,
                            account.AccountNumber,
                            (decimal)transaction.Amount,
                            Convert.ToDateTime(transaction.TransactionTimeUtc),
                            -1,
                            transaction.Comment
                        ));
                });
            });
        });

        transactionModels.RemoveAll(item => item == null);
        return transactionModels;
    }
}
