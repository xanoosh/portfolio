'use strict';

//Variables
const symbolsOfCards = ['♣', '♦', '♥', '♠'];
const valuesOfCards = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
const values = {
  poker: 7,
  fourOfTheKind: 6,
  fullHouse: 5,
  flush: 4,
  straight: 3,
  threeOfTheKind: 2,
  pair: 1,
};
const straights = {
  first: [10, 11, 12, 13, 1],
  second: [9, 10, 11, 12, 13],
  third: [8, 9, 10, 11, 12],
  forth: [7, 8, 9, 10, 11],
  fith: [6, 7, 8, 9, 10],
  sixth: [5, 6, 7, 8, 9],
  seventh: [4, 5, 6, 7, 8],
  eighth: [3, 4, 5, 6, 7],
  ninth: [2, 3, 4, 5, 6],
};

const pickedCards = document.querySelectorAll('.player-one .card-container');
const run = document.getElementById('run');
let fullDeck = [];
let usedDeck = [];
// clubs (♣), diamonds (♦), hearts (♥), and spades (♠).

//create deck of all cards:
function createDeck() {
  fullDeck = [];
  symbolsOfCards.forEach((symbol) => {
    valuesOfCards.forEach((value) => {
      const el = {
        symbol,
        value,
      };
      fullDeck.push(el);
    });
  });
}
//call it
createDeck();

//shuffle function
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

//click - show card and remoe it from deck
pickedCards.forEach((hand) => {
  hand.addEventListener('click', function () {
    hand.classList.toggle('show');
    //get card from deck
    const myCard = fullDeck[Math.floor(Math.random() * fullDeck.length)];
    const cardSymbol = document.createElement('p');
    cardSymbol.innerHTML = myCard.symbol;
    const cardValue = document.createElement('p');
    cardValue.innerHTML = myCard.value;
    if (myCard.symbol === '♦' || myCard.symbol === '♥') {
      hand.classList.add('red');
    }
    hand.appendChild(cardValue);
    hand.appendChild(cardSymbol);
    //remove card from fullDeck
    const index = fullDeck.indexOf(myCard);
    if (index > -1) {
      fullDeck.splice(index, 1);
    }
  });
});

function symulation() {
  //shuffle cards
  shuffleArray(fullDeck);
  //get players hand to array
  const playerHand = [];
  pickedCards.forEach((card) => {
    const value = card.querySelector('p:first-of-type').innerHTML;
    const symbol = card.querySelector('p:last-of-type').innerHTML;
    playerHand.push({
      symbol,
      value,
    });
  });
  console.log(
    `player 1 hand: ${playerHand[0].value} ${playerHand[0].symbol}, ${playerHand[1].value} ${playerHand[1].symbol}`
  );
  //get second player hand to array
  const [one, two, ...rest] = fullDeck;
  const secondPlayerHand = [one, two];
  console.log(
    `player 2 hand: ${secondPlayerHand[0].value} ${secondPlayerHand[0].symbol}, ${secondPlayerHand[1].value} ${secondPlayerHand[1].symbol}`
  );
  //get table cards array
  const [flopOne, flopTwo, flopThree, turn, river, ...unused] = rest;
  const tableCards = [flopOne, flopTwo, flopThree, turn, river];
  console.log(
    `Cards On Table: ${tableCards[0].value} ${tableCards[0].symbol},${tableCards[1].value} ${tableCards[1].symbol},${tableCards[2].value} ${tableCards[2].symbol},${tableCards[3].value} ${tableCards[3].symbol},${tableCards[4].value} ${tableCards[4].symbol} `
  );
  //compare
}

run.addEventListener('click', symulation);
//count propability of winning based on current cards and number of players
// ????
