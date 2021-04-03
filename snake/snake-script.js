'use strict';

const board = document.getElementById('board');
const snakeSpeed = 2;
//moves per second
let loopEvent = '';
//will contain snake movement
const snake = {
  position: [
    { x: 17, y: 14 },
    { x: 18, y: 14 },
  ],
  prevPosition: { x: 0, y: 0 },
  newPosition: { x: 0, y: 0 },

  updatePosition: function () {
    this.position.map((el) => {
      // debugger;
      this.prevPosition.x = el.x;
      this.prevPosition.y = el.y;
      el.x = this.newPosition.x;
      el.y = this.newPosition.y;
      this.newPosition.x = this.prevPosition.x;
      this.newPosition.y = this.prevPosition.y;
    });
    console.table(this.position);
  },

  moveLoop: function (keyCode) {
    if (keyCode === 38) {
      this.newPosition = {
        x: this.position[0].x - 1,
        y: this.position[0].y,
      };
      this.updatePosition();
    }
    if (keyCode === 40) {
      this.newPosition = {
        x: this.position[0].x + 1,
        y: this.position[0].y,
      };
      this.updatePosition();
    }
    if (keyCode === 39) {
      this.newPosition = {
        x: this.position[0].x,
        y: this.position[0].y + 1,
      };
      this.updatePosition();
    }
    if (keyCode === 37) {
      this.newPosition = {
        x: this.position[0].x,
        y: this.position[0].y - 1,
      };
      this.updatePosition();
    }
  },

  move: function ({ keyCode }) {
    window.clearInterval(loopEvent);
    this.moveLoop(keyCode);
  },
};
const food = {
  position: { x: 10, y: 10 },
};

const getPosition = () => {
  snake.position.forEach((el) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = el.x;
    snakeElement.style.gridColumnStart = el.y;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.position.x;
  foodElement.style.gridColumnStart = food.position.y;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
};

getPosition();

document.addEventListener('keyup', (e) => snake.move(e));
