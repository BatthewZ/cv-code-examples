<?php
  session_start();
  error_reporting( E_ERROR | E_WARNING | E_PARSE );

  // --- Global variables

  // Company Info:
  $COMPANY_EMAIL = "lunardo@lunardocinema.com.au";
  $COMPANY_PHONE = "+61 411 338 421";

  // Form field validation error messages (used in input title="" and by post-validation.php):
  $ERROR_MOBILE = "Must be a valid Australian mobile number.";
  $ERROR_EMAIL = "Please enter a valid email address.";
  $ERROR_NAME = "Please enter your first and last name.";
  $ERROR_SEAT = "You must select at least one seat from the dropdowns above.";

  // User information validation Regex patterns:
  $NAME_PATTERN = "/^([a-zA-ZÀ-ž](\.|\-|')?)+ (([a-zA-ZÀ-ž]+(\.|\-|')?) ?){1,3}$/"; 
  $MOBILE_PHONE_PATTERN = "/^((\+?61|0)4|\(04\)|\(\+?614\))( ?\d){8}$/";
  $EMAIL_PATTERN = "/^([a-zA-Z0-9](_|\-|\.)?)+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]{2,3}){1,3}$/";

  // Movie array variables here for naming/calling consistency:
  $id = 'id';
  $title = 'title';
  $blurb = 'blurb';
  $rating = 'rating';
  $cast = 'cast';
  $duration = 'duration';
  $director = 'director';
  $posterClass = 'posterClass';
  $youtubeURL = 'youtubeURL';
  $sessionTimes = 'sessionTimes';
  $type = 'type';

  // Weekday variables here for naming/calling consistency:
  $monday = 'Monday';
  $tuesday = 'Tuesday';
  $wednesday = 'Wednesday';
  $thursday = 'Thursday';
  $friday = 'Friday';
  $saturday = 'Saturday';
  $sunday = 'Sunday';
  $days = [$monday, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday];

  // Seat pricing data attributes for naming consistency
  $FULLPRICE = 'full';
  $DISCPRICE = 'disc';

  // Seat types
  $STA = 'STA';
  $STC = 'STC';
  $STCH = 'STCH';
  $FCA = 'FCA';
  $FCC = 'FCC';
  $FCCH = 'FCCH';

  // 'type' used for JSON parsing and for the calculatePrice() method.
  $allSeats = [
    $STA => ['type' => $STA, 'name' => "Standard Adult", $FULLPRICE => 20.5, $DISCPRICE => 15],
    $STC => ['type' => $STC, 'name' => "Standard Concession", $FULLPRICE => 18, $DISCPRICE => 13.5],
    $STCH => ['type' => $STCH, 'name' => "Standard Child", $FULLPRICE => 16.5, $DISCPRICE => 12],
    $FCA => ['type' => $FCA, 'name' => "First Class Adult", $FULLPRICE => 30, $DISCPRICE => 24],
    $FCC => ['type' => $FCC, 'name' => "First Class Concession", $FULLPRICE => 27, $DISCPRICE => 22.5],
    $FCCH => ['type' => $FCCH, 'name' => "First Class Child", $FULLPRICE => 24, $DISCPRICE => 21]
  ];

  $standardSeats = [
    $STA => $allSeats[$STA],
    $STC => $allSeats[$STC],
    $STCH => $allSeats[$STCH]
  ];

  $firstClassSeats = [
    $FCA => $allSeats[$FCA],
    $FCC => $allSeats[$FCC],
    $FCCH => $allSeats[$FCCH]
  ];

  $movies = [
    'ACT' => [
      $title => 'Top Gun: Maverick',
      $rating => 'M15+',
      $type => 'ACT',
      $blurb => "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground.",
      $cast => 'Tom Cruise, Jennifer Connelly, Miles Teller, Val Kilmer',
      $duration => '2hr 15m',
      $director => 'Joseph Kosinski',
      $posterClass => '4', // set div class="poster-4"
      $youtubeURL => 'https://www.youtube.com/embed/giXco2jaZ_4',
      $sessionTimes => [
        $monday => "9:00pm",
        $tuesday => "9:00pm",
        $wednesday => "9:00pm",
        $thursday => "9:00pm",
        $friday => "9:00pm",
        $saturday => "6:00pm",
        $sunday => "6:00pm"
      ]
    ],
    'RMC' => [
      $title => "Mrs. Harris Goes to Paris",
      $rating => 'PG13+',
      $type => 'RMC',
      $blurb => 'A widowed cleaning lady in 1950s London falls madly in love with a couture Dior dress, and decides that she must have one of her own.',
      $cast => 'Jason Isaacs, Lesley Manville, Anna Chancellor, Rose Williams',
      $duration => '1hr 32m',
      $director => 'Anthony Fabian',
      $posterClass => '2',
      $youtubeURL => 'https://www.youtube.com/embed/iO9JcPbbmAA',
      $sessionTimes => [
        $monday => "",
        $tuesday => "",
        $wednesday => "12:00pm",
        $thursday => "12:00pm",
        $friday => "12:00pm",
        $saturday => "3:00pm",
        $sunday => "3:00pm"
      ]
    ],
    'FAM' => [
      $title => 'Lightyear',
      $rating => 'PG13+',
      $type => 'FAM',
      $blurb => 'While spending years attempting to return home, marooned Space Ranger Buzz Lightyear encounters an army of ruthless robots commanded by Zurg who are attempting to steal his fuel source.',
      $cast => 'Chris Evans, Keke Palmer, Seter John',
      $duration => '1hr 40m',
      $director => 'Angus MacLane',
      $posterClass => '1',
      $youtubeURL => 'https://www.youtube.com/embed/BwZs3H_UN3k',
      $sessionTimes => [
        $monday => "12:00pm",
        $tuesday => "12:00pm",
        $wednesday => "6:00pm",
        $thursday => "6:00pm",
        $friday => "6:00pm",
        $saturday => "12:00pm",
        $sunday => "12:00pm"
      ]
    ],
      'AHF' => [
        $title => 'Samra Prithviraj',
        $rating => 'PG13+',
        $type => 'AHF',
        $blurb => 'A fearless warrior. An epic love story. Witness the grand saga of Samrat Prithviraj Chauhan.',
        $cast => 'Akshay Kumar, Sanjay Dutt, Manushi Chhillar, Sakshi Tanwar',
        $duration => '2hr 15m',
        $director => 'Chandra Prakash Dwivedi',
        $posterClass => '3',
        $youtubeURL => 'https://www.youtube.com/embed/33-CQdPHyjw',
        $sessionTimes => [
          $monday => "6:00pm",
          $tuesday => "6:00pm",
          $wednesday => "",
          $thursday => "",
          $friday => "",
          $saturday => "9:00pm",
          $sunday => "9:00pm"
        ]
      ]
  ];


  // --- Misc Helpers:

  // Check that DAY is valid within selected movie DAY.
  function getValidDay($day){
    global $monday, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday;
    switch(strtoupper($day)){
      case "MON":
        return $monday;
        break;
      case "TUE":
        return $tuesday;
        break;
      case "WED":
        return $wednesday;
        break;
      case "THU":
        return $thursday;
        break;
      case "FRI":
        return $friday;
        break;
      case "SAT":
        return $saturday;
        break;
      case "SUN":
        return $sunday;
        break;
      default:
        echo "<p>No Match Found</p>";
        return "";
        break;      
    }
  }

  // --- Formatting methods:

  function formatAsMoney($number){
    return "$".sprintf('%.2f', $number);
  }

  function formatToTwoDecimals($number){
    return sprintf('%.2f', $number);
  }

  function blankOrString($str){
    if($str === null || trim($str) === ''){
      return "";
    }
    return $str;
  }

  // --- Html generating methods:

  function makeFlipCard($movie){
    $posterID = 'poster-' . $movie['posterClass'];
    $upperClassTitle = strtoupper($movie['title']);
    echo<<<"MOVIEDATA"
    <div class="flipCard" tabindex="0">
      <div class="flipInner">
        <div class="flipFront">
          <div class="movieContainer">
            <div class="moviePoster">
              <div class="$posterID"></div>
            </div>
            <div class="movieCardFrontInfo"> 
              <h1>{$movie['title']}</h1>
              <h2>{$movie['rating']}</h2>
              <div id="flipFrontTable" class="displayWhenWide">
                <table style="color: white;">
                  <tr>
                    <th>Director:</th>
                    <td>{$movie['director']}</td>
                  </tr>
                  <tr>
                    <th>Cast:</th>
                    <td>{$movie['cast']}</td>
                  </tr>
                  <tr>
                    <th>Runtime:</th>
                    <td>{$movie['duration']}</td>
                  </tr>
                </table>
            </div>
          </div>
        </div>
      </div>
      <div class="flipBack">
      <h2>$upperClassTitle</h2>
      <div class="sectionRow spaceAround">
        <div class="col-even">
          <strong>Synopsis</strong>
            <p>
              {$movie['blurb']}
            </p>
          <button class="nowShowingButton" type="submit" name="movie" value="{$movie['type']}">Book Now</button>
        </div>
        <div class="displayWhenWide"><hr></div>
          <div class="col-even movieTimes">
            <div style="padding-bottom: 15px;">
              <strong>Movie Times</strong>
            </div>
            <table style="color: white;">
    MOVIEDATA;
    global $days;
    for($i = 0, $len=count($days); $i < $len; $i++){
      if(strlen($movie['sessionTimes'][$days[$i]]) > 0)
      {
        echo "<tr><th>".$days[$i].":</th>";
        echo "<td>".$movie['sessionTimes'][$days[$i]]."</td></tr>";
      }
    }
    echo<<<"MOVIEDATA"
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    MOVIEDATA;
  }

  function makeTrailerInfo($movie){
    echo<<<"MOVIEDATA"
    <div class="sectionContent">
      <h1 style="text-align: center">{$movie['title']}</h1>
      <div class="videoWrapper">
        <div id="trailer">
          <iframe
            width="560"
            height="315"
            src="{$movie['youtubeURL']}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <p>
        <strong>Synopsis</strong>
        <br>
        {$movie['blurb']}
      </p>
      <p>
        <strong>Run Time:</strong>
        <br>
        {$movie['duration']}
      </p>
      <p>
        <strong>Director</strong>
        <br>
        {$movie['director']}
      </p>
      <p>
        <strong>Cast:</strong>
        <br>
        {$movie['cast']}
      </p>
    </div>
    MOVIEDATA;
  }

  function makeTicketPriceTable($seats, $caption){
    global $FULLPRICE, $DISCPRICE;
    // Later on, fill this out for index.php.
    echo<<<"TABLE"
      <table>
      <caption><h2>$caption</h2></caption>
      <tr>
        <th></th>
    TABLE;
    foreach($seats as $s){
      echo "<th>".$s['name']."</th>";
    }
    echo<<<"TABLE"
      </tr>
      <tr>
        <th>Normal:</th>
    TABLE;
    foreach($seats as $s){
      echo "<th style='color: black; font-weight: normal;'>".formatAsMoney($s['full'])."</th>";
    }
    echo<<<"TABLE"
      </tr>
      <tr>
        <th>Discount:*</th>
    TABLE;
    foreach($seats as $s){
      echo "<th style='color: black; font-weight: normal;'>".formatAsMoney($s['disc'])."</th>";
    }
    echo<<<"TABLE"
      </tr>
      </table>
    TABLE;
  }

  function makeUserInput($title, $emailNameOrMobile){
    global $ERROR_EMAIL, $ERROR_MOBILE, $ERROR_NAME, $NAME_PATTERN, $EMAIL_PATTERN, $MOBILE_PHONE_PATTERN;

    $placeHolder = "";
    $error = "";
    $emailNameOrMobile = strtolower($emailNameOrMobile);
    $value = getUserInfoFromPost($emailNameOrMobile);
    $pattern = "";

    switch ($emailNameOrMobile){
      case "name":
        $placeHolder = "John Smith";
        $error = $ERROR_NAME;
        $pattern = str_replace("/", "", $NAME_PATTERN);
        break;
      case "email":
        $placeHolder = "your@email.com";
        $error = $ERROR_EMAIL;
        $pattern = str_replace("/", "", $EMAIL_PATTERN);
        break;
      case "mobile":
        $placeHolder = "04XX XXX XXX";
        $error = $ERROR_MOBILE;
        $pattern = str_replace("/", "", $MOBILE_PHONE_PATTERN);
        break;
      default:
        return "<p>Something went wrong</p>";
    }

    $pattern = str_replace("^", "", $pattern);
    $pattern = str_replace("$", "", $pattern);
    
    $id = $emailNameOrMobile."InputID";

    echo<<<"LABEL"
      <script>
        const errorWindow = document.getEementById("errorsWindow")
        errorWindow.innerHtml += "\n\n\n";
        errorWindow.innerHtml += "Placeholder: $placeHolder\n";
        errorWindow.innerHtml += "Error: $error\n";
        errorWindow.innerHtml += "Value: $value\n";
        errorWindow.innerHtml += "Pattern: $pattern\n";

      </script>
      <div class="customerInput">
        <label>
          <h2>$title</h2>
          <input type="text"
            id="$id"
            name="user[$emailNameOrMobile]"
            placeholder="$placeHolder"
            value="$value"
            pattern="$pattern"
            title="$error"
            required
            />
            <span class="errorMsg">
    LABEL;
      if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        makeUserError($emailNameOrMobile);  
      }
    echo <<<"LABEL"
            </span>
            <br>
          </label>
        </div>
      LABEL;
  }

  function makeUserError($userError){
    global $errors;
    if (isset($errors['user'])) {
      if (isset($errors['user'][$userError])) {
        echo '<p>' . $errors['user'][$userError] . '</p>';
      } else {
        echo "<p style='color:white; user-select: none;'>.</p>";
      }
    }
  }

  function makeJsVarFromPostArray($postArray){
    $varName = 'selected'.ucFirst($postArray);
    if (array_key_exists($postArray, $_POST)){
      php2Js($_POST[$postArray], $varName);
    } else
      php2js("", $varName);
  }

  function getUserInfoFromPost($emailNameOrMobile){
    $emailNameOrMobile = strtolower($emailNameOrMobile);
    if (array_key_exists("user", $_POST)){

      if(array_key_exists($emailNameOrMobile, $_POST['user'])){
        return $_POST['user'][$emailNameOrMobile];
      } else
        return "";
    }
  }

  function debugModule(){
    echo" 
    <aside id='debug'>
      <hr />
      <h3>Debug Area</h3>
      <pre>
        GET Contains:";
      print_r($_GET);
        echo "POST Contains:";
      print_r($_POST);
        echo "SESSION Contains:";
        if (isset($_SESSION))
          print_r($_SESSION);
        echo "
      </pre>
    </aside>
    ";
  }

  // Thanking Trevor for his php2js function.
  function php2js( $arr, $arrName ) {
    $arrJSON = json_encode($arr, JSON_PRETTY_PRINT);
    echo <<<"CDATA"
    <script>
      var $arrName = $arrJSON;
    </script>
    CDATA;
  }

  // --- Receipt Page methods:

  function calculatePrice(){
    global $allSeats;

    $discOrFullPrice = discOrFull($_SESSION['movie'], $_SESSION['day']);
    $sessionSeats = $_SESSION['seats'];
    $price = 0;
    $arrLen = count($sessionSeats);

    foreach($allSeats as $seat){
      if ($sessionSeats[$seat['type']]){
        $ticketPrice = $seat[$discOrFullPrice];
        $subPrice = $sessionSeats[$seat['type']] * $seat[$discOrFullPrice];
        $numOfTickets = $sessionSeats[$seat['type']];
        $price += $subPrice;
      } 
    }

    return $price;
  }

  function makeReceipt($date){
    if (is_null($date))
      $date = date('Y F d  H:i');

    global $movies, $allSeats, $sessionTimes;
    $fullOrDisc = discOrFull($_SESSION['movie'], $_SESSION['day']);

    $receipt = [
      'date' => $date,
      'name' => $_SESSION['user']['name'],
      'email' => $_SESSION['user']['email'],
      'mobile' => $_SESSION['user']['mobile'],
      'movie' => $_SESSION['movie'],
      'day' => $_SESSION['day'],
      'time' => $movies[$_SESSION['movie']][$sessionTimes][getValidDay($_SESSION['day'])]
    ];

    foreach($allSeats as $seat){
      $type = $seat['type'];
      $receipt['#'.$type] = numOfSeatsFromSession($type);
      $receipt['$'.$type] = priceOfSeats($seat, $receipt['#'.$type], $fullOrDisc);
    }
    $receipt['total'] = calculatePrice();
    $receipt['GST'] = formatToTwoDecimals($receipt['total'] / 11);

    return $receipt;
  }

  function numOfSeatsFromSession($seatType){
    return $_SESSION['seats'][$seatType] ? $_SESSION['seats'][$seatType] : 0;
  }

  function priceOfSeats($seat, $numOfSeats, $fullOrDisc){
    return $numOfSeats * $seat[$fullOrDisc];
  }

  function saveBookingToFile($receipt){
    $myFile = fopen("bookings.txt", "a");
    fputcsv($myFile, $receipt, ',');
    fclose($myFile);
  }

  function printPurchases($receipt){
    global $allSeats;
    foreach($allSeats as $s){
      $type = $s['type'];
      $numOfTix = $receipt['#'.$type];
      
      if ($numOfTix > 0){
        $costOfTix = formatAsMoney($receipt['$'.$type]);
        $name = $s['name'];
        echo<<<"ROW"
        <tr>
          <td>$name</td>
          <td>$numOfTix</td>
          <td>$costOfTix</td>
        </tr>
        ROW;
      }
    }

    $gst = formatAsMoney($receipt['GST']);
    $total = formatAsMoney($receipt['total']);
    echo<<<"GSTANDTOTAL"
      <tr>
        <td></td>
        <td><strong>GST (included):</strong></td>
        <td>$gst</td>
      </tr>
      <tr>
        <td></td>
        <td><strong>Total:</strong></td>
        <td><strong>$total</strong></td>
      </tr>
    GSTANDTOTAL;
  }

  function printTickets($receipt){
    global $movies, $allSeats, $title;
    
    $movieName = $movies[$receipt['movie']][$title];
    $time = $receipt['time'];
    $day = getValidDay($receipt['day']);
    $thankYouMessage = "
    <p style='
      text-align: center; 
      font-size: 1em;
      padding-top: 10px;
    '>
      Thank you for booking with Lunardo Cinema!
    </p>";

    foreach($allSeats as $seat){
      $sType = '#'.$seat['type'];
      $sName = $seat['name'];
    }

    // Start a page.
    echo "<page size='A4'>";
    echo "<div class='tickets'>";
    
    $tixCount = 0;
    $tixPerRow = 0;
    foreach($allSeats as $seat){
      $sType = '#'.$seat['type'];
      $sName = $seat['name'];
      
      if ($receipt[$sType] > 0){
        for ($s = 0; $s < $receipt[$sType]; $s++){
          // Make a new page after 18 tickets are printed. 18 limit prevents page overflow.
          if ($tixCount === 18){
            $tixCount = 0;
            echo "
              </div>
              $thankYouMessage
            </page>
            <page size='A4'>
              <div class='tickets'>";
          }
          // Make a ticket
          echo <<<"TICKET"
            <div class="ticket">
              <div class="ticketInfo">
                <div class="scriptText">
                  Lunardo Cinema
                </div>
                <strong>$movieName, $day $time</strong>
                <br>
                <div style="
                  font-size: 1.2em; 
                  margin-top: 3px;
                  letter-spacing: 2px;"
                > 
                  $sName
                </div>
              </div>
              <div class ="ticketAdmitOne">
                <h3>Admit<br>One</h3>
              </div>
            </div>
          TICKET;

          $tixPerRow++;
          $tixCount++;
            if ($tixPerRow === 2){
              echo "</div><div class='tickets'>";
              $tixPerRow = 0;
            }
        }
      }
    }
    echo "</div>
    $thankYouMessage
    </page>";
  }

  function discOrFull($movie, $day){
    global $movies, $DISCPRICE, $FULLPRICE, $monday, $sessionTimes, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday;
    $validDay = getValidDay($day);

    if ($validDay === $monday)
      return $DISCPRICE;

      if ($validDay === $saturday || $validDay === $sunday)
      return $FULLPRICE;

    if (preg_match("/^(12):\d{2}pm$/", $movies[$movie][$sessionTimes][$validDay])){
      return $DISCPRICE;
    }

    return $FULLPRICE;
  }

  // --- Assignment 4 methods:

  function echoP($infoToEcho){
    echo "<p>{$infoToEcho}</p>";
  }

  function getBookingsFromFile($name, $email){
    $receipts = [];
    if( ($fp = fopen("bookings.txt", "r")) && flock($fp, LOCK_SH) !== false ) {
      $headings = fgetcsv($fp);
      while( ($aLineOfCells = fgetcsv($fp)) !== false )
        $records[] = $aLineOfCells;
      flock($fp, LOCK_UN);
      fclose($fp);
      foreach($records as $record){
        if (isset($record[1])){
          if ($record[1] == $name && $record[2] == $email){
            setSessionFromRecordRow($record);
            array_push($receipts, makeReceipt($record[0]));
          }
        }
      }
    }
    return $receipts;
  }

  function setSessionFromRecordsIndex($index){
    if( ($fp = fopen("bookings.txt", "r")) && flock($fp, LOCK_SH) !== false ) {
      $headings = fgetcsv($fp);
      while( ($aLineOfCells = fgetcsv($fp)) !== false )
        $records[] = $aLineOfCells;
      flock($fp, LOCK_UN);
      fclose($fp);
    }

  }

  function setSessionFromRecordRow($record){
    global $allSeats;
    $_SESSION['movie'] = $record[4];
    $_SESSION['day'] = $record[5];
    $_SESSION['user']['name'] = $record[1];
    $_SESSION['user']['email'] = $record[2];
    $_SESSION['user']['mobile'] = $record[3];
    $count = 7; // starting index in record for seat info.
    foreach($allSeats as $seat){
      $_SESSION['seats'][$seat['type']] = $record[$count];
      // example count: get index of '#STA', skip index of '$STA'
      $count += 2; 
    }
  }

  function findBookingsActive(){
    if (isset($_POST['findBooking']['name']) && isset($_POST['findBooking']['email'])) {
      if ($_POST['findBooking']['name'] !== '' && $_POST['findBooking']['email'] !== ''){
        return true;
      } 
    } 
    return false;
  }

  function array2Csv($receipt)
  {
    $csvString = '';
    foreach ($receipt as $info) {
      $csvString .= ',' . $info;
    }
    return $csvString;
  }

  function createFooter(){
    echo <<<"FOOTER"
      <footer style="margin: 0;">
        <div>
          <form method="POST">
            <h3>Find Previous Bookings</h3>
            Name:
            <input type="text" name='findBooking[name]' required />
            Email:
            <input type="email" name='findBooking[email]' required  />
            <input type="submit" />
          </form>
          <hr />
          <strong>Contact Us: </strong>
          <div>lunardo@lunardocinema.com.au | +61 411 338 421</div>
          <br>
          <strong>Student Details: </strong> 
          <div>Ben Matthews | s3851558 | <a href="https://github.com/BatthewZ/wp" target="_blank">My Repo</a></div>
          <div>Last modified:
  FOOTER;
  echo date('Y F d  H:i', filemtime($_SERVER['SCRIPT_FILENAME']));
  echo <<<"FOOTER"
          </div>
          <div>
            <br>   
            &copy;
            <script>
              document.write(new Date().getFullYear());
            </script>
          </div>
        <div><button id="toggleWireframeCSS" onclick="toggleWireframe()">Toggle Wireframe CSS</button></div>
      </footer>
    FOOTER;
  }
?>

