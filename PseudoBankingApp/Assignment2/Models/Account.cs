using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment2.Data.Models;

public class AccountModel
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
    [Display(Name = "Account Number")]
    public int AccountNumber { get; init; }

    [Required, Display(Name = "Type"), Column(TypeName = "char"),
        RegularExpression(@"C|S", ErrorMessage = "Account Type must be 'C' or 'S'.")]
    public char Type { get; init; }

    [Required]
    public int CustomerID { get; init; }
    public virtual CustomerModel Customer { get; init; }

    // Ambiguous navigation property
    [InverseProperty(nameof(TransactionModel.Account))]
    public virtual List<TransactionModel> Transactions { get; set; }

    [InverseProperty(nameof(BillPayModel.Account))]
    public virtual List<BillPayModel> Bills { get; set; }

    public decimal CheckBalance()
    {
        decimal balance = 0;
        Transactions.ForEach(transaction =>
        {
            // Could check to make sure type is valid. It *should* be valid.
            TransactionType type = (TransactionType)transaction.TransactionType;

            // If it's a transfer and there's no 'destination account', then it must be the recipient of the transfer.
            if (type == TransactionType.DEPOSIT || (type == TransactionType.TRANSFER && !transaction.DestinationAccountNumber.HasValue))
            {
                balance += transaction.Amount;
            }
            else 
            {
                balance -= transaction.Amount;
            }
        });
        return balance;
    }

    public bool ChargeServiceFee()
    {
        int count = 0;
        Transactions.ForEach(transaction => 
        {
            TransactionType type = (TransactionType)transaction.TransactionType;
            if ((type == TransactionType.TRANSFER && transaction.DestinationAccountNumber.HasValue) || type == TransactionType.WITHDRAW)
                count++;
        });
        return count > 2 ? true : false;
    }

    public bool WillOverdraw(decimal amount, TransactionType type) 
    {
        decimal fee = ChargeServiceFee() ? Valid.Fee(type) : 0;
        decimal currBal = CheckBalance();
        return currBal - (fee + amount) < Valid.MinBalance((AccountType)Type) ? true : false; ;
    }

    public decimal MaxWithdrawAllowed(TransactionType type)
    {
        var minBalance = Valid.MinBalance((AccountType)Type);
        decimal fee = ChargeServiceFee() ? Valid.Fee(type) : 0;
        decimal currBal = CheckBalance();
        
        decimal maxWithdraw = currBal - fee - minBalance;

        return maxWithdraw > 0 ? maxWithdraw : 0;
    }
}
