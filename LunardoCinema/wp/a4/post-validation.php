<?php
// include 'tools.php';
// Order Date,Name,Email,Mobile,Movie Code,Day of Movie,Time of Movie,#STA,$STA,#STC,$STC,#STCH,$STCH,#FCA,$FCA,#FCC,$FCC,#FCCH,$FCCH,Total,GST

function validateBooking()
{
  global $movies,
    $ERROR_EMAIL,
    $ERROR_MOBILE,
    $ERROR_NAME,
    $ERROR_SEAT,
    $NAME_PATTERN,
    $MOBILE_PHONE_PATTERN,
    $EMAIL_PATTERN;

  $errors = []; // new empty array to return error messages

  // Check for all fields first. If any of them are not present, return.
  if (!isset($_POST['movie'])) {
    $errors['movie'] = "Movie array didn't exist.";
  }

  if (!isset($_POST['seats'])) {
    $errors['seatsDidntExist'] = "Seats array didn't exist.";
  }

  if (!isset($_POST['day'])) {
    $errors['day'] = "Day array didn't exist.";
  }

  if (!isset($_POST['user'])) {
    $errors['user'] = "User array didn't exist.";
  }

  if (!isset($_POST['user']['name'])) {
    $errors['user'] = "User name array didn't exist.";
  }

  if (!isset($_POST['user']['email'])) {
    $errors['user'] = "User email array didn't exist.";
  }

  if (!isset($_POST['user']['mobile'])) {
    $errors['user'] = "User mobile array didn't exist.";
  }

  // If the arrays are invalid, don't perform any other checks yet.
  if (count($errors) > 0) {
    return $errors;
  }

  if ($_POST['user']['name'] == '') {
    $errors['user']['name'] = "Name can't be blank";
  } elseif (!preg_match($NAME_PATTERN, $_POST['user']['name'])) {
    $errors['user']['name'] = $ERROR_NAME;
  }
  if ($_POST['user']['email'] == '') {
    $errors['user']['email'] = "Email can't be blank";
  } elseif (!preg_match($EMAIL_PATTERN, $_POST['user']['email'])) {
    $errors['user']['email'] = $ERROR_EMAIL;
  }
  if ($_POST['user']['mobile'] == '') {
    $errors['user']['mobile'] = "Mobile can't be blank";
  } elseif (!preg_match($MOBILE_PHONE_PATTERN, $_POST['user']['mobile'])) {
    $errors['user']['mobile'] = $ERROR_MOBILE;
  }

  // This is a general movie check
  if (!isset($movies[$_POST['movie']])) {
    header('Location: index.php');
    exit();
  }

  // Check for valid movie
  $validMovies = ['ACT', 'RMC', 'AHF', 'FAM'];
  $isValid = false;
  foreach ($validMovies as $movie) {
    if ($_POST['movie'] === $movie) {
      $isValid = true;
    }
  }
  if ($isValid != 1) {
    $errors['movie'] = 'Invalid Movie Type.';
  }

  // Check to make sure number of seats is valid, and that at least 1 seat was selected.
  $atLeastOneSelectedSeat = false;
  foreach ($_POST['seats'] as $seat) {
    if ($seat > 0) {
      $atLeastOneSelectedSeat = true;
    }
    if ($seat) {
      if (filter_var($seat, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 10]]) === false) {
        $errors['seats'] = 'Error: Number of seats was invalid.  The seat in question was: ' . $seat;
      }
    }
  }

  if ($atLeastOneSelectedSeat === false) {
    $errors['seats'] = $ERROR_SEAT;
  }

  // Make sure that the movie is playing on the selected day.
  $selectedDay = getValidDay($_POST['day']);
  if (trim($selectedDay) === '') {
    $errors['day'] = 'Invalid session time / day selected.';
  } else {
    $sessionTime = $movies[$_POST['movie']]['sessionTimes'][$selectedDay];
    if (trim($sessionTime) === '') {
      $errors['day'] = 'Invalid session time: Selected movie not showing on the selected day.';
    }
  }
  return $errors;
}

// Used for testing:
function echoErrors($errors)
{
  if (count($errors) > 0) {
    echo '<p>There are errors! Error count is: ' . count($errors) . '</p>';
    foreach ($errors as $e) {
      if (is_array($e)) {
        foreach ($e as $nestedError) {
          echo '<p>' . $nestedError . '</p>';
        }
      } else {
        echo '<p>' . $e . '</p>';
      }
    }
  } else {
    echo '<p>No errors. :)</p>';
  }
}
?>
