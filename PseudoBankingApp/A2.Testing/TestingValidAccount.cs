using Xunit;
using Assignment2.Data;
using Assignment2.Data.Models;
using System.Drawing;
using System.Net;

namespace A2.Testing;

public class TestingValidACcount
{

    [Theory]
    [InlineData(9999, AccountType.SAVINGS, 9999)]
    public void TestAccounts_NotNull(int accountNum, AccountType type, int customerID)
    {
        Assert.NotNull(Valid.AccountModel(accountNum, type, customerID));
    }

    [Theory]
    [InlineData(19999, AccountType.SAVINGS, 9999)] // invalid accountNum
    [InlineData(999, AccountType.SAVINGS, 9999)] // invalid accountNum
    [InlineData(9999, AccountType.SAVINGS, 19999)] // invalid customerID
    [InlineData(9999, AccountType.SAVINGS, 999)] // invalid customerID
    public void TestAccounts_IsNull(int accountNum, AccountType type, int customerID)
    {
        Assert.Null(Valid.AccountModel(accountNum, type, customerID));
    }

}