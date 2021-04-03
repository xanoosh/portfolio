'use strict';
console.log('snake');

const board = document.getElementById('board');

for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  board.appendChild(cell);
}
