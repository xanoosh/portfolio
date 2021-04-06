'use strict';

const board = document.getElementById('board');
const restartBtn = document.getElementById('restart');
// let food = '';
let snakeSpeed = 5;
//moves per second
let loopEvent = '';
//will contain snake movement
const snake = {
  position: [
    { x: 15, y: 12 },
    { x: 16, y: 12 },
    { x: 17, y: 12 },
  ],
  prevPosition: { x: 0, y: 0 },
  newPosition: { x: 0, y: 0 },
  currentMoveDirection: 'init',
  food: {
    position: { x: 0, y: 0 },
  },
  directions: {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
  },
  possibleMoves: function (direction) {
    if (direction === 'init') {
      return new Set([38, 37, 39]);
    }
    if (direction === 38 || direction === 40) {
      return new Set([37, 39]);
    }
    if (direction === 37 || 39) {
      return new Set([38, 40]);
    }
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
      const eaten = document.querySelectorAll('.eaten');
      eaten.forEach((eatenElement) => {
        // check when last snake segmet is on eaten el
        // debugger;
        if (
          this.position[this.position.length - 1].x ===
            Number(eatenElement.style.gridRowStart) &&
          this.position[this.position.length - 1].y ===
            Number(eatenElement.style.gridColumnStart)
        ) {
          //add new segment
          this.position.push({
            x: Number(eatenElement.style.gridRowStart),
            y: Number(eatenElement.style.gridColumnStart),
          });
          eatenElement.remove();
          //speed up :)
          snakeSpeed += 0.2;
        }
      });
    }
  },

  updatePosition: function (keyCode) {
    this.checkEaten();
    this.position.map((el) => {
      this.prevPosition = { ...el };
      el.x = this.newPosition.x;
      el.y = this.newPosition.y;
      this.newPosition = { ...this.prevPosition };
    });
    renderSnake();
    this.currentMoveDirection = keyCode;
  },

  moveLoop: function (keyCode) {
    loopEvent = setInterval(() => {
      this.newPosition = {
        x: this.position[0].x,
        y: this.position[0].y,
      };
      if (keyCode === 38) this.newPosition.x -= 1;
      if (keyCode === 40) this.newPosition.x += 1;
      if (keyCode === 39) this.newPosition.y += 1;
      if (keyCode === 37) this.newPosition.y -= 1;
      this.gameLost();
      this.eat();
      this.updatePosition(keyCode);
    }, 1000 / snakeSpeed);
  },

  move: function ({ keyCode }) {
    if (this.possibleMoves(this.currentMoveDirection).has(keyCode)) {
      window.clearInterval(loopEvent);
      this.moveLoop(keyCode);
    }
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
        window.clearInterval(loopEvent);
        document.removeEventListener('keydown', handleKeyDown);
        board.classList.add('lost');
        this.newPosition = { ...this.position[this.position.length - 1] };
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
const handleKeyDown = (e) => snake.move(e);
document.addEventListener('keydown', handleKeyDown);

const handleClick = () => {
  snake.position = [
    { x: 15, y: 12 },
    { x: 16, y: 12 },
    { x: 17, y: 12 },
  ];
  snakeSpeed = 5;
  board
    .querySelectorAll('div:not(.game-over):not(.overlay)')
    .forEach((el) => el.remove());
  snake.currentMoveDirection = 'init';
  renderSnake();
  renderFood();
  board.classList.remove('lost');
  document.addEventListener('keydown', handleKeyDown);
};

restartBtn.addEventListener('click', handleClick);
