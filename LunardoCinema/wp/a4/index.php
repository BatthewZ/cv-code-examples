<div style="display:none;">
<?php
include 'tools.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (findBookingsActive()) {
    $_SESSION = $_POST;
    header('Location: currentbookings.php');
  }
}
if (isset($_SESSION['dontSaveToFile'])) {
  unset($_SESSION['dontSaveToFile']);
}
?>
</div>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Ben Matthews" />
    <meta name="description" content="Lunardo Cinema" />

    <!-- StyleSheets -->
    <link id='wireframecss' type="text/css" rel="stylesheet" href="../wireframe.css" disabled>
    <link id='stylecss' type="text/css" rel="stylesheet" href="../style.css?t=<?= filemtime('../style.css') ?>">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script&&family=Kdam+Thmor+Pro&family=Montserrat:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <link
      rel="icon"
      href="../../media/cinemalogoIcon.svg"
      type="image/x-icon"
    />
    <script src="../wireframe.js"></script>
    <script>
      // Scroll function
      window.onscroll = function() {

        // navLinks and ids must be the same length for this code to work as intended.
        const navLinks = document.getElementsByTagName('nav')[0].getElementsByTagName('a');

        const ids = [
          document.getElementById("aboutUsSection"),
          document.getElementById("seatingSection"),
          document.getElementById("nowShowing")
        ];

        const navHeight = document.getElementsByTagName('nav')[0].offsetHeight;

        console.log(navHeight);
        ids.forEach((id, index) => {
          let arTop = id.offsetTop-navHeight;
          let arBot = arTop + id.offsetHeight;
          if (window.scrollY >= arTop && window.scrollY < arBot){
            navLinks[index].classList.add('current');
          } else {
            navLinks[index].classList.remove('current');
          }
        });
      }
    </script>
    <title>Lunardo Cinema</title>
  </head>
  <body>
    <!-- All images used for educational purposes only. -->
    <header>
      
      <div id="headerPanel">
        <div id="logo">
          <!-- cinemalogo Image originally taken from https://i0.wp.com/theactorspad.com/wp-content/uploads/2018/07/cinema-logo.png?w=591&ssl=1 -->
          <img
            src="../../media/cinemalogoHeader.svg"
            style="height: 180px"
            alt="Lunardo Cinema Logo"
          />

          <div id="logoText">Lunardo Cinema</div>
        </div>
      </div>
    </header>
    <div id="aboutUs"></div><!-- Placed here for accurate scroll-to -->
    <nav>
      <a href="#aboutUs">About Us</a>
      <a href="#navToSeating">Seating and Prices</a>
      <a href="#nowShowing">Now Showing</a>
    </nav>
    <main>
      <section id="aboutUsSection">
        <div class="bgScrollContainer scrollContainerMedium aboutUsTopBorder">
          <div class="bgScrollImg scrollBg scrollBg1"></div>
          <div id="aboutUsBlurbContainer" class="sectionContent">
            <div class="aboutUsBlurb">
              <h1>About Us</h1>
              <p>
                Renovated and reimagined, join us here at
                <strong>Lunardo Cinema</strong> for the movie experience you've
                been dreaming of. Enjoy our new
                <strong>first class</strong> reclinable seats for deeper comfort
                and immersion, accompanied by the latest
                <strong>3D Dolby Vision</strong> and
                <strong>Dolby Atmos</strong> projection and sound system
                technology.
              </p>
            </div>
          </div>
        </div>
        <div id="dolbyInfo" class="aboutUsTopBorder">
          
        <div class="aboutUsBlurb sectionContent aboutUsBottomBlurb">
            <p>
              The team at <strong>Lunardo Cinemas</strong> presents to you a new cinematic experience, 
              bringing top class entertainment from the big cities right here to the heart of the region. 
            </p>
          </div>
          <!-- Dolby logo from: https://static.wikia.nocookie.net/logopedia/images/2/2f/Dolby_Cinema_2019.svg/revision/latest?cb=20210314012529 -->
          <img src="../../media/Dolby_Cinema_2019.svg" alt="Dolby Logo" class="sectionContent" />
        </div>
      </section>
      <div
      class="bgScrollContainer scrollContainerSmall"
      style="min-height: 100px"
    >
      <div class="bgScrollImg scrollBg scrollBg2"></div>
    </div>
    <div id="navToSeating" style="position: relative; top:-3em"></div>
      <section class="lightBg" id="seatingSection">
        <div class="sectionContent">
          <h1>Seating and Prices</h1>
          <div class="sectionRow">
            <div class="col-wide">
              <h2 style="text-align: left;">Let There Be Luxury!</h2>
              <p>
                Experience movies like never before with <strong>First Class.</strong> 
                Our wall to wall Cinemegamax screen provides wall to wall movie immersion. 
                Beautiful profern verona chairs for the ultimate relaxation. Indulge with our
                first class food and drink service. 
              </p>
              <p>
                <?php makeTicketPriceTable($firstClassSeats, 'First Class Tickets'); ?>
              </p>

              <div>
                <p style="text-align: center; font-size: .9em;">
                  *Discount prices available for sessions on all day Monday and weekdays from 12pm-4:30pm
                </p>
              </div>
            </div>
            <div class="col-narrow">
              <img
                src="../../media/Profern-Verona-Twin.png"
              />
            </div>
          </div>
          
          <div
          class="bgScrollContainer scrollContainerSmaller dropShadow"
          style="min-height: 40px; width: 100vw; position: absolute; left: 0"
           >
          <div class="bgScrollImg scrollBg scrollBg3"></div>
        </div>
          <div style="padding: 3em"></div>
          <div class="sectionRow">
            <div class="col-narrow">
              <img
                src="../../media/Profern-Standard-Twin.png"
              />
            </div>
            <div class="col-wide">
              <h2>Something For Everyone</h2>
              <p>
                The standard <strong>Lunardo Cinema</strong> experience now comes with comfort like no other
                with our brand new Profern seating. 
                Relax and unwind with support and unparalleled comfort as you enjoy the latest favourites
                of the movie world.
              </p>
              <p>
              <?php makeTicketPriceTable($standardSeats, 'Standard Ticket Prices'); ?>
            </div>
          </div>
          <div style="margin: 2em;">
            <p style="text-align: center; font-size: .9em;">*Discount prices available for sessions on all day Monday and weekdays from 12pm-4:30pm</p>
          </div>  
      </div>
      </section>
      <section id="nowShowing" class="sectionContent addPadding">

        <div><h1>Now Showing</h1></div>
        <form method="GET" action="booking.php">
          <div class="flipCardRow">
            <?php makeFlipcard($movies['FAM']); ?>
            <?php makeFlipCard($movies['RMC']); ?>
          </div>
          <div class="flipCardRow">
            <?php makeFlipCard($movies['AHF']); ?>
            <?php makeFlipCard($movies['ACT']); ?>
          </div>
        </form>
        
      </section>
    </main>
    <?= createFooter() ?>
    <?= debugModule() ?>
  </body>
</html>
