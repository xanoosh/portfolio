'use strict';

const timeCurrent = document.getElementById('time-current');
const date = new Date();
const inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';
let tokioPrev;
let berlinPrev;
let moscowPrev;

function hourToString(date) {
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
      if (node.name === 'Moscow') moscowPrev = time;
      const date = new Date(result.date_time_txt);
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
  if (node.name === 'Moscow');
  const newHour = new Date().setHours(hours, minutes);
  console.log(newHour);
}

// inputNodes.forEach((node) => {
//   const date = getTime(node, node.name);
// });
