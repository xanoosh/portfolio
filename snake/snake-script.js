'use strict';
console.log('snake');

const board = document.getElementById('board');
const snakeSpeed = 2;
//moves per second

let snakePosition = [{ x: 17, y: 14 }];
let loopEvent = '';

const snake = {
  position: [{ x: 17, y: 14 }],
  move: function (keyCode) {
    if (keyCode === 38) {
      this.position[0].x -= 1;
    }
    if (keyCode === 40) {
      this.position[0].x += 1;
    }
    if (keyCode === 39) {
      this.position[0].y += 1;
    }
    if (keyCode === 37) {
      this.position[0].y -= 1;
    }
  },
};
const food = {
  position: { x: 10, y: 10 },
};

const getPosition = () => {
  // if (snakeElement !== undefined) {
  //   snakeElement.remove();
  // }
  const snakeElement = document.createElement('div');
  snakeElement.style.gridRowStart = snake.position[0].x;
  snakeElement.style.gridColumnStart = snake.position[0].y;
  snakeElement.classList.add('snake');
  board.appendChild(snakeElement);
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.position.x;
  foodElement.style.gridColumnStart = food.position.y;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
};

getPosition();

const gameLoop = (e) => {
  window.clearInterval(loopEvent);
  snake.move(e.keyCode);
  getPosition();
  // snake.position;
  if (e.keyCode === 38) {
    console.log('up');
    // loopEvent = window.setInterval(() => {
    //   console.log('up');
    // }, 1000 / snakeSpeed);
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
