
namespace BMTools;

public static class Helper
{
    public static bool WithinRange(decimal numToCheck, decimal minNum, decimal maxNum)
    {
        if (numToCheck >= minNum && numToCheck <= maxNum)
            return true;

        return false;
    }

    public static void PrintAllPropertiesAndValues(object yourClassObject)
    {
        string propsToDisclude = "List";

        var props = yourClassObject.GetType().GetProperties().ToList();

        Console.WriteLine(" --- Writing Props:");

        props.ForEach(prop =>
        {
            if (prop.Name.Contains(propsToDisclude))
                return;

            Console.WriteLine(prop.Name + " : " + prop.GetValue(yourClassObject));
        });
    }

}
