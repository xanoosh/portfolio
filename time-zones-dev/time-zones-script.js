'use strict';

const overlay = document.getElementById('overlay');
const formToggler = document.getElementById('form-toggler');
const findOptimalTime = document.getElementById('find-optimal-time');
const formClose = document.getElementById('close');
const form = document.getElementById('form');
const timeCurrent = document.getElementById('time-current');
const cities = new Set([]);
const hoursToAvoid = 1;
const minutesToAvoid = 30;
let inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';

class TimeZone {
  constructor(name) {
    this.name = name;
    this.node = document.querySelector(`input[name='${this.name}']`);
    this.prevDate = '';
    this.currentDate = '';
    this.startingDate = '';
  }
  getTimeTest() {
    const someVals = [
      1620255409000,
      1620251809000,
      1620251809000,
      1620242809000,
      1620230209000,
      1620208609000,
      1620197809000,
    ];
    const randomDate = someVals[Math.floor(Math.random() * someVals.length)];
    this.currentDate = new Date(randomDate);
    this.prevDate = new Date(randomDate);
    this.startingDate = new Date(randomDate);
    this.displayTime();
    this.addOnChange();
  }

  //https://api.ipgeolocation.io/timezone?apiKey=ed8962ccee5b4be0a8ed091664951800&location=
  getTimeData() {
    fetch(
      `https://api.ipgeolocation.io/timezone?apiKey=${key}&location=${this.name}`
    )
      .then((res) => {
        if (!res.ok) throw Error(`didn't work.`);
        return res.json();
      })
      .then((res) => {
        this.currentDate = new Date(res.date_time_txt);
        this.prevDate = new Date(res.date_time_txt);
        this.startingDate = new Date(res.date_time_txt);
        this.displayTime();
        this.addOnChange();
      });
  }
  displayTime() {
    this.node.value = getHourFromDate(this.currentDate);
  }
  addOnChange() {
    this.node.addEventListener('change', (e) => {
      //mutate current date:
      setDateFromInput(this.currentDate, e.target.value);
      const difference = getDateDifference(this.startingDate, this.currentDate);
      //loop set and change values in DOM
      calculateChange(this.name, difference);
    });
  }
}

function getHourFromDate(date) {
  function addZero(num) {
    if (num < 10) return '0' + num;
    return num;
  }
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function calculateChange(name, difference) {
  cities.forEach((city) => {
    if (city.name !== name) {
      city.currentDate = setDifferentDate(city.startingDate, difference);
      city.displayTime();
    }
  });
}
//extract input value to hours , minutes to mutate current Date object
function setDateFromInput(date, val) {
  const [hours, minutes] = val.split(':');
  if (hours === undefined || minutes === undefined) return;
  // const newDate = new Date(date.getTime());
  date.setHours(hours);
  date.setMinutes(minutes);
}
//get difference in seconds:
function getDateDifference(previous, current) {
  const difference = (current.getTime() - previous.getTime()) / 1000;
  return difference;
}
//create new Date object with time added in seconds
function setDifferentDate(date, val) {
  const test = new Date(date.getTime());
  return new Date(test.setSeconds(test.getSeconds() + val));
}

//form hander

const removeErrMessage = (node) => {
  const hasErrMessage =
    node.parentNode.querySelectorAll('.errmsg').length !== 0;
  if (hasErrMessage) {
    node.parentNode.querySelectorAll('.errmsg').forEach((el) => {
      el.remove();
    });
  }
};

const addErrMessage = (node) => {
  const hasErrMessage =
    node.parentNode.querySelectorAll('.errmsg').length !== 0;
  if (hasErrMessage) return;
  const errMessage = document.createElement('div');
  errMessage.classList.add('errmsg');
  errMessage.innerText = 'field cannot be empty';
  node.parentNode.appendChild(errMessage);
};

const formValidated = ([city, country, ,]) => {
  let result = false;
  if (city.value.length === 0) addErrMessage(city);
  if (country.value.length === 0) addErrMessage(country);
  if (city.value.length !== 0) removeErrMessage(city);
  if (country.value.length !== 0) removeErrMessage(country);
  if (city.value.length && country.value.length) result = true;
  return result;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formValidated(e.target);
  //create request input

  if (formValidated(e.target)) {
    const requestInput = `${this[0].value}/${this[1].value}`;
    console.log(requestInput);
    //add new dom element
    const newLabel = document.createElement('label');
    const newSpan = document.createElement('span');
    newSpan.innerText = `${this[0].value}:`;
    const newInput = document.createElement('input');
    newInput.type = 'time';
    newInput.name = requestInput;
    container.appendChild(newLabel);
    newLabel.appendChild(newSpan);
    newLabel.appendChild(newInput);
    //rewrite inputnodes and create objects based on them
    cities.clear();
    let inputNodes = document.querySelectorAll("input[type='time']");
    console.log(inputNodes);

    inputNodes.forEach((node) => {
      const obj = new TimeZone(node.name);
      // obj.getTimeData();
      obj.getTimeTest();
      cities.add(obj);
    });
    //clear and hide form
    e.target[0].value = '';
    e.target[1].value = '';
    overlay.classList.toggle('hidden');
  }
});

// iterate through nodelist and construct objects calling methods
inputNodes.forEach((node) => {
  const obj = new TimeZone(node.name);
  // obj.getTimeData();
  obj.getTimeTest();
  cities.add(obj);
});

//toggle from
[formToggler, formClose].forEach((node) => {
  node.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
  });
});

//algorithm - find optimal hours for all
//get array of timezones:
const getArrayForSpecificHour = (differentHour) => {
  const arr = [];
  cities.forEach((city) => {
    arr.push(compareHours(city, differentHour));
  });
  return arr;
};
// get object with name, date and difference from desired range in miliseconds:
const compareHours = ({ name, currentDate }, differentHour) => {
  const date = new Date(currentDate.getTime() + differentHour * 3600000);
  const difference = calculateDistanceFromTimeRange(currentDate, differentHour);
  return { name, difference, date };
};
// calculate difference in miliseconds between specific date and time range
const calculateDistanceFromTimeRange = (initialDate, differentHour) => {
  const initial = new Date(initialDate.getTime() + differentHour * 3600000);
  const dateToAvoid = new Date(initial.getTime());
  changeDayAfterMidday(dateToAvoid);
  dateToAvoid.setHours(hoursToAvoid, minutesToAvoid, 0);
  const range = Math.abs(initial.getTime() - dateToAvoid.getTime());
  return range;
};
//change day if hour is 12+
const changeDayAfterMidday = (dateToAvoid) => {
  if (dateToAvoid.getHours() === 12 && dateToAvoid.getMinutes() > 0) {
    dateToAvoid.setDate(dateToAvoid.getDate() + 1);
  }
  if (dateToAvoid.getHours() >= 13) {
    dateToAvoid.setDate(dateToAvoid.getDate() + 1);
  }
};

// get optimal result (highest possible distance from lowest distance array)
const getOptimalTimeDistance = (arr) => {
  const lowestDistanceArray = [];
  arr.forEach((arrElements) => {
    const smallestVal = Math.min(...arrElements.map((el) => el.difference));
    const lowestObj = arrElements.filter((el) => el.difference === smallestVal);
    lowestDistanceArray.push(lowestObj[0]);
  });
  const biggestVal = Math.max(
    ...lowestDistanceArray.map((el) => el.difference)
  );
  const result = lowestDistanceArray.filter(
    (el) => el.difference === biggestVal
  )[0];
  console.log(result);
  return result;
};

const setOptimalTime = (obj) => {
  cities.forEach((city) => {
    if (city.name === obj.name) {
      //dochange
      // city.node.value = obj.date;
      city.currentDate = obj.date;
      city.displayTime();
      const difference = getDateDifference(city.startingDate, city.currentDate);
      //loop set and change values in DOM
      calculateChange(city.name, difference);
      return;
    }
  });
};

const calculateOptimalTime = () => {
  //array for all 24 results
  let resultsArr = [];
  for (let i = -6; i <= 6; i++) {
    //push city values
    resultsArr.push(getArrayForSpecificHour(i));
  }
  // console.log(resultsArr);
  // getOptimalTimeDistance(resultsArr);
  setOptimalTime(getOptimalTimeDistance(resultsArr));
};

//call function onclick
findOptimalTime.addEventListener('click', calculateOptimalTime);

// PROBLEMS:
// - range does not calculate properly:
// set hour should be called coditionally
//otherwise it will calculate to big distance.
// EXAMPLE : 23.59 should be 1 minute (60 000 ms)
// but it goes back and calculates 23.59 distance

//SOLUTION (MAYBE)
// if var.gethours() === 12 && var.getminutes() > 0
// or var.gethours() > 12
// add one day to initial for more precise range calutation
// like that:
// var.setDate(var.getDate() + 1)

//DEVELOPMENT:
// later will create input for number (hour to avoid on front end)
// make it customizable without too much effort
