'use strict';

const timeCurrent = document.getElementById('time-current');
const cities = new Set([]);
const inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';

class TimeZone {
  constructor(name) {
    this.name = name;
    this.node = document.querySelector(`input[name='${this.name}']`);
    this.prevDate = '';
    this.currentDate = '';
  }
  getTime() {
    //fetch data to change time parameter
    fetch(
      `https://api.ipgeolocation.io/timezone?apiKey=${key}&location=${this.name}`
    )
      .then((res) => {
        if (!res.ok) throw Error(`didn't work.`);
        return res.json();
      })
      .then((res) => {
        const date = new Date(res.date_time_txt);
        const dateplaceholder = new Date(res.date_time_txt);
        this.currentDate = date;
        this.prevDate = dateplaceholder;
        this.displayTime();
        this.addOnChange();
      });
  }
  displayTime() {
    // debugger;
    this.node.value = getHourFromDate(this.currentDate);
  }
  addOnChange() {
    this.node.addEventListener('change', (e) => {
      // console.log(this.name);
      // console.log('date before mutation');
      // console.log(this.currentDate);
      setDateFromInput(this.currentDate, e.target.value);
      // console.log('date after mutation:');
      // console.log(this.currentDate);
      const difference = getDateDifference(this.prevDate, this.currentDate);
      console.log(difference);
      console.log('calculate change init');
      // debugger;
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

// iterate through nodelist and construct objects calling methods
inputNodes.forEach((node) => {
  const obj = new TimeZone(node.name);
  obj.getTime();
  cities.add(obj);
});

let date1 = new Date('December 17, 1995 03:24:00');
let date2 = new Date('December 17, 1995 03:26:12');

function calculateChange(name, difference) {
  cities.forEach((city) => {
    if (city.name !== name) {
      // city.currentDate = city.prevDate;
      city.currentDate = setDifferentDate(city.prevDate, difference);
      // console.log(`${city.name} current date:`);
      // console.log(city.currentDate);
      // console.log(`${city.name} previous date:`);
      // console.log(city.prevDate);
      // city.prevDate = city.currentDate;
      // debugger;
      city.displayTime();
    }
  });
}

function getDateDifference(previous, current) {
  const difference = (current.getTime() - previous.getTime()) / 1000;
  // console.log(difference);
  return difference;
}
function setDifferentDate(date, val) {
  return new Date(date.setSeconds(date.getSeconds() + val));
}

//this below must be broken

function setDateFromInput(date, val) {
  const [hours, minutes] = val.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
}

// console.log(date1);
// let dateNew = setDifferentDate(date1, 6120932);
// console.log(dateNew);

// getDateDifference(date1, date2);
