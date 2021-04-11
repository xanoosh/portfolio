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
        if (!res.ok) throw Error('doopa');
        return res.json();
      })
      .then((res) => {
        this.date = res.date_time_txt;
        this.prevDate = res.date_time_txt;
      });
  }
  addOnChange() {
    //adding event on the node to trigger date calculations and all that jazz
    const node = document.querySelector(`input[name=${this.name}]`);
    node.addEventListener('change', () => {
      changeInput(node);
    });
  }
  calculateChange(val) {
    //compare this date vals and return difference
  }
}

// function hourToString(input) {
//   const date = new Date(input);
//   function addZero(num) {
//     if (num < 10) return '0' + num;
//     return num;
//   }
//   const hours = addZero(date.getHours());
//   const minutes = addZero(date.getMinutes());
//   const seconds = addZero(date.getSeconds());
//   return `${hours}:${minutes}:${seconds}`;
// }

// inputNodes.forEach((node) => {
//   const obj = new TimeZone(node.name);
//   obj.getTime();
//   obj.displayTime();
//   cities.add(obj);
// });

function changeInput(node) {
  const [hours, minutes] = node.value.split(':');
  console.log('change');
  getPreviousValue(node.name);
  const [oldHours, oldMinutes] = getPreviousValue(node.name).split(':');
  //   if (node.name === 'Delhi') {
  //     const [hoursold, minutesold] = delhiPrev.split(':');
  //   }
  const oldHour = new Date().setHours(oldHours, oldMinutes);
  const newHour = new Date().setHours(hours, minutes);

  console.log(hourToString(oldHour));

  console.log(hourToString(newHour));
  updatePreviousValue(node.name, node.value);
}

// inputNodes.forEach((node) => {
//   const date = getTime(node, node.name);
// });
