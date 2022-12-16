using Newtonsoft.Json;
using Assignment2.Testing;
using Assignment2.Data.Models;

namespace Assignment2.Data.Bootstrap;

public static class DtoManager
{
    private static string DtoJsonConnectionString { get; } = WebApplication.CreateBuilder().Configuration.GetConnectionString("BootstrapInfo");

    public static List<CustomerDTO> LoadDtos()
    {
        using HttpClient client = new HttpClient();
        string json = client.GetStringAsync(DtoJsonConnectionString).Result;

        Console.WriteLine((json.Length == 0 || string.IsNullOrEmpty(json)) 
                        ? "Bootstrap JSON was not loaded properly." 
                        : "JSON successfully loaded. ");

        var customerDtos = JsonConvert.DeserializeObject<List<CustomerDTO>>(json);

        Console.WriteLine((customerDtos == null || customerDtos.Count == 0)
                        ? "Could not deserialize JSON to Dtos. " 
                        : "Dtos loaded. Number of CustomerDtos is: " + customerDtos.Count);

        if (customerDtos == null)
            return null;

        return customerDtos;
    }
}


public class Rootobject
{
    public CustomerDTO[] Customers { get; set; }
}

public class CustomerDTO
{
    public int CustomerID { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string PostCode { get; set; }
    public AccountDTO[] Accounts { get; set; }
    public LoginDTO Login { get; set; }
}

public class LoginDTO
{
    public string LoginID { get; set; }
    public string PasswordHash { get; set; }
}

public class AccountDTO
{
    public int AccountNumber { get; set; }
    public string AccountType { get; set; }
    public int CustomerID { get; set; }
    public TransactionDTO[] Transactions { get; set; }
}

public class TransactionDTO
{
    public float Amount { get; set; }
    public string Comment { get; set; }
    public string TransactionTimeUtc { get; set; }
}