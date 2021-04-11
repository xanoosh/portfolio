'use strict';

const timeCurrent = document.getElementById('time-current');
const cities = new Set([]);
const inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';
let tokioPrev;
let berlinPrev;
let delhiPrev;
let newYorkPrev;

class TimeZone {
  constructor(name) {
    this.name = name;
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
        this.currentDate = date;
        this.prevDate = date;
        this.displayTime();
        this.addOnChange();
      });
  }
  displayTime() {
    const node = document.querySelector(`input[name='${this.name}']`);
    node.value = getHourFromDate(this.currentDate);
  }
  addOnChange() {
    //adding event on the node to trigger date calculations and all that jazz
    const node = document.querySelector(`input[name='${this.name}']`);
    console.log(node);
    node.addEventListener('change', () => {
      console.log(this.name);
      // changeHour(node);
    });
  }
  calculateChange(val) {
    //compare this date vals and return difference
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

function changeHour(node) {
  console.log(`${node.name} it targeted`);
}

//iterate through nodelist and construct objects calling methods
inputNodes.forEach((node) => {
  const obj = new TimeZone(node.name);
  obj.getTime();
  cities.add(obj);
});
