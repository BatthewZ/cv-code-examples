using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Assignment2.Migrations
{
    public partial class RegexValidation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.RenameColumn(
                name: "PayeeID",
                table: "Payee",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "CustomerID",
                table: "Customers",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "BillpayID",
                table: "BillPay",
                newName: "ID");

            migrationBuilder.AlterColumn<string>(
                name: "Period",
                table: "BillPay",
                type: "char(1)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1)");

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionType = table.Column<string>(type: "char(1)", maxLength: 1, nullable: false),
                    AccountNumber = table.Column<int>(type: "int", nullable: false),
                    DestinationAccountNumber = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    TransactionTimeUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_AccountNumber",
                        column: x => x.AccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_DestinationAccountNumber",
                        column: x => x.DestinationAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountNumber",
                table: "Transactions",
                column: "AccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_DestinationAccountNumber",
                table: "Transactions",
                column: "DestinationAccountNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Payee",
                newName: "PayeeID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Customers",
                newName: "CustomerID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "BillPay",
                newName: "BillpayID");

            migrationBuilder.AlterColumn<string>(
                name: "Period",
                table: "BillPay",
                type: "nvarchar(1)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "char(1)");

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<int>(type: "int", nullable: false),
                    DestinationAccountNumber = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    TransactionTimeUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionType = table.Column<string>(type: "char(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.TransactionID);
                    table.ForeignKey(
                        name: "FK_Transaction_Accounts_AccountNumber",
                        column: x => x.AccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transaction_Accounts_DestinationAccountNumber",
                        column: x => x.DestinationAccountNumber,
                        principalTable: "Accounts",
                        principalColumn: "AccountNumber");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_AccountNumber",
                table: "Transactions",
                column: "AccountNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_DestinationAccountNumber",
                table: "Transactions",
                column: "DestinationAccountNumber");
        }
    }
}
