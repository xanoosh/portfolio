'use strict';

const timeCurrent = document.getElementById('time-current');
const date = new Date();
const inputNodes = document.querySelectorAll("input[type='hour']");
const key = 'ed8962ccee5b4be0a8ed091664951800';
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
function updateTime() {}
// const timeInterval = document.setInterval();

timeCurrent.value = hourToString(date);

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
      const time = result.time_24;
      console.log(time);
      node.value = time;
      return time + '';
    });
}

getTime(timeCurrent, 'Tokio');
