'use strict';

const board = document.getElementById('board');
const restartBtn = document.getElementById('restart');
//value for timestamp calculation
let lastTimeStamp = 0;
let gameLost = false;
const snake = {
  move: function ({ keyCode }) {
    //initialize loop...
    this.startGameLoop();
    //...or set another direction
    this.setDirection(keyCode);
  },
  //moves per second
  speed: 1,
  position: [
    { x: 12, y: 12 },
    { x: 12, y: 13 },
    { x: 12, y: 14 },
    { x: 12, y: 15 },
    { x: 12, y: 16 },
    { x: 12, y: 17 },
  ],
  newPosition: { x: 0, y: 0 },
  prevPosition: { x: 0, y: 0 },
  direction: 0,
  startGameLoop: function () {
    if (!this.direction) {
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
    positionSet.forEach((el) => {
      if (el.x === this.newPosition.x && el.y === this.newPosition.y) {
        console.log('collision!');
        return true;
      }
      return false;
    });
    // for (const segment of this.position) {
    //   // debugger;
    //   if (
    //     segment.x === this.newPosition.x &&
    //     segment.y === this.newPosition.y
    //   ) {
    //     console.log('collision!');
    //     return true;
    //   }
    //   return false;
    // }
  },
  checkWallCollision: function () {
    if (this.newPosition.x === -1) this.newPosition.x = 23;
    if (this.newPosition.x === 24) this.newPosition.x = 0;
    if (this.newPosition.y === -1) this.newPosition.y = 23;
    if (this.newPosition.y === 24) this.newPosition.y = 0;
  },
  setNewPosition: function () {
    this.newPosition = {
      x: this.position[0].x,
      y: this.position[0].y,
    };
    const key = this.direction;
    if (key === 38) this.newPosition.x -= 1;
    if (key === 40) this.newPosition.x += 1;
    if (key === 39) this.newPosition.y += 1;
    if (key === 37) this.newPosition.y -= 1;
    this.checkWallCollision();
  },
  setDirection: function (keyCode) {
    if (
      this.direction !== keyCode &&
      this.possibleMoves(this.direction).has(keyCode)
    ) {
      this.direction = keyCode;
    }
  },
  updatePosition: function () {
    // this.checkEaten();
    this.setNewPosition();
    if (this.checkSelfCollision()) {
      console.log('collision!, in set position');
      gameLost = true;
      return;
    }
    this.position.map((el) => {
      this.prevPosition = { ...el };
      el.x = this.newPosition.x;
      el.y = this.newPosition.y;

      this.newPosition = { ...this.prevPosition };
    });
    renderSnake();
  },
};
const food = {
  position: { x: 0, y: 0 },
  setRandomPosition: function () {
    this.position.x = Math.floor(Math.random() * 21) + 2;
    this.position.y = Math.floor(Math.random() * 21) + 2;
  },
  checkOverlap() {
    for (const segment of snake.position) {
      if (segment.x === this.position.x && segment.y === this.position.y) {
        return true;
      }
      return false;
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
    //game logic start
    snake.setDirection();
    snake.updatePosition();
    //game logic end
  }
  if (!gameLost) {
    requestAnimationFrame(gameLoop);
  }
}

const handleKeyDown = (e) => snake.move(e);
document.addEventListener('keydown', handleKeyDown);

//draw starter snake
renderSnake();
food.render();
// const snake = {
//   position: [
//     { x: 15, y: 12 },
//     { x: 16, y: 12 },
//     { x: 17, y: 12 },
//   ],
//   prevPosition: { x: 0, y: 0 },
//   newPosition: { x: 0, y: 0 },
//   currentMoveDirection: 'init',
//   food: {
//     position: { x: 0, y: 0 },
//   },
//   directions: {
//     up: 38,
//     down: 40,
//     left: 37,
//     right: 39,
//   },
//   possibleMoves: function (direction) {
//     if (direction === 'init') {
//       return new Set([38, 37, 39]);
//     }
//     if (direction === 38 || direction === 40) {
//       return new Set([37, 39]);
//     }
//     if (direction === 37 || 39) {
//       return new Set([38, 40]);
//     }
//   },
//   eat: function () {
//     if (
//       this.food.position.x === this.newPosition.x &&
//       this.food.position.y === this.newPosition.y
//     ) {
//       const eaten = document.querySelector('.food');
//       eaten.classList.add('eaten');
//       eaten.classList.remove('food');
//       renderFood();
//     }
//   },
//   checkEaten: function () {
//     if (document.querySelectorAll('.eaten').length) {
//       // debugger;
//       const eaten = document.querySelectorAll('.eaten');
//       eaten.forEach((eatenElement) => {
//         // check when last snake segmet is on eaten el
//         // debugger;
//         if (
//           this.position[this.position.length - 1].x ===
//             Number(eatenElement.style.gridRowStart) &&
//           this.position[this.position.length - 1].y ===
//             Number(eatenElement.style.gridColumnStart)
//         ) {
//           //add new segment
//           this.position.push({
//             x: Number(eatenElement.style.gridRowStart),
//             y: Number(eatenElement.style.gridColumnStart),
//           });
//           eatenElement.remove();
//           //speed up :)
//           snakeSpeed += 0.2;
//         }
//       });
//     }
//   },

//   updatePosition: function (keyCode) {
//     this.checkEaten();
//     this.position.map((el) => {
//       this.prevPosition = { ...el };
//       el.x = this.newPosition.x;
//       el.y = this.newPosition.y;
//       this.newPosition = { ...this.prevPosition };
//     });
//     renderSnake();
//     this.currentMoveDirection = keyCode;
//   },

//   moveLoop: function (keyCode) {
//     loopEvent = setInterval(() => {
//       this.newPosition = {
//         x: this.position[0].x,
//         y: this.position[0].y,
//       };
//       if (keyCode === 38) this.newPosition.x -= 1;
//       if (keyCode === 40) this.newPosition.x += 1;
//       if (keyCode === 39) this.newPosition.y += 1;
//       if (keyCode === 37) this.newPosition.y -= 1;
//       this.gameLost();
//       this.eat();
//       this.updatePosition(keyCode);
//     }, 1000 / snakeSpeed);
//   },

//   move: function ({ keyCode }) {
//     if (this.possibleMoves(this.currentMoveDirection).has(keyCode)) {
//       window.clearInterval(loopEvent);
//       this.moveLoop(keyCode);
//     }
//   },
//   gameLost: function () {
//     this.position.forEach((el) => {
//       if (
//         (el.x === this.newPosition.x && el.y === this.newPosition.y) ||
//         this.newPosition.y === 24 ||
//         this.newPosition.x === 24 ||
//         this.newPosition.x === -1 ||
//         this.newPosition.y === -1
//       ) {
//         window.clearInterval(loopEvent);
//         document.removeEventListener('keydown', handleKeyDown);
//         board.classList.add('lost');
//         this.newPosition = { ...this.position[this.position.length - 1] };
//         return;
//       }
//       return false;
//     });
//   },
// };

// const removeElements = (className) => {
//   const currentElements = document.querySelectorAll(`.${className}`);
//   currentElements.forEach((el) => {
//     el.remove();
//   });
// };

// const renderFood = () => {
//   //check if food renders inside current snake
//   let x = Math.floor(Math.random() * 21) + 2;
//   let y = Math.floor(Math.random() * 21) + 2;
//   while (x === snake.position.x && y === snake.position.y) {
//     x = Math.floor(Math.random() * 23);
//     y = Math.floor(Math.random() * 23);
//   }
//   snake.food.position.x = x;
//   snake.food.position.y = y;
//   const foodElement = document.createElement('div');
//   foodElement.style.gridRowStart = snake.food.position.x;
//   foodElement.style.gridColumnStart = snake.food.position.y;
//   foodElement.classList.add('food');
//   board.appendChild(foodElement);
// };

// renderSnake();
// renderFood();
// const handleKeyDown = (e) => snake.move(e);
// document.addEventListener('keydown', handleKeyDown);

// const handleClick = () => {
//   snake.position = [
//     { x: 15, y: 12 },
//     { x: 16, y: 12 },
//     { x: 17, y: 12 },
//   ];
//   snakeSpeed = 5;
//   board
//     .querySelectorAll('div:not(.game-over):not(.overlay)')
//     .forEach((el) => el.remove());
//   snake.currentMoveDirection = 'init';
//   renderSnake();
//   renderFood();
//   board.classList.remove('lost');
//   document.addEventListener('keydown', handleKeyDown);
// };

// restartBtn.addEventListener('click', handleClick);
