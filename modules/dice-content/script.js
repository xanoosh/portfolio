'use strict';

// score--0 current--1
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const scorePlayer0El = document.getElementById(`score--0`);
const scorePlayer1El = document.getElementById(`score--1`);
const diceEl = document.querySelector('.dice');
const playerOneScore = document.getElementById('current--0');
const playerTwoScore = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHow = document.querySelector('.btn--how');
const btnClosePopup = document.querySelector('.close-popup');
const overlay = document.querySelector('.overlay');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

//function player switcher

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  //diceEl.classList.add('hidden');
};

//roll dice function
const rollDice = function () {
  //random number 1-6
  let random = Math.trunc(Math.random() * 6) + 1;
  let imgSrc = `modules/dice-content/dice-${random}.png`;
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = imgSrc;
  //add random roll to current score
  if (random !== 1) {
    currentScore += random;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    switchPlayer();
  }
};

//score hold function
const holdScore = function () {
  //check score value
  let scoreVal = document.getElementById(`score--${activePlayer}`);
  let summaryValue = Number(scoreVal.textContent) + currentScore;

  if (summaryValue < 100) {
    //console.log(scoreVal.textContent);
    scoreVal.textContent = Number(scoreVal.textContent) + currentScore;
    switchPlayer();
    diceEl.classList.add('hidden');
  } else {
    // summaryValue = 100;
    scoreVal.textContent = Number(scoreVal.textContent) + currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
    btnRoll.style.pointerEvents = 'none';
    btnHold.style.pointerEvents = 'none';
    btnNew.style.backgroundColor = '#fff';
  }
};

//reset values for new game
const resetValues = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(
    `name--${activePlayer}`
  ).textContent = `Player ${activePlayer}`;
  currentScore = 0;
  activePlayer = 0;
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnRoll.style.pointerEvents = 'all';
  btnHold.style.pointerEvents = 'all';
  btnNew.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
};

//popup mechanics
btnHow.addEventListener('click', function () {
  overlay.classList.remove('opacity');
});
overlay.addEventListener('click', function () {
  overlay.classList.add('opacity');
});
btnClosePopup.addEventListener('click', function () {
  overlay.classList.add('opacity');
});

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', resetValues);
