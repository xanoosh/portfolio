'use strict';

const board = document.getElementById('board');
const restartBtn = document.getElementById('restart');
//value for timestamp calculation
let lastTimeStamp = 0;
let gameLost = false;

const gameEnd = () => board.classList.add('lost');
const gameRestart = () => {
  snake.reset();
  removeElements('snake');
  removeElements('food');
  removeElements('eaten');
  board.classList.remove('lost');
  gameLost = false;
  snake.render();
  food.render();
};

restartBtn.addEventListener('click', gameRestart);

const score = {
  value: 0,
  node: document.getElementById('score'),
  update: function () {
    this.node.innerText = this.value;
  },
};
const snake = {
  move: function ({ keyCode }) {
    //initialize loop...
    this.startGameLoop(keyCode);
    //...or set another direction
    this.setDirection(keyCode);
  },
  //moves per second
  speed: 7,
  position: [{ x: 12, y: 12 }],
  newPosition: { x: 0, y: 0 },
  prevPosition: { x: 0, y: 0 },
  direction: 0,
  startGameLoop: function (keyCode) {
    const possibleMoves = new Set([38, 37, 39, 40]);
    if (!this.direction && possibleMoves.has(keyCode)) {
      window.requestAnimationFrame(gameLoop);
    }
  },
  possibleMoves: function () {
    if (this.direction === 0) {
      return new Set([38, 37, 39, 40]);
    }
    if (this.direction === 38 || this.direction === 40) {
      return new Set([37, 39]);
    }
    if (this.direction === 37 || this.direction === 39) {
      return new Set([38, 40]);
    }
  },
  checkSelfCollision: function () {
    const positionSet = new Set([...this.position]);
    for (const el of positionSet) {
      if (el.x === this.newPosition.x && el.y === this.newPosition.y) {
        return true;
      }
    }
    return false;
  },
  checkWallCollision: function () {
    if (this.newPosition.x === 0) this.newPosition.x = 23;
    if (this.newPosition.x === 24) this.newPosition.x = 1;
    if (this.newPosition.y === 0) this.newPosition.y = 23;
    if (this.newPosition.y === 24) this.newPosition.y = 1;
  },
  setNewPosition: function () {
    const key = this.direction;
    this.newPosition = { ...this.position[0] };
    if (key === 38) this.newPosition.x -= 1;
    if (key === 40) this.newPosition.x += 1;
    if (key === 39) this.newPosition.y += 1;
    if (key === 37) this.newPosition.y -= 1;
    this.checkWallCollision();
  },
  setDirection: function (keyCode) {
    if (
      this.direction !== keyCode &&
      this.possibleMoves(this.direction).has(keyCode) &&
      this.canChangeDirection === true
    ) {
      this.direction = keyCode;
      this.canChangeDirection = false;
    }
  },
  canChangeDirection: true,
  updatePosition: function () {
    this.setNewPosition();
    if (this.checkSelfCollision()) {
      console.log('collision!');
      gameLost = true;
      return;
    }
    const positionSet = new Set([...this.position]);
    positionSet.forEach((el) => {
      this.prevPosition = { ...el };
      el.x = Number(this.newPosition.x);
      el.y = Number(this.newPosition.y);
      this.newPosition = { ...this.prevPosition };
    });
    this.position = [...positionSet];
    this.canChangeDirection = true;
    this.render();
  },
  render: function () {
    removeElements('snake');
    const snakeSet = new Set([...snake.position]);
    snakeSet.forEach((el) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = Number(el.x);
      snakeElement.style.gridColumnStart = Number(el.y);
      snakeElement.classList.add('snake');
      board.appendChild(snakeElement);
    });
  },
  reset: function () {
    this.direction = 0;
    this.position = [{ x: 12, y: 12 }];
    this.newPosition.x = 0;
    this.newPosition.y = 0;
    this.canChangeDirection = true;
    this.speed = 7;
  },
};

const food = {
  position: { x: 0, y: 0 },
  setRandomPosition: function () {
    this.position.x = Math.floor(Math.random() * 21) + 2;
    this.position.y = Math.floor(Math.random() * 21) + 2;
  },
  checkOverlap() {
    const snakePositionSet = new Set([...snake.position]);
    for (const segment of snakePositionSet) {
      if (segment.x === this.position.x && segment.y === this.position.y) {
        return true;
      }
      return false;
    }
  },
  checkEaten: function () {
    if (document.querySelectorAll('.eaten').length) {
      const eaten = document.querySelectorAll('.eaten');
      eaten.forEach((eatenElement) => {
        if (
          snake.position[snake.position.length - 1].x ===
            Number(eatenElement.style.gridRowStart) &&
          snake.position[snake.position.length - 1].y ===
            Number(eatenElement.style.gridColumnStart)
        ) {
          //add new segment
          snake.position.push({
            x: Number(eatenElement.style.gridRowStart),
            y: Number(eatenElement.style.gridColumnStart),
          });
          eatenElement.remove();
        }
      });
    }
  },

  eat: function () {
    if (
      this.position.x === snake.position[0].x &&
      this.position.y === snake.position[0].y
    ) {
      //speed up, add score
      snake.speed += 0.2;
      score.value++;
      score.update();
      const eaten = document.querySelector('.food');
      eaten.classList.add('eaten');
      eaten.classList.remove('food');
      food.render();
    }
  },
  render: function () {
    this.setRandomPosition();
    while (this.checkOverlap()) {
      this.setRandomPosition();
    }
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.position.x;
    foodElement.style.gridColumnStart = this.position.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
  },
};
const removeElements = (className) => {
  const currentElements = document.querySelectorAll(`.${className}`);
  currentElements.forEach((el) => {
    el.remove();
  });
};

function updateFrame(timeStamp) {
  if (timeStamp - lastTimeStamp >= 1000 / snake.speed) {
    lastTimeStamp = timeStamp;
    return true;
  }
  return false;
}

function gameLoop(timeStamp) {
  if (updateFrame(timeStamp)) {
    snake.setDirection();
    food.eat();
    food.checkEaten();
    snake.updatePosition();
  }
  if (gameLost) gameEnd();
  if (!gameLost) requestAnimationFrame(gameLoop);
}

const handleKeyDown = (e) => snake.move(e);
document.addEventListener('keydown', handleKeyDown);

//draw starter snake
gameRestart();
