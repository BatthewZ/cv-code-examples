using Xunit;
using Assignment2.Data;
using Assignment2.Data.Models;
using System.Drawing;
using System.Net;

namespace A2.Testing;

public class TestingValidCustomer
{

    // testing with all parameters

    [Theory]
    [InlineData(9999, "Boris the Brilliant", null, -1, null, null, -1, -1)]
    [InlineData(9998, "Terence Billy", AusRegion.WA, 123456789, "42 Stirling Way", "Perth", 5000, 0482031423)]
    [InlineData(9997, "Billy OneDone", AusRegion.NSW, 123456789, "182 Pathfinder St", "Melbournia", 8000, 433123123)]
    public void TestValidCustomerAllParams_NotNull(int id, string name, AusRegion? region, int tfn = -1, string address = null, string city = null, int postcode = -1, int mobNum = -1)
    {
        var result = Valid.CustomerModel(id, name, region, tfn, address, city, postcode, mobNum);
        Assert.NotNull(result);
    }

    [Theory]
    [InlineData(9999, "", null, -1, null, null, -1, 1)] // invalid name
    [InlineData(999, "", null, -1, null, null, -1, 1)] // invalid ID (range between 1000-9999
    [InlineData(19998, "Terence Billy", AusRegion.WA, 123456789, "42 Stirling Way", "Perth", 5000, 0482031423)]// Invalid ID
    [InlineData(9999, "Boris the Brilliant", null, -1, null, null, -1, 1)] // invalid mobile number
    [InlineData(9997, "Billy OneDone", AusRegion.NSW, 123456789, "182 Pathfinder St", "Melbournia", 8000, 23412)] // Invalid Mobile Number
    [InlineData(9999, "Boris the Brilliant", null, -1, null, null, 1, -1)] // invalid postcode
    [InlineData(9999, "Boris the Brilliant", null, -1, null, null, 799, -1)] // invalid postcode
    [InlineData(9999, "Boris the Brilliant", null, -1, null, null, 10000, -1)] // invalid postcode
    [InlineData(9997, "Billy OneDone", AusRegion.NSW, 1000000000, "182 Pathfinder St", "Melbournia", 8000, 433123123)]// Invalid TFN
    public void TestValidCustomerAllParams_IsNull(int id, string name, AusRegion? region, int tfn = -1, string address = null, string city = null, int postcode = -1, int mobNum = -1)
    {
        var result = Valid.CustomerModel(id, name, region, tfn, address, city, postcode, mobNum);
        Assert.Null(result);
    }

    // Testing with two parameters (as per the DTO/JSON when Seeding Data)

    [Theory]
    [InlineData(9999, "Boris the Brilliant")]
    [InlineData(1000, "Terence MacLerence")]
    public void TestValidCustomerIDandNameOnly_NotNull(int id, string name)
    {
        var result = Valid.CustomerModel(id, name);
        Assert.NotNull(result);
    }

    [Theory]
    [InlineData(10000, "Boris the Brilliant")] // Invalid ID
    [InlineData(999, "Should BeNull")] // Invalid ID
    [InlineData(9999, null)] // invalid name 
    [InlineData(9999, "  ")] // invalid name 
    public void TestValidCustomerIDandNameOnly_IsNull(int id, string name)
    {
        var result = Valid.CustomerModel(id, name);
        Assert.Null(result);
    }
}