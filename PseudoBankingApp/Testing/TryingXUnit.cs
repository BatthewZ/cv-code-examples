using Xunit;

namespace Testing;

public class TryingXUnit
{
    // Everything in this method is considered a 'single test'.
    // If every Assert passes in this test, the test passes.
    // If a single assert fails in this test, the test fails.
    // Remember: Fact runs once. Theory runs multiple times.
    [Fact]
    public void Plus_Test()
    {
        //arrange
        // set up the class if required

        // the act on its own could be like:
        int result = MyMaths.Plus(1, 1);

        // act + assert
        Assert.Equal(2, MyMaths.Plus(1, 1));
        Assert.Equal(0, MyMaths.Plus(6, 6));
        Assert.Equal(12, MyMaths.Plus(5, 7));

        // Does the method throw an exception? :O
        //Assert.Throws<ArgumentOutOfRangeException>(() => MyMaths.Plus(-1, -1));

        // Is there only one of each object in the collection?
        // Assert.Distinct
    }

    // Same code, but implemented as a theory:
    // InlineData passes these args to the method signature
    [Theory]
    [InlineData(1, 1, 2)]
    [InlineData(6, 6, 12)]
    [InlineData(6, 6, 0)]
    [InlineData(5, 7, 12)]
    public void Plus_Test_Theory(int x, int y, int expected)
    {
        //arrange
        // set up the class if required

        // Act
        int result = MyMaths.Plus(x, y);

        // Assert
        Assert.Equal(expected, result);
    }
}