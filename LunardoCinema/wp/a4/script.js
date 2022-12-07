// ---- REGEX PATTERNS
const DISCOUNT_TIME_PATTERN = /^(12):\d{2}pm$/;
const SESSION_TIME_PATTERN = /^\d{1,2}:\d{2}(am|pm)$/;
const NAME_PATTERN =
  /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.\-']{0,20} ?){1,3}?$/;
const MOBILE_PHONE_PATTERN = /^((\+61|0)4|\(04\))( ?\d){8}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]{2,3}){1,3}$/;

// ---- HELPER CONSTS
const FULLPRICE = 'full';
const DISCPRICE = 'disc';
const SEAT_DROPDOWN_ID = 'seatDropdown-';
const DAYS = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

// ---- HELPER METHODS
const getVarName = (varObj) => Object.keys(varObj)[0];
const formatPrice = (amount) => '$' + amount.toFixed(2);
const getDropDownValue = (id) => document.getElementById(id).options[select.selectedIndex].value;
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.substring(1, string.length).toLowerCase();

// ---- SEATS AND PRICING INFORMATION
class Seat {
  constructor(type, name, fprice, dprice) {
    this.type = type;
    this.name = name;
    this.fPrice = fprice;
    this.dPrice = dprice;
  }
}

// ---- SESSION TIME INFORMATION
class MovieDayAndTimes {
  constructor(day, timesAsStringArray) {
    // Clean each time in the array:
    timesAsStringArray = timesAsStringArray.map((i) => {
      i = i.trim().replace(' ', '');
      if (SESSION_TIME_PATTERN.test(i)) return i;
      console.log('Did not add to ' + this.day + "'s session time: " + i);
    });
    timesAsStringArray = timesAsStringArray.filter((i) => i !== undefined);

    // Check to make sure the day is a valid string. Don't assign if invalid.
    if (Object.values(DAYS).indexOf(capitalizeFirstLetter(day)) !== -1) {
      this.day = day;
    } else console.log('Invalid day for MovieDayAndTimes: ' + day);

    this.times = timesAsStringArray;
  }
}

// ---- PRICE CALCULATION
function calcSubTotal() {
  // Get checked radio button
  const selectedSessionTime = document.querySelector('input[name="day"]:checked');

  if (selectedSessionTime == null) return;

  // get pricing (full/discount)
  const pricing = selectedSessionTime.dataset.pricing;

  // Get all selects where the id begins with the seat_dropdown_id string.
  const ticketDropDowns = document.querySelectorAll('select[id^=' + SEAT_DROPDOWN_ID + ']');

  // reset values.
  let totalTicketPrice = 0;

  // Prepare subtotal - Add dropdown val * full/disc price.
  ticketDropDowns.forEach((dropdown) => {
    const val = parseInt(dropdown.value);
    if (isNaN(val)) return;

    // Calculate subtotal and add it to the total.
    const subtotal =
      val * (pricing.includes(FULLPRICE) ? dropdown.getAttribute('data-full') : dropdown.getAttribute('data-disc'));
    totalTicketPrice += subtotal;
    console.log(dropdown.name + ': ' + formatPrice(subtotal));
  });
  console.log(formatPrice(totalTicketPrice));

  if (totalTicketPrice == 0) {
    document.getElementById('subtotalSticky').style.display = 'none';
    document.getElementById('submitBooking').value = 'Confirm Booking';
  } else {
    document.getElementById('subtotalSticky').style.display = 'block';
    document.getElementById('submitBooking').value = 'Confirm Booking: ' + formatPrice(totalTicketPrice);
  }
  document.getElementById('subtotal').innerHTML = formatPrice(totalTicketPrice);
}

function isDiscountSession(movieDayAndTimes, sessionTime) {
  if (movieDayAndTimes.day === DAYS.monday) {
    return true;
  } else if (movieDayAndTimes.day === DAYS.saturday || movieDayAndTimes.day === DAYS.sunday) {
    return false;
  } else if (DISCOUNT_TIME_PATTERN.test(sessionTime)) {
    return true;
  }

  return false;
}

// ---- HTML Generator methods:
function makeSessionRadioButton(movieDayAndTimes) {
  document.write(`
    <div class="sessionTimeRow">
      <h2>${movieDayAndTimes.day}</h2>`);

  // ID becomes "Mon1", "Mon2", "Tue1" etc.
  let idCounter = 1;

  movieDayAndTimes.times.forEach((time) => {
    const isDiscounted = isDiscountSession(movieDayAndTimes, time);
    const id = movieDayAndTimes.day.substring(0, 3) + idCounter++;
    const value = movieDayAndTimes.day.substring(0, 3).toUpperCase();
    const doesCheckedRadioExist = document.querySelector('input[name="day"]:checked');

    document.write(`
        <input id="${id}" 
          type="radio" 
          ${isDiscounted ? ' class="discountTime" ' : ''} 
          name="day" 
          value="${value}" 
          data-pricing="${isDiscounted ? DISCPRICE : FULLPRICE}" 
          onchange="calcSubTotal()" 
          ${doesCheckedRadioExist === null ? 'checked' : ''}
        >
        <label for="${id}">${time}</label>`);
  });
  document.write(`</div>`);
}

function makeNumericOptions(numOfOptions) {
  document.write(`<option value="">Please Select...</option>`);
  for (let i = 1; i < numOfOptions + 1; i++) document.write(`<option value="${i}">${i}</option>`);
}

function makePricingDropdown(seat) {
  document.write(
    `
      <div classname="dropDownContainer">
      <h2>` +
      seat.name +
      `</h2>
      <p>` +
      formatPrice(seat.fPrice) +
      ' / ' +
      formatPrice(seat.dPrice) +
      `</p>
      <select 
        name="seats[${seat.type.toUpperCase()}]" 
        id="${SEAT_DROPDOWN_ID + seat.type.toUpperCase()}" 
        data-full="${seat.fPrice}" 
        data-disc="${seat.dPrice}"
        onchange="calcSubTotal()"
      >`
  );
  makeNumericOptions(10);
  document.write(`</select></div>`);
}

// ---- JSON conversion adapters
function getSessionTimesFromJson(selectedMovieJson) {
  const keys = Object.keys(selectedMovieJson.sessionTimes);
  let sessionInfo = [];
  keys.forEach((day) => {
    if (selectedMovieJson.sessionTimes[day].length > 0)
      sessionInfo.push(new MovieDayAndTimes(day, [selectedMovieJson.sessionTimes[day]]));
  });
  return sessionInfo;
}

function convertSeatsFromJson(seatsJson) {
  if (seatsJson == null) {
    console.log('seatsJson was null.');
    return;
  }

  const seatTypes = Object.keys(seatsJson);
  if (seatTypes == null || seatTypes.length == 0) {
    console.log('seatsJson had no object keys.');
    return;
  }
  const seatKeys = Object.keys(seatsJson[seatTypes[0]]);
  const seatsArray = [];

  // Get information, make array of Seats.
  for (let i = 0; i < seatTypes.length; i++) {
    const type = seatsJson[seatTypes[i]][seatKeys[0]];
    const name = seatsJson[seatTypes[i]][seatKeys[1]];
    const fPrice = seatsJson[seatTypes[i]][seatKeys[2]];
    const dPrice = seatsJson[seatTypes[i]][seatKeys[3]];
    seatsArray.push(new Seat(type, name, fPrice, dPrice));
  }
  return seatsArray;
}

// ---- Set Selection State From Post:
function setDropDownValuesFromPost(dropDownValsJson) {
  if (dropDownValsJson === undefined || dropDownValsJson === null) return;

  const keys = Object.keys(dropDownValsJson);
  for (let i = 0; i < keys.length; i++) {
    if (dropDownValsJson[keys[i]].length > 0) {
      const selectElement = document.querySelector('select[name="seats[' + keys[i] + ']"]');
      selectElement.value = dropDownValsJson[keys[i]];
    }
  }
}

function selectRadioButtonFromPost(day) {
  if (day == null || day.trim().length == 0) return;

  const defaultButtonToUncheck = document.querySelector('input[name="day"]:checked');
  if (defaultButtonToUncheck != null) defaultButtonToUncheck.checked = false;

  const preselectedButton = document.querySelector('input[value="' + day + '"]');
  preselectedButton.checked = true;
}
