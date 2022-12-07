<?php
include 'tools.php';
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (findBookingsActive()) {
    $_SESSION = $_POST;
    header('Location: currentbookings.php');
  }

  include 'post-validation.php';
  $errors = validateBooking();
  if (count($errors) === 0) {
    $_SESSION = $_POST;
    header('Location: receipt.php');
  }
}

// Redirect if invalid movie GET header.
$validMovies = ['ACT', 'RMC', 'AHF', 'FAM'];
$isValid = false;
foreach ($validMovies as $movie) {
  if ($_GET['movie'] === $movie) {
    $isValid = true;
  }
}
if (!$isValid) {
  header('Location: index.php');
  exit();
}
if (isset($_SESSION['dontSaveToFile'])) {
  unset($_SESSION['dontSaveToFile']);
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
  <body>
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
    <main>
    <div id="subtotalSticky" class="stickyFloat">
        <h3>Total Price:
        <div id="subtotal">$0</div>
        </h3>
    </div>
      <section>
        <?= makeTrailerInfo($movies[$_GET['movie']]) ?>
        <div class="lightBg" style="margin-top: 2em; padding: 1em">
          <form method="post">
          <input type="hidden" name="movie" value="<?= $_GET['movie'] ?>">
            <h1>Tickets and Pricing</h1>
            <p style="text-align: center;">Ticket prices listed as Full Price / Discount. </p>
          <div class="bookingTickets">
            <fieldset class="ticketDropdownBox">
              <legend>
                <span><h1>Standard</h1></span>
              </legend>
              <!-- 
                Get seating information from server.  Create dropdowns in js.
                It was done this way as the functions for creating dropdowns were made in js before
                we began learning php in the course and it seemed a shame to discard or rewrite them.
              -->
              <?= php2js($standardSeats, 'standardSeatsJson') ?>
              <script>
                convertSeatsFromJson(standardSeatsJson).forEach(seat => makePricingDropdown(seat));
              </script>
            </fieldset>
            <fieldset class="ticketDropdownBox">
              <legend>
               <h1>First Class</h1>
              </legend>
              <?= php2js($firstClassSeats, 'firstClassSeatsJson') ?>
              <script>
                convertSeatsFromJson(firstClassSeatsJson).forEach(seat => makePricingDropdown(seat));
              </script>
            </fieldset>
          </div>
          <br>
          <span class="errorMsg centerChildren">
            <?php if (isset($errors['seats'])) {
              echo "<p>{$errors['seats']}</p>";
            } ?>
          </span>
          <h1>Session Times</h1>
          <p class="discountMsg">*Discounted sessions are marked with a dot: &#9679</p>
          <div class="centerChildren">
            <div class="sessionTimeContainer">
            <?= php2js($movies[$_GET['movie']], 'selectedMovie') ?>
            <script>
              const sessionTimes = getSessionTimesFromJson(selectedMovie);
              sessionTimes.forEach(time => makeSessionRadioButton(time));
            </script>
        </div>
      </div> <!-- End SessionTimes -->
      <?php
      // --- Set selected radio/dropdowns from POST data.
      makeJsVarFromPostArray('seats');
      makeJsVarFromPostArray('day');
      ?>
      <script>
        if (selectedDay !== undefined){
          selectRadioButtonFromPost(selectedDay);

        if (selectedSeats !== undefined || selectedSeats === null){
          setDropDownValuesFromPost(selectedSeats);
        }
      }
      calcSubTotal();
      </script>
      <div class="centerChildren">
        <div class="customerDetails">
          <?= makeUserInput('Full Name:', 'name') ?>
          <?= makeUserInput('Email Address:', 'email') ?>
          <?= makeUserInput('Mobile Number:', 'mobile') ?>
        </div>
        
      </div>
      <!-- Added for Assignment 4: -->
      <script>
        createCheckBox();
        setInfoFromLocalStorage();
      </script>
      <!-- End of Additions -->
      </div>
        <div class="submitButtonBackground">
          <div class="submitButtonInnerBox">
            <input type="submit" class="nowShowingButton" value="Confirm Booking" id="submitBooking" onclick="rememberMe()" >
          </div>
        </div>
      </form>
      </section>
</main>
  <?= createFooter() ?>
  <?= debugModule() ?>
  <!-- WHILE TESTING POST VALDATION: -->
  <!-- <script>
    let errorWindowIsOpen = true;
    function toggleErrorWindow(){
      if (errorWindowIsOpen){
        document.getElementById("errorsWindow").style.display = "none";
        errorWindowIsOpen = false;
      } else{
        errorWindowIsOpen = true;
        document.getElementById("errorsWindow").style.display = "block";
      }
    }
  </script> -->
    <!-- <div class="errorSticky">
      <button onclick="toggleErrorWindow()" style="none">View Errors</button>
      <div id="errorsWindow">
        <php if ($_POST) {
          echoErrors($errors);
        }?>
      </div>
    </div> -->
  </body>
</html>
