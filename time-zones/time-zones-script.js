'use strict';

const timeCurrent = document.getElementById('time-current');
const date = new Date();
const inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';
let tokioPrev;
let berlinPrev;
let delhiPrev;
let newYorkPrev;

function getPreviousValue(txt) {
  if (txt === 'Tokio') return tokioPrev;
  if (txt === 'Berlin') return berlinPrev;
  if (txt === 'Delhi') return delhiPrev;
  if (txt === 'New York') return newYorkPrev;
}
function updatePreviousValue(txt, val) {
  if (txt === 'Tokio') tokioPrev = val;
  if (txt === 'Berlin') berlinPrev = val;
  if (txt === 'Delhi') delhiPrev = val;
  if (txt === 'New York') newYorkPrev = val;
}

function hourToString(input) {
  const date = new Date(input);
  function addZero(num) {
    if (num < 10) return '0' + num;
    return num;
  }
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

const addSecond = async (date) => {
  date.setSeconds(date.getSeconds() + 20);
};

function getTime(node, location) {
  fetch(
    `https://api.ipgeolocation.io/timezone?apiKey=${key}&location=${location}`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error('zjebauo');
      }
      return response.json();
    })
    .then((result) => {
      const time = result.time_24.slice(0, 5);
      if (node.name === 'Berlin') berlinPrev = time;
      if (node.name === 'Tokio') tokioPrev = time;
      if (node.name === 'Delhi') delhiPrev = time;
      if (node.name === 'New York') newYorkPrev = time;
      node.value = time;
      node.addEventListener('change', () => {
        changeInput(node);
      });
      return;
    });
}

inputNodes.forEach((node) => {
  getTime(node, node.name);
});

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
