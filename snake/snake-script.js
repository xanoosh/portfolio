'use strict';

const board = document.getElementById('board');
// let food = '';
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
  food: {
    position: { x: 0, y: 0 },
  },

  eat: function () {
    if (
      this.food.position.x === this.newPosition.x &&
      this.food.position.y === this.newPosition.y
    ) {
      const eaten = document.querySelector('.food');
      eaten.classList.add('eaten');
      eaten.classList.remove('food');
      renderFood();
    }
  },
  checkEaten: function () {
    if (document.querySelector('.eaten')) {
      // console.log('eaten');
      const eaten = document.querySelector('.eaten');
      const eatenX = Number(eaten.style.gridRowStart);
      const eatenY = Number(eaten.style.gridColumnStart);
      let i = 1;
      this.position.forEach((segment) => {
        if (segment.x !== eatenX && segment.y !== eatenY) {
          i++;
        }
      });
      const addSegment = i === this.position.length ? true : false;
      // console.log(addSegment);
      if (addSegment) {
        //add new segment
        console.log('eaten becomes segment');
        this.position.push({
          x: Number(eaten.style.gridRowStart),
          y: Number(eaten.style.gridColumnStart),
        });
        eaten.classList.remove('eaten');
      }
    }
  },

  updatePosition: function () {
    this.checkEaten();
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
        this.newPosition = {
          x: this.position[0].x - 1,
          y: this.position[0].y,
        };
        this.eat();
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 40) {
      loopEvent = setInterval(() => {
        this.newPosition = {
          x: this.position[0].x + 1,
          y: this.position[0].y,
        };
        this.eat();
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 39) {
      loopEvent = setInterval(() => {
        this.newPosition = {
          x: this.position[0].x,
          y: this.position[0].y + 1,
        };
        this.eat();
        this.gameLost();
        if (!this.gameLost()) {
          this.updatePosition();
        }
        // }
      }, 1000 / snakeSpeed);
    }
    if (keyCode === 37) {
      loopEvent = setInterval(() => {
        this.newPosition = {
          x: this.position[0].x,
          y: this.position[0].y - 1,
        };
        this.eat();
        this.gameLost();
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
        this.newPosition.y === -1
      ) {
        console.log('game over');
        window.clearInterval(loopEvent);
        this.newPosition = { ...this.prevPosition };
        return;
      }
      return false;
    });
  },
};

const removeElements = (className) => {
  const currentElements = document.querySelectorAll(`.${className}`);
  currentElements.forEach((el) => {
    el.remove();
  });
};

const renderSnake = () => {
  removeElements('snake');
  snake.position.forEach((el) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = el.x;
    snakeElement.style.gridColumnStart = el.y;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });
};

const renderFood = () => {
  //check if food renders inside current snake
  let x = Math.floor(Math.random() * 23);
  let y = Math.floor(Math.random() * 23);
  while (x === snake.position.x && y === snake.position.y) {
    x = Math.floor(Math.random() * 23);
    y = Math.floor(Math.random() * 23);
  }
  snake.food.position.x = x;
  snake.food.position.y = y;
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = snake.food.position.x;
  foodElement.style.gridColumnStart = snake.food.position.y;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
};

renderSnake();
renderFood();

document.addEventListener('keyup', (e) => snake.move(e));
