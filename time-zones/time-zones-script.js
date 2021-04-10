'use strict';

const timeCurrent = document.getElementById('time-current');
const date = new Date();
const inputNodes = document.querySelectorAll("input[type='time']");
const key = 'ed8962ccee5b4be0a8ed091664951800';
let tokioTime;

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
      const time = result.time_24;
      console.log(time);
      console.log(new Date(result.date_time_txt));
      node.value = time;
      tokioTime = new Date(result.date_time_txt);
      return time + '';
    });
}

inputNodes.forEach((node) => {
  const date = getTime(node, node.name);
});

function changeInput() {
  tokiotime = tokioTime.setSeconds(tokioTime.getSeconds() + 19);
}
