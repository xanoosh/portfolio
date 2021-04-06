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
    if (document.querySelectorAll('.eaten').length) {
      // debugger;
      console.log('eaten');
      const eaten = document.querySelectorAll('.eaten');
      eaten.forEach((eatenElement) => {
        //this.prevPosition should be behind snake
        // debugger;
        if (
          this.prevPosition.x === Number(eatenElement.style.gridRowStart) &&
          this.prevPosition.y === Number(eatenElement.style.gridColumnStart)
        ) {
          //add new segment
          // debugger;
          console.log('eaten becomes segment');
          this.position.push({
            x: Number(eatenElement.style.gridRowStart),
            y: Number(eatenElement.style.gridColumnStart),
          });
          // eatenElement.classList.remove('eaten');
          eatenElement.remove();
        }
      });
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
    const keySet = new Set([38, 40, 39, 37]);
    if (keySet.has(keyCode)) {
      loopEvent = setInterval(() => {
        this.newPosition = {
          x: this.position[0].x,
          y: this.position[0].y,
        };
        if (keyCode === 38) this.newPosition.x -= 1;
        if (keyCode === 40) this.newPosition.x += 1;
        if (keyCode === 39) this.newPosition.y += 1;
        if (keyCode === 37) this.newPosition.y -= 1;
        this.eat();
        this.gameLost();
        this.updatePosition();
        // if (!this.gameLost()) {

        // }
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
  let x = Math.floor(Math.random() * 21) + 2;
  let y = Math.floor(Math.random() * 21) + 2;
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
