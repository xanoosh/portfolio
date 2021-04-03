'use strict';
console.log('snake');

const board = document.getElementById('board');
//38, 39, 40, 37
//up right down left

const gameLoop = (e) => {
  if (e.keyCode === 38) {
    console.log('up');
  }
  if (e.keyCode === 39) {
    console.log('right');
  }
  if (e.keyCode === 40) {
    console.log('down');
  }
  if (e.keyCode === 37) {
    console.log('left');
  }
};

document.addEventListener('keyup', (e) => gameLoop(e));
