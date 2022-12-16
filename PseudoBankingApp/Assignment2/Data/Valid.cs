using Assignment2.Data.Models;
using Assignment2.ViewModels;
using BMTools;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SimpleHashing;
using System.Text.RegularExpressions;

namespace Assignment2.Data;

// All validation checks, including valid model creation, validation of view models, commonly used Enums, and helper methods.
// The original idea was that, the Valid class would be a gateway between anything being sent to the DB or the DB repo; if a single
// thing failed the check when creating a new Valid.CustomerModel(), then the CustomerModel would be null and it would be easier to catch.
// The method names were intended to be read as Valid.MethodName, so if you wanted a CustomerViewModel that was definitely a valid one
// (all feels passed validation), you'd create a Valid.CustomerViewModel().

// ...In hindsight it ended up being a *massive* class that should have been broken down, but this kid ran out of puff...!

public static class Valid
{
    // Validate model construction:

    public static CustomerModel CustomerModel(
          int id
        , string name
        , AusRegion? stateOrTerritory = null
        , int tfn = -1
        , string address = null
        , string city = null
        , int postcode = -1
        , int mobileNumber = -1)
    {
        string error = "Returning null CustomerModel.\n";

        if (!id.IsValidID(error + "CustomerID"))
            return null;

        name = name.HasLengthUpTo(50);
        if (string.IsNullOrEmpty(name))
        {
            Console.WriteLine(error + "Invalid Name: " + name);
            return null;
        }

        address = address.HasLengthUpTo(50);
        city = city.HasLengthUpTo(40);

        string taxFileNumber = Formatter.FormatTfn(tfn);
        string mobNum = Formatter.FormatMobileNum(mobileNumber);
        string postalCode = Formatter.FormatPostCode(postcode);

        if ((postcode != -1 && string.IsNullOrEmpty(postalCode))
          || (mobileNumber != -1 && string.IsNullOrEmpty(mobNum))
          || (tfn != -1 && string.IsNullOrEmpty(taxFileNumber))
           )
        {
            Console.WriteLine(error.Replace("\n", ""));
            return null;
        }

        string ausRegion = stateOrTerritory == null ? null : stateOrTerritory.ToString();

        // All checks passed.
        Console.WriteLine("Creating CustomerModel");
        return new CustomerModel
        {
            ID = id,
            Name = name,
            TFN = taxFileNumber,
            Address = address,
            City = city,
            PostCode = postalCode,
            StateOrTerritory = ausRegion,
            MobileNumber = mobNum
        };
    }

    public static AccountModel AccountModel(int accountNumber, AccountType type, int customerID)
    {
        string error = "Returning null AccountModel.\n";

        if (!accountNumber.IsValidID(error + nameof(accountNumber)))
            return null;

        if (!customerID.IsValidID(error + nameof(customerID)))
            return null;

        return new AccountModel
        {
            AccountNumber = accountNumber,
            Type = (char)type,
            CustomerID = customerID
        };
    }

    public static CustomerViewModel CustomerViewModel(CustomerViewModel cvm, ModelStateDictionary modelState)
    {
        
        bool isValid = true;

        //ID
        if (cvm.ID == 0) 
        {
            Console.WriteLine("Internal Error: Customer View Model has an ID of 0 (It was not set through the form).");
            return null;
        }

        //Name
        if (string.IsNullOrEmpty(cvm.Name) || !Regex.IsMatch(cvm.Name.Trim(), RegexPattern.NAME)) 
        {
            modelState.AddModelError("InvalidName", "Please enter a first and last name.");
            isValid = false;
            Console.WriteLine("IsValid is now False: Name is null/empty, or does not match.");
        }
        else 
            cvm.Name = cvm.Name.Trim();

        //TFN 
        if (!string.IsNullOrEmpty(cvm.TFN)) { 
            int tfnNum = 0;
            string formattedTFN = null;
            if (int.TryParse(cvm.TFN.Trim().Replace(" ", ""), out tfnNum))
            {
                formattedTFN = Formatter.FormatTfn(tfnNum);
            }

            if (string.IsNullOrEmpty(formattedTFN))
            {
                modelState.AddModelError("InvalidTFN", "Please enter a valid tax file number (TFN must be 9 digits long, and within range of 000000001-999999999).");
                isValid = false;
                Console.WriteLine("IsValid is now False: Formatted TFN is null");
            }
            else
                cvm.TFN = formattedTFN;
        }
        
        //Address
        if (!string.IsNullOrEmpty(cvm.Address))
        {
            cvm.Address = cvm.Address.Trim();
            if (!Regex.IsMatch(cvm.Address, RegexPattern.ADDRESS))
            {
                modelState.AddModelError("InvalidAddress", "Please enter a valid address: 'Unit Number'(optional) followed by Street Number Street Name. E.g.: 'Unit 9, 123 Fake Street' or '12 pancake avenue'");
                isValid = false;
                Console.WriteLine("IsValid is now False: Address did not match.");
            }   
        }

        //City
        if (!string.IsNullOrEmpty(cvm.City))
        {
            cvm.City = cvm.City.Trim();
            if (!Regex.IsMatch(cvm.City, RegexPattern.CITY))
            {
                modelState.AddModelError("InvalidCity", "Please enter a valid city name. One or two words, or leave blank.");
                isValid = false;
                Console.WriteLine("IsValid is now False: City did not match.");
            }
        }

        // StateOrTerritory
        // Does not need validation - The values are offered in a drop down generated by the enum names;
        // They will always correlate with the enums or be 'unset' with the current model.
        // Secondary validation happens in the CustomerModel Set methods.

        //PostCode
        if (!string.IsNullOrEmpty(cvm.PostCode))
        {
            cvm.PostCode = cvm.PostCode.Trim().Replace(" ", "");
            if (!Regex.IsMatch(cvm.PostCode, RegexPattern.POSTCODE_INPUT))
            {
                modelState.AddModelError("InvalidPostCode", "Must be a valid Australian postcode between 0800 and 9999.");
                isValid = false;
                Console.WriteLine("IsValid is now False: Postcode did not match.");
            }
        }

        //Mobile Number
        if (!string.IsNullOrEmpty(cvm.MobileNumber))
        {
            if (!Regex.IsMatch(cvm.MobileNumber.Trim(), RegexPattern.MOBILE_NUM_INPUT))
            {
                modelState.AddModelError("InvalidMobNum", "Must start with '04' followed by 8 digits: 04XXXXXXXX or 04 XXXX XXXX or 04XX XXX XXX.");
                isValid = false;
                Console.WriteLine("IsValid is now False: Mobile Number did not match.");
            }
            else
                cvm.MobileNumber = cvm.MobileNumber.Trim();
        }

        return isValid ? cvm : null;
    }

    public static TransactionModel TransactionModelFromViewModel(TransactionViewModel vm, ModelStateDictionary modelState, List<AccountModel>? validDestinationAccounts)
    {
        if (vm == null || modelState == null)
            return null;

        if (vm.AccountNumber == 0)
        {
            modelState.AddModelError("InvalidAccount", "Please select an account.");
            return null;
        }

        bool isValid = true;
        TransactionType type = (TransactionType)vm.TransactionType;

        if (!vm.AccountNumber.IsValidID("TransactionViewModel.AccountNumber"))
        {
            modelState.AddModelError("InvalidAccount", "Please select a valid account.");
            isValid = false;
        }

        var account = vm.Accounts == null ? null : vm.Accounts.Find(acc => acc.AccountNumber == vm.AccountNumber);

        if (account == null)
        {
            Console.WriteLine("User attempted to update a valid account that was not theirs. Security has been informed.");
            isValid = false;
        }

        bool checkOverDraw = (type == TransactionType.DEPOSIT || (type == TransactionType.TRANSFER && !vm.destAcc.HasValue)) 
                            ? false 
                            : true;

        if (checkOverDraw && account.WillOverdraw(vm.Amount, type))
        {
            string msg = "The amount entered";
            if (account.ChargeServiceFee() && Fee(type) != 0)
                msg += " plus the service fee of " + Fee(type).ToString("C");

            msg += " will overdraw the selected account. The maximum amount that you can withdraw is: " + account.MaxWithdrawAllowed(type).ToString("C");

            modelState.AddModelError("InvalidAmount", msg);
            isValid = false;
        }

        if (!Helper.WithinRange(vm.Amount, 0.01m, 999999999))
        {
            modelState.AddModelError("InvalidAmount", "Please enter an amount between 0.01 and 999,999,999.");
            isValid = false;
        }

        if (type == TransactionType.TRANSFER && vm.destAcc.HasValue && validDestinationAccounts == null)
        {
            modelState.AddModelError("InvalidDestinationAcc", "ERROR: Something went wrong internally. Valid.TransactionModel was given a type of TRANSFER without a validDestinationAccount list.");
            return null!;
        }

        if (type == TransactionType.TRANSFER && !vm.destAcc.HasValue)
        {
            modelState.AddModelError("InvalidDestinationAcc", "Please enter a valid destination account.");
            isValid = false;
        }

        if (type == TransactionType.TRANSFER && vm.destAcc.HasValue) 
        {
             if (vm.destAcc == vm.AccountNumber)
            {
                modelState.AddModelError("InvalidDestinationAcc", "You cannot transfer to and from the same account.");
                isValid = false;
            } 
            else if (validDestinationAccounts == null || !validDestinationAccounts.Any(account => account.AccountNumber == vm.destAcc))
            {
                modelState.AddModelError("InvalidDestinationAcc", "We couldn't find the destination account on our system. Please check the destination account number and try again.");
                isValid = false;
            }
        }

        return !isValid ? null! : new TransactionModel
        {
            TransactionType = (char)type,
            AccountNumber = vm.AccountNumber,
            Account = account,
            Amount = Math.Round(vm.Amount, 2),
            Comment = vm.Comment.HasLengthUpTo(30),
            DestinationAccountNumber = vm.destAcc.HasValue ? vm.destAcc.Value : null,
            // TransactionTimeUtc = // Intentionally left here commented as a reminder: The Transaction time is set later
        };
    }

    public static TransactionModel ServiceFeeTransactionModel(TransactionModel tm)
    {
        var type = (TransactionType)tm.TransactionType;

        // All validation checks should have been made by this point.

        return new TransactionModel
        {
            TransactionType = (char)TransactionType.SERVICECHARGE,
            AccountNumber = tm.AccountNumber,
            Account = tm.Account,
            Amount = Fee(type),
            Comment = (char)type + " Service Charge.",
            TransactionTimeUtc = DateTime.UtcNow
        };

    }

    public static TransactionModel TransferDepositTransactionModel(TransactionModel tm) 
    {
        if (!tm.DestinationAccountNumber.HasValue)
            return null;

        return new TransactionModel
        {
            TransactionType = (char)TransactionType.TRANSFER,
            AccountNumber = (int)tm.DestinationAccountNumber,
            Amount = tm.Amount,
            Comment = "Transfer",
            TransactionTimeUtc= DateTime.UtcNow
        };
    }

    public static TransactionModel TransactionModel(
          TransactionType type
        , int accountNum
        , decimal amount
        , DateTime? dateInUtc
        , int destinationAccount = -1
        , string comment = null)
    {

        string error = "Returning null Transaction.\n";

        if (!accountNum.IsValidID(error+"Account Number"))
            return null;

        if (amount <= 0)
        {
            Console.WriteLine("Amount must be more than $0: " + amount + error);
            return null;
        }

        int? destAcc = null;
        if (destinationAccount != -1)
        {
            if (!destinationAccount.IsValidID(error + "Destination Account"))
                return null;

            destAcc = destinationAccount;
        }
        
        return new TransactionModel
        {
            TransactionType = (char)type,
            AccountNumber = accountNum,
            Amount = Math.Round(amount, 2),
            Comment = comment.HasLengthUpTo(30),
            DestinationAccountNumber = destAcc,
            TransactionTimeUtc = dateInUtc ?? DateTime.UtcNow
        };
    }

    public static LoginModel LoginModel(int loginID, int customerID, string passwordHash)
    {
        string error = "Returning null LoginModel.\n";

        string id = null;
        if (!Helper.WithinRange(loginID, 1, 99999999))
        {
            Console.WriteLine(error + "Invalid login ID: " + loginID);
            return null;
        }
        id = ("" + loginID).PadLeft(8, '0');

        if (!customerID.IsValidID(error + nameof(customerID)))
            return null;

        if (passwordHash.Length != 64)
        {
            Console.WriteLine(error + "Invalid password hash length.");
            return null;
        }

        return new LoginModel 
        { 
            LoginID = id,
            CustomerID = customerID,
            PasswordHash = passwordHash
        };
    }

    public static BpViewModel BpViewModel(BpViewModel vm, ModelStateDictionary modelState)
    {
        if (!modelState.IsValid)
        {
            Console.WriteLine("ModelState was invalid.");
            return null;
        }

        bool isValid = true;

        // --- BILLPAY VALIDATION

        // Account Number
        if (vm.BP_AccountNumber == 0)
        {
            modelState.AddModelError("InvalidAccount", "Please select an account.");
            isValid = false;
        }

        // Amount
        if (!Helper.WithinRange(vm.Amount, 0.01m, 999999999.99m))
        {
            modelState.AddModelError("InvalidAmount", "Please enter a valid amount of money: Between 0.01 - 999,999,999,99");
            Console.WriteLine("Invalid Amount.");
            isValid = false;
        }

        // Date Time :
        var now = DateTime.Today;
        if (now.Date > vm.ScheduledTimeNow.Date)
        {
            modelState.AddModelError("InvalidDate", "Cannot schedule dates in the past.");
            Console.WriteLine("Invalid DateTime");
            isValid = false;
        }

        // --- PAYEE VALIDATION

        // Has the user either (selected an existing payee and also input new payee details), or; selected no payee and input no payee details
        if (vm.Payee_ID >= 0 && !vm.AllFieldsAreEmpty())
        {
            modelState.AddModelError("PayeeConflict", "You currently have a payee selected from the dropdown above, and have entered new payee information below. " +
                "You must choose one or the other - either someone from the list, or create a new payee.");

            Console.WriteLine("Invalid Conflict - no payee fields entered and payID was not selected from the dropdown.");
            isValid = false;
        } else if (vm.Payee_ID == -1 && vm.AllFieldsAreEmpty())
        {
            modelState.AddModelError("PayeeConflict", "You must either choose an existing payee from the dropdown list, or enter the full details of a new payee below.");
            Console.WriteLine("Invalid Conflict - payee_ID was -1 but new payee fields had no data. ID is: " + vm.Payee_ID);
            isValid = false;
        }

        // If it's a new payee
        if (vm.Payee_ID == -1)
        {
            // Name
            if (string.IsNullOrEmpty(vm.Payee_Name) || !Regex.IsMatch(vm.Payee_Name.Trim(), RegexPattern.NAME))
            {
                modelState.AddModelError("InvalidName", "Please enter a valid name (must be two words).");
                Console.WriteLine("Invalid name");
                var v = vm.Payee_Name;
                Console.WriteLine("{0,-15}{1,-15}{2,-15}", "Name: " + v, string.IsNullOrEmpty(v), Regex.IsMatch(v ?? "", RegexPattern.NAME));
                isValid = false;
            } else
                vm.Payee_Name = vm.Payee_Name.HasLengthUpTo(50).CapitalizeAllFirstLetters();

            // Address
            if (string.IsNullOrEmpty(vm.Payee_Address) || !Regex.IsMatch(vm.Payee_Address, RegexPattern.ADDRESS) || vm.Payee_Address.HasLengthUpTo(50) == null)
            {
                modelState.AddModelError("InvalidAddress", "Please enter a valid address: 'Unit Number'(optional) followed by Street Number Street Name. E.g.: 'Unit 9, 123 Fake Street' or '12 pancake avenue'");
                Console.WriteLine("Invalid street address.");
                isValid = false;
            } else 
                vm.Payee_Address = vm.Payee_Address.HasLengthUpTo(50).CapitalizeAllFirstLetters();

            // City
            if (string.IsNullOrEmpty(vm.Payee_City) || !Regex.IsMatch(vm.Payee_City, RegexPattern.CITY) || vm.Payee_City.HasLengthUpTo(40) == null)
            {
                modelState.AddModelError("InvalidCity", "Please enter a valid city name (one or two words).");
                Console.WriteLine("Invalid City: ");
                isValid = false;
            } else
                vm.Payee_City = vm.Payee_City.HasLengthUpTo(40).CapitalizeAllFirstLetters();

            // PostCode
            if (string.IsNullOrEmpty(vm.Payee_PostCode) || !Regex.IsMatch(vm.Payee_PostCode, RegexPattern.POSTCODE_INPUT))
            {
                modelState.AddModelError("InvalidPostCode", "Must be a valid Australian postcode between 0800 and 9999.");
                Console.WriteLine("Invalid PostCode");
                isValid = false;
            } else
                vm.Payee_PostCode = vm.Payee_PostCode;

            if (string.IsNullOrEmpty(vm.Payee_State))
            {
                modelState.AddModelError("InvalidRegion", "You must select a state or territory.");
                Console.WriteLine("Invalid Region");
                isValid = false;
            }

            // Phone Number
            vm.Payee_Phone = Formatter.FormatPhoneNum(vm.Payee_Phone);
            if (string.IsNullOrEmpty(vm.Payee_Phone))
            {
                modelState.AddModelError("InvalidPhone", "Please enter a valid phone number. Format must be either: 0X XXXX XXXX or (0X) XXXX XXXX. Phone number must begin with a 0.");
                Console.WriteLine("Invalid Phone Number");
                isValid = false;
            }
        }
        return isValid ? vm : null;
    }

    private static bool AllFieldsAreEmpty(this BpViewModel vm)
    {
        bool fieldsAreEmpty = true;
        List<string> payeeFields = new List<string> 
        {
            vm.Payee_Name,
            vm.Payee_Address,
            vm.Payee_City,
            vm.Payee_State,
            vm.Payee_PostCode,
            vm.Payee_Phone
        };

        payeeFields.ForEach(pf =>
        {
            if (!string.IsNullOrEmpty(pf))
                fieldsAreEmpty = false;
        });

        return fieldsAreEmpty;
    }

    public static BillPayModel BillPayModel(int accountNum, int payeeID, decimal amount, DateTime datetime, BillPeriodType periodType)
    {
        string error = "Returning null BillPayModel.\n";
        if (!accountNum.IsValidID(error + nameof(accountNum)))
            return null;

        if (payeeID < 0)
        {
            Console.WriteLine(error + "PayeeID is less than 0.");
            return null;
        }

        if (amount <= 0)
        {
            Console.WriteLine(error + "Amount cannot be less than or equal to 0.");
            return null;
        }

        Console.WriteLine("Creating new BillPayModel");
        return new BillPayModel
        {
            AccountNumber = accountNum,
            PayeeID = payeeID,
            Amount = Math.Round(amount, 2),
            ScheduleTimeUtc = datetime,
            Period = (char)periodType
        };
    }

    public static PayeeModel PayeeModel(string name, string address, string city, AusRegion state, int postcode, int phoneNum)
    {
        string error = "Returning null PayeeModel\n";

        name = name.HasLengthUpTo(50);
        if (string.IsNullOrEmpty(name))
        {
            Console.WriteLine(error + "Name was invalid.");
            return null;
        }

        address = address.HasLengthUpTo(50);
        if (string.IsNullOrEmpty(address))
        {
            Console.WriteLine(error + "Address was invalid.");
            return null;
        }

        city = city.HasLengthUpTo(40);
        if (string.IsNullOrEmpty(city))
        {
            Console.WriteLine(error + "City was invalid.");
            return null;
        }

        string phone = Formatter.FormatPhoneNum(phoneNum);
        string postalCode = Formatter.FormatPostCode(postcode);
        if (string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(postalCode))
            return null;


        Console.WriteLine("Creating new PayeeModel");
        return new PayeeModel
        {
            Name = name,
            Address = address,
            City = city,
            State = state.ToString(),
            PostCode = postalCode,
            Phone = phone
        };
    }

    public static bool PasswordChange(PasswordViewModel pvm, LoginModel lm, ModelStateDictionary modelState)
    {
        if (lm == null)
        {
            Console.WriteLine("Something went wrong getting associated customer login model.");
            return false;
        }

        bool isValid = true;

        if (string.IsNullOrEmpty(pvm.OldPassword))
            modelState.AddModelError("OldPassword", "Must enter your current password.");

        if (string.IsNullOrEmpty(pvm.NewPassword))
            modelState.AddModelError("NewPassword", "Please enter a new password.");

        if (string.IsNullOrEmpty(pvm.ConfirmPassword))
            modelState.AddModelError("ConfirmPassword", "You must type in your new password again.");

        if (string.IsNullOrEmpty(pvm.OldPassword) || string.IsNullOrEmpty(pvm.NewPassword) || string.IsNullOrEmpty(pvm.ConfirmPassword))
        {
            return false;
        }

        if (!Regex.IsMatch(pvm.NewPassword, RegexPattern.PASSWORD))
        {
            modelState.AddModelError("NewPassword", "Invalid password: " +
                "Must be 8-20 characters long. Only alphanumeric characters and: - + _ * ^ ! $. Cannot have multiple hyphens in a row. ");
            isValid = false;
        }

        if (!pvm.NewPassword.Equals(pvm.ConfirmPassword))
        {
            modelState.AddModelError("ConfirmPassword", "New passwords do not match.");
            isValid = false;
        }

        if (!PBKDF2.Verify(lm.PasswordHash, pvm.OldPassword))
        {
            modelState.AddModelError("OldPassword", "Your old password was incorrect.");
            isValid = false;
        }

        return isValid;
    }

    public static string HasLengthUpTo(this string? s, int maxLength)
    {
        if (string.IsNullOrEmpty(s) || s.Trim().Length == 0)
            return null;

        s = s.Trim();
        if (s.Length > maxLength)
        {
            Console.WriteLine(s + " Has too many characters in it. Must be within 0-" + maxLength + ".");
            s = s.Substring(0, maxLength);
            Console.WriteLine("It has been trimmed down to: " + s);
        }
        return s;
    }

    public static bool IsValidID(this int i, string idName)
    {
        if (!Helper.WithinRange(i, 1000, 9999))
        {
            Console.WriteLine(idName + " was invalid (must be between 1000-9999: " + i);
            return false;
        }
        return true;
    }

    public static decimal Fee(TransactionType transType) 
    {
        decimal fee = 0;
        if (transType == TransactionType.WITHDRAW)
            fee = 0.05m;

        if (transType == TransactionType.TRANSFER)
            fee = 0.1m;

        return fee;
    }

    public static decimal MinBalance(AccountType accountType)
    {
        return accountType == AccountType.CHECKING ? 300 : 0;
    }

    public static string DebitOrCredit(this TransactionModel tm)
    {
        if (tm.TransactionType == (char)TransactionType.DEPOSIT || (tm.TransactionType == (char)TransactionType.TRANSFER && !tm.DestinationAccountNumber.HasValue))
        {
            return "Credit";
        }
        return "Debit";
    }

}

public enum AusRegion 
{
    ACT, NSW, VIC, TAS, QLD, NT, WA
}

public enum TransactionType
{
    DEPOSIT = 'D', WITHDRAW = 'W', TRANSFER = 'T', SERVICECHARGE = 'S', BILLPAY = 'B'
}

public enum BillPeriodType
{
    ONEOFF = 'O', MONTHLY = 'M'
}

public enum AccountType
{
    CHECKING = 'C', SAVINGS = 'S'
}
