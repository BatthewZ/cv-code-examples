 <?php
 include 'tools.php';
 $receipts = getBookingsFromFile($_SESSION['findBooking']['name'], $_SESSION['findBooking']['email']);
 if (isset($_POST['receiptIndex'])) {

    // Prepare formatting
    $receiptToDisplay = explode (",", array2Csv($receipts[$_POST['receiptIndex']]));
    array_splice($receiptToDisplay, 0, 1);
    setSessionFromRecordRow($receiptToDisplay);
    // Make sure it doesn't save to file
    $_SESSION['dontSaveToFile'] = 'PleaseDontDoit';
    header('Location: receipt.php');
 }
 ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lunardo Booking Page</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&&family=Kdam+Thmor+Pro&family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
        />

        <link rel="icon" href="../../media/cinemalogoIcon.svg" type="image/x-icon" />

        <!-- Style Sheets -->
        <link id="wireframecss" type="text/css" rel="stylesheet" href="../wireframe.css" disabled />
        <link id='stylecss' type="text/css" rel="stylesheet" href="../style.css?t=<?= filemtime('../style.css') ?>">
        <link id="bookingcss" type="text/css" rel="stylesheet" href="booking.css" />
        <script type="text/javascript" src="script.js"></script>
        <script type="text/javascript" src="RememberMe.js"></script>
        <script src="../wireframe.js"></script>
    </head>
    <header>
      <div id="headerPanel">
        <div id="logo">
          <!-- cinemalogo Image originally taken from https://i0.wp.com/theactorspad.com/wp-content/uploads/2018/07/cinema-logo.png?w=591&ssl=1 -->
          <img src="../../media/cinemalogoHeader.svg" style="height: 180px" alt="Lunardo Cinema Logo" />
          <div id="logoText">Lunardo Cinema</div>
        </div>
      </div>
    </header>

    <nav>
      <a href="index.php#aboutUs">About Us</a>
      <a href="index.php#navToSeating">Seating and Prices</a>
      <a href="index.php#nowShowing">Now Showing</a>
    </nav>
    <body>
        <main>
            <h1 style="color: white; text-align: center; padding: 0; margin: 1em;">FIND BOOKING INFORMATION</h1>
            <div class="lightBg" style="padding: 1em">
                <?php 
                    if($receipts){
                       echo <<<"TABLE"
                       <h1>Summary of Previous Bookings:</h1>
                       <table>
                        <tr>
                       TABLE;
                       $headings = ['Date/Time', 'Movie', 'Day', 'Time'];
                        $count = 0;
                        foreach ($headings as $heading) {
                          echo "<th>$heading</th>";
                        }
                        foreach ($allSeats as $seat) {
                          echo "<th>{$seat['name']}</th>";
                        }
                        echo '<th>Total Cost</th>';
                        echo '<th>View Receipt</th>';
                        echo "</tr>";
                        $index = 0;
                        foreach ($receipts as $receipt) {
                          echo '<tr>';
                          echo "<td>{$receipt['date']}</td>"; 
                          echo "<td>{$movies[$receipt['movie']][$title]}</td>"; 
                          echo "<td>{$receipt['day']}</td>"; 
                          echo "<td>{$receipt['time']}</td>";
                          foreach ($allSeats as $seat) {
                            $type = '#' . $seat['type'];
                            echo "<td>{$receipt[$type]}</td>";
                          }
                          $total = formatAsMoney($receipt['total']);
                          echo "<td>$total</td>";
                          echo <<<FORM
                            <td><form method="POST">
                            <input type="hidden" value="$index" name="receiptIndex"><button type="submit">View Receipt</button>
                            </form></td>
                          FORM;
                          echo '</tr>';
                          $index += 1;
                        }
                        echo "</table>";
                    } else {
                        echo "<h1>We were unable to find your bookings.</h1>" ;
                        echo "<h1>Please check your name and email, and try again.</h1>";
                    }
                ?>
            </div>
        </main>
        <?= debugModule() ?>
    </body>
</html>



  