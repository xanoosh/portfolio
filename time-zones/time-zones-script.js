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
      console.log(this.name);
      //value is seconds data from input
      console.log(`time value from input: ${e.target.value}`);
      // debugger;
      console.log('date before mutation');
      console.log(this.currentDate);
      setDateFromInput(this.currentDate, e.target.value);

      // this.currentDate = dateFromInput;
      console.log('date after mutation:');
      console.log(this.currentDate);
      // console.log('previous');
      // console.log(this.prevDate);
      // console.log('current');
      // console.log(this.currentDate);
      // getDateDifference(this.prevDate, this.currentDate);
      console.log('calculate change init');
      debugger;
      calculateChange(
        this.name,
        getDateDifference(this.prevDate, this.currentDate)
      );
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

const date1 = new Date('December 17, 1995 03:24:00');
const date2 = new Date('December 17, 1995 03:26:12');

function calculateChange(name, difference) {
  cities.forEach((city) => {
    if (city.name !== name) {
      // console.log(`${city.name} equals ${name}?`);
      // console.log(city.name === name);
      // console.log(difference);
      console.log(city.name);
      city.prevDate = city.currentDate;
      city.currentDate = setDifferentDate(city.currentDate, difference);
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
  return date.setSeconds(date.getSeconds() + val);
}

//this below must be broken

function setDateFromInput(date, val) {
  const [hours, minutes] = val.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  // const newDate = new Date(date.getTime());
  // newDate.setHours(hours);
  // newDate.setMinutes(minutes);
  // // console.log('new');
  // // console.log(date);
  // return date;
}

// console.log(date1);
// setDateFromInput(date1, '01:01');

// getDateDifference(date1, date2);
