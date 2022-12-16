namespace Testing;

public static class MyMaths
{
    public static int Plus(int x, int y)
    {
        // Purposely planted bug.
        if (x == 6 && y == 6)
            return 0;

        return x + y;
    }

    public static int PlusOnlyPositiveNumbers(int x, int y)
    {
        if(x < 0)
            throw new ArgumentOutOfRangeException(nameof(x), x, "Cannot be negative.");
        if(y < 0)
            throw new ArgumentOutOfRangeException(nameof(y), y, "Cannot be negative.");

        return x + y;
    }

    public static int PlusWithOverflowChecked(int x, int y)
    {
        return checked(x + y);
    }
}
