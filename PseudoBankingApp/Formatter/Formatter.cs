
using System.Text.RegularExpressions;

namespace BMTools;

public static class Formatter
{
   
    public static string FormatPostCode(int postcode)
    {
        // If no postcode was entered. Maybe get rid of this check?
        if (postcode == -1)
            return null;

        if (!Helper.WithinRange(postcode, 800, 9999))
        {
            Console.WriteLine("Error: Postcode is not within the Australian postcode range (0800-9999). Postcode is: " + postcode);
            return null;
        }
        return ("" + postcode).PadLeft(4, '0');
    }

    // Is this a duplicate check?
    public static string FormatTfn(int tfn)
    {
        if (tfn == -1)
           return null!;
       

        if (tfn > 999999999 || tfn < 1)
        {
            Console.WriteLine("Error: Tax File Number is invalid. It must be a number between 1 and 999 999 999");
            Console.WriteLine("Tax File Number not set to the db.");
            return null!;
        }
        string tfNum = ("" + tfn).PadLeft(9, '0');
        tfNum = tfNum.Insert(3, " ");
        tfNum = tfNum.Insert(7, " ");
        return tfNum;
    }

    public static string FormatMobileNum(int mobileNumber)
    {
        if (mobileNumber == -1)
            return null!;

        if (!Helper.WithinRange(mobileNumber, 400000000, 499999999))
        {
            Console.WriteLine("Mobile number is not a valid Australian number: " 
                + mobileNumber 
                + "\nMobile number should start with '04' and be 10 digits long.");
            return null!;
        }

        string formattedNum = ("" + mobileNumber).PadLeft(10, '0');
        formattedNum = formattedNum.Insert(4, " ");
        formattedNum = formattedNum.Insert(8, " ");

        return formattedNum;
    }

    public static string FormatPhoneNum(int phoneNum)
    {

        if (!Helper.WithinRange(phoneNum, 100000000, 999999999))
        {
            Console.WriteLine(phoneNum + " is invalid, and must be within the range: 01 0000 0000 - 09 9999 9999");
            return null!;
        }

        return "(0" + phoneNum.ToString().Insert(5, " ").Insert(1, ") "); 
    }

    public static string FormatPhoneNum(string phoneNum)
    {
        if (string.IsNullOrEmpty(phoneNum))
            return null;

        phoneNum = phoneNum.Replace("(", "");
        phoneNum = phoneNum.Replace(")", "");
        phoneNum = phoneNum.Replace(" ", "");
        phoneNum = phoneNum.Trim();

        if (!Regex.IsMatch(phoneNum, @"^\d{10}$"))
            return null;

        phoneNum = phoneNum.Insert(0, "(");
        phoneNum = phoneNum.Insert(3, ")");
        phoneNum = phoneNum.Insert(4, " ");
        phoneNum = phoneNum.Insert(9, " ");

        return phoneNum;
    }

    public static string CapitalizeFirstLetter(this string s)
    {
        if (string.IsNullOrEmpty(s))
            return s;

        if (s.Trim().Length == 0)
            return s;

        if (s.Trim().Length == 1)
            return s.ToUpper();

        string newString = "" + char.ToUpper(s[0]);
        newString += s.Substring(1, s.Length-1).ToLower();
        
        return newString;
    }

    public static string CapitalizeAllFirstLetters(this string s)
    {
        if (string.IsNullOrEmpty(s))
            return s;

        if (s.Trim().Length == 0)
            return s;

        if (s.Trim().Length == 1)
            return s.ToUpper();

        if (s.Trim().Split(" ").Length == 0)
            return CapitalizeFirstLetter(s.Trim());

        if (s.Split("-").Length > 0)
        {
            // Capitalize trailing hyphenated sections (eg: jackson-Jones)
            var hyphenSplitPhrases = s.Split("-");
            s = "";
            for(int i = 0; i < hyphenSplitPhrases.Length; i++)
            {
                Console.WriteLine(hyphenSplitPhrases[i]);
                s += CapitalizeFirstLetter(hyphenSplitPhrases[i]);
                if(i < hyphenSplitPhrases.Length-1)
                {
                    s += "-";
                }
            }
        }

        // Capitalise all individual words
        var words = s.Trim().Split(" ").ToList();

        Console.WriteLine("\n\nWRITING WORDS:");
        words.ForEach(w => Console.WriteLine(w));

        string capitalized = "";
        words.ForEach(word =>
        {
            if (word.Contains("-"))
            {
                var hyphenated = word.Split("-");
                capitalized += CapitalizeFirstLetter(hyphenated[0])+"-"+hyphenated[1] + " ";
            } else
                capitalized += CapitalizeFirstLetter(word) + " ";
        });
        
        return capitalized.Trim();
    }
}

