'use strict';

const board = document.getElementById('board');
const winningScreen = document.getElementById('win');
const arrayBase = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

//AOS setup
// AOS.init();
// let delayVal = 0;
// document.querySelectorAll(`[data-aos='fade-up']`).forEach((el) => {
//   el.setAttribute('data-aos-delay', delayVal);
//   delayVal += 100;
// });

//array shuffle function
const shuffleArray = function (array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

//class for every memo field
class memo {
  constructor(color) {
    this.color = color;
    this.createEl = function () {
      const el = document.createElement('div');
      el.classList.add('memo', this.color);
      el.setAttribute('data-aos', 'fade-up');
      el.addEventListener('click', function () {
        if (!el.classList.contains('done')) {
          el.classList.toggle('flip');
          checkColors();
        }
      });
      board.appendChild(el);
    };
  }
}

shuffleArray(arrayBase);

//iterate and create memo game
arrayBase.forEach((color) => {
  const obj = new memo(color);
  obj.createEl();
});

function checkColors() {
  const flipped = [];
  const memos = board.querySelectorAll('.memo');
  //toggle click event
  memos.forEach((memo) => {
    memo.removeEventListener('click', function () {
      // if (!memo.classList.contains('done')) {
      // el.classList.toggle('flip');
      // checkColors();
      // }
    });
  });
  memos.forEach((memo) => {
    if (memo.classList.contains('flip') && !memo.classList.contains('done'))
      flipped.push(memo);
  });
  console.log(flipped);
  console.log(flipped[0].classList);
  if (
    flipped.length === 2 &&
    flipped[0].classList[1] === flipped[1].classList[1]
  ) {
    flipped.forEach((el) => {
      el.classList.add('done');
    });
  } else if (
    flipped.length === 2 &&
    flipped[0].classList[1] !== flipped[1].classList[1]
  ) {
    setTimeout(function () {
      flipped.forEach((el) => {
        el.classList.toggle('flip');
      });
    }, 500);
  }
  let progress = [];
  memos.forEach((memo) => {
    if (memo.classList.contains('done')) {
      progress.push(memo);
    }
  });

  if (progress.length === 16) {
    winningScreen.classList.toggle('hidden');
    winningScreen.classList.toggle('winanimation');
  }
  // //toggle click event
  // memos.forEach((memo) => {
  //   if (!memo.classList.contains('done')) {
  //     memo.addEventListener('click', function () {
  //       // memo.classList.toggle('flip');
  //       checkColors();
  //     });
  //   }
  // });
}
