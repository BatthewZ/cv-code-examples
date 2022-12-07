<div style="display:none;"><?= include 'tools.php' ?></div>
<?php
session_start();
if (!$_SESSION) {
  header('Location: index.php');
  exit();
}
$receipt = makeReceipt(null);

if (!isset($_SESSION['dontSaveToFile'])) {
  saveBookingToFile($receipt);
} 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lunardo Cinema: Your Receipt</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script&&family=Kdam+Thmor+Pro&family=Montserrat:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" href="../../media/cinemalogoIcon.svg" type="image/x-icon" />
    <link id='receiptcss' type="text/css" rel="stylesheet" href="receipt.css?t=<?= filemtime('receipt.css') ?>">
  </head>
  <body>
    <page size="A4">
      <div class="receipt">
        <div class="row">
          <div class="customerInfo">
            <h1>Your Receipt</h1>
            <h2>Customer Information</h2>
            <p><?= strtoupper($receipt['name']) ?></p>
            <p><?= $receipt['email'] ?></p>
            <p><?= $receipt['mobile'] ?></p>
          </div>
          <div class="companyInfo">
            <p class="logoText">Lunardo Cinema</p>
            <p><strong>Email:</strong><br> <?= $COMPANY_EMAIL ?></p>
            <p><strong>Phone:</strong><br> <?= $COMPANY_PHONE ?></p>
          </div>
        </div>
        <div class="receiptInfo">
         <table style="width: 100%; text-align: left;"> 
          <caption style="text-align: left;">
            <h3>Purchase Information</h3>
            <h2> 
              <?= $movies[$_SESSION['movie']][$title] ?>,
              <?= getValidDay($receipt['day']) ?> 
              <?= $movies[$_SESSION['movie']][$sessionTimes][getValidDay($receipt['day'])] ?>
            </h2>
          </caption>
          <tr>
            <th>Ticket Type</th>
            <th>Number of Tickets</th>
            <th>Cost</th>
          </tr>
            <?= printPurchases($receipt) ?>
          </table>
        </div>
        <div style="min-height: 80px;"></diV>
        <div class="logoText" style="text-align: center;">Enjoy the show!</div>
        <p><h2 style="color:grey; text-align: center;">Tickets Overleaf</h2></p>
      </div>
    </page>
    <!-- Print all tickets on new pages where necessary: -->
    <?= printTickets($receipt) ?>
    <?= debugModule() ?>
  </body>
</html>
