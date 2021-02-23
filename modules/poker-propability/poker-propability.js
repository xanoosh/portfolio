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
const fullDeck = [];
// clubs (♣), diamonds (♦), hearts (♥), and spades (♠).

//fill up fullDeck array and log it
symbolsOfCards.forEach((symbol) => {
  valuesOfCards.forEach((value) => {
    const el = {
      symbol,
      value,
    };
    fullDeck.push(el);
  });
});

console.log(fullDeck);

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

//shuffle cards
shuffleArray(fullDeck);

const deck = new Set(fullDeck);
console.log(deck);

//click add card
const currentHand = document.querySelectorAll('.card-container');
currentHand.forEach((hand) => {
  hand.addEventListener('click', function () {
    hand.classList.toggle('show');
    //get card from deck
    const myCard = fullDeck[Math.floor(Math.random() * fullDeck.length)];
    const cardSymbol = document.createElement('p');
    cardSymbol.innerHTML = myCard.symbol;
    const cardValue = document.createElement('p');
    cardValue.innerHTML = myCard.value;
    hand.appendChild(cardValue);
    hand.appendChild(cardSymbol);
    //remove card from fullDeck
    const index = fullDeck.indexOf(myCard);
    if (index > -1) {
      fullDeck.splice(index, 1);
    }
  });
});

//count propability of winning based on current cards and number of players
// ????
