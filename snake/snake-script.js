'use strict';

const board = document.getElementById('board');
const snakeSpeed = 4;
//moves per second
let loopEvent = '';
//will contain snake movement
const snake = {
  position: [
    { x: 17, y: 14 },
    { x: 18, y: 14 },
    { x: 19, y: 14 },
    { x: 19, y: 13 },
    { x: 19, y: 12 },
  ],
  prevPosition: { x: 0, y: 0 },
  newPosition: { x: 0, y: 0 },

  updatePosition: function () {
    this.position.map((el) => {
      this.prevPosition = { ...el };
      el.x = this.newPosition.x;
      el.y = this.newPosition.y;
      this.newPosition = { ...this.prevPosition };
    });
    renderSnake();
  },

  moveLoop: function (keyCode) {
    if (keyCode === 38) {
      loopEvent = setInterval(() => {
        if (this.gameLost) this.gameLost();
        this.newPosition = {
          x: this.position[0].x - 1,
          y: this.position[0].y,
        };
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 40) {
      loopEvent = setInterval(() => {
        if (this.gameLost) this.gameLost();
        this.newPosition = {
          x: this.position[0].x + 1,
          y: this.position[0].y,
        };
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 39) {
      loopEvent = setInterval(() => {
        if (this.gameLost) this.gameLost();
        this.newPosition = {
          x: this.position[0].x,
          y: this.position[0].y + 1,
        };
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 37) {
      loopEvent = setInterval(() => {
        if (this.gameLost) this.gameLost();
        this.newPosition = {
          x: this.position[0].x,
          y: this.position[0].y - 1,
        };

        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
  },

  move: function ({ keyCode }) {
    window.clearInterval(loopEvent);
    this.moveLoop(keyCode);
  },
  gameLost: function () {
    this.position.forEach((el) => {
      if (
        (el.x === this.newPosition.x && el.y === this.newPosition.y) ||
        this.newPosition.y === 24 ||
        this.newPosition.x === 24 ||
        this.newPosition.x === -1 ||
        this.newPosition.x === -1
      ) {
        console.log('game over');
        window.clearInterval(loopEvent);
        return true;
      }
      return false;
    });
  },
};
const food = {
  position: { x: 12, y: 12 },
};

const removeCurrentSnake = () => {
  const currentSnakeSegments = document.querySelectorAll('.snake');
  currentSnakeSegments.forEach((snake) => {
    snake.remove();
  });
};

const renderSnake = () => {
  removeCurrentSnake();
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

renderSnake();

document.addEventListener('keyup', (e) => snake.move(e));
