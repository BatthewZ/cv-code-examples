using Xunit;
using Assignment2.Data;
using Assignment2.Data.Models;
using System.Drawing;
using System.Net;
using SimpleHashing;

namespace A2.Testing;

public class TestingValidLogin
{

    // If Valid

    [Theory]
    [InlineData(1, 9999, "abc123")]
    [InlineData(99999999, 9999, "abc123")]
    [InlineData(99999999, 1000, "abc123")]
    public void TestLogin_NotNull(int loginID, int customerID, string password)
    {
        Assert.NotNull(Valid.LoginModel(loginID, customerID, PBKDF2.Hash(password)));
    }

    // If Invalid

    [Theory]
    [InlineData(0, 9999, "abc123")] // Invalid login
    [InlineData(0, 19999, "abc123")] // Invalid customerID
    [InlineData(0, 19999, " ")] // Invalid password
    public void TestLogin_IsNull(int loginID, int customerID, string password)
    {
        var pw = PBKDF2.Hash(password) ?? " ";
        Assert.Null(Valid.LoginModel(loginID, customerID, pw));
    }

    [Fact]
    public void TestLogin_UnhashedPassword()
    {
        Assert.Null(Valid.LoginModel(1, 9999, "abc123"));
    }
}