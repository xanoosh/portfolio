const startStop = document.getElementById('startstop');
const reset = document.getElementById('reset');
const numOne = document.getElementById('numone');
const numTwo = document.getElementById('numtwo');
let seconds = 0;
let hundredths = 0;
let interval = '';
let newSecond = '';
//every second
function second() {
  interval = setInterval(function () {
    hundredths++;
    numTwo.innerText = hundredths;
    if (hundredths === 99) {
      clearInterval(interval);
      seconds++;
      hundredths = 0;
      numTwo.innerText = '00';
      numOne.innerText = seconds;
    }
  }, 10);
}

function timer() {
  if (typeof newSecond !== 'number') {
    newSecond = setInterval(second, 1000);
  } else {
    clearInterval(newSecond);
    clearInterval(interval);
  }
}

startStop.addEventListener('click', timer);
