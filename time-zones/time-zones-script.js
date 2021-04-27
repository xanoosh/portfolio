'use strict';

const overlay = document.getElementById('overlay');
const formToggler = document.getElementById('form-toggler');
const formClose = document.getElementById('close');

const form = document.getElementById('form');
const timeCurrent = document.getElementById('time-current');
const cities = new Set([]);
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
  getTime() {
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
  // debugger;
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
  console.log(city.value);
  console.log(country.value);
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
    cities.clear;
    let inputNodes = document.querySelectorAll("input[type='time']");
    inputNodes.forEach((node) => {
      const obj = new TimeZone(node.name);
      obj.getTime();
      cities.add(obj);
    });
    //hide form
    overlay.classList.toggle('hidden');
  }
});

// iterate through nodelist and construct objects calling methods
inputNodes.forEach((node) => {
  const obj = new TimeZone(node.name);
  obj.getTime();
  cities.add(obj);
});

//toggle from
[formToggler, formClose].forEach((node) => {
  node.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
  });
});
