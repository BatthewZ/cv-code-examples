
namespace BMTools;

public static class RegexPattern
{
    // Commonly used global regex patterns.
    public const string FOUR_DIGITS = @"^\d{4}$";
    public const string TAX_FILE_NUMBER = @"^\d{3} \d{3} \d{3}$";
    public const string AUS_REGIONS = @"^WA|NT|NSW|VIC|TAS|QLD|ACT$";
    public const string PHONE_NUMBER = @"^\(0[1-9]\) \d{4} \d{4}$";
    public const string MOBILE_NUMBER = @"^04\d{2} \d{3} \d{3}$";
    public const string EIGHT_DIGITS = @"^\d{8}$";
    public const string AMOUNT = @"^\$?\d{0,9}(\.?\d{0,2}?)$"; // Max ammount is 999,999,999.99
    public const string COMMENT = @"^[a-zA-Z0-9 ]{0,30}?$";
    public const string NAME = @"^[a-zA-Z]+(( |\-|')[a-zA-Z]+)+$"; // Two to three names, allowing for hyphenated names and apostrophes.
    public const string ADDRESS = @"^(((u|U)nit ?\d{0,4}( |, ?))?\d{1,5} [a-zA-Z]+ [a-zA-Z]+)?$"; // "Unit 9, 123 Fake Street" || "12 pancake avenue" || "" (empty string permitted)
    public const string CITY = @"^(\w+(( |\-)[a-zA-Z]+)?)?$"; // 0-2 words connected with a space/hyphen.
    public const string TFN_INPUT = @"^(( ?\d){9})?$"; // "", or nine digits with any number of single spaces in between.
    public const string POSTCODE_INPUT = @"^((0[8-9]\d\d|[1-9]\d{3}))?$"; // Number within the range of 0800-9999 (must include leading '0' if < 1000).
    public const string MOBILE_NUM_INPUT = @"^(04( ?\d){8})?$"; // "", or 04 followed by digits or single spaces, requiring 8 digits. 04XXXXXXXX || 04 XXXX XXXX || 04XX XXX XXX
    public const string PASSWORD = @"^([a-zA-Z0-9_\^\*!\$\+]\-?){6,20}$"; // Length of 8-20. Cannot have multiple hyphens in a row. Alphanumeric and: - + _ * ^ ! $
    public const string PHONE_INPUT = @"^((0[1-9]( ?\d){8})|(\(0[1-9]\)( ?\d){8}))?$"; // "0X" followed by 8 digits with any number of single-spaces between.
}