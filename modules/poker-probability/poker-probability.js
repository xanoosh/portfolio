'use strict';

//Variables
const symbolsOfCards = ['♣', '♦', '♥', '♠'];
const valuesOfCards = [
  'A',
  'K',
  'Q',
  'J',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];
// const valuesOfSets = {
//   poker: 8,
//   fourOfTheKind: 7,
//   fullHouse: 6,
//   flush: 5,
//   straight: 4,
//   threeOfTheKind: 3,
//   twoPairs: 2,
//   onePair: 1,
//   highCard: 0,
// };
const valuesOfSets = [
  'highCard',
  'onePair',
  'twoPairs',
  'threeOfTheKind',
  'straight',
  'flush',
  'fullHouse',
  'fourOfTheKind',
  'poker',
];
const straights = [
  ['10', 'J', 'Q', 'K', 'A'],
  ['9', '10', 'J', 'Q', 'K'],
  ['8', '9', '10', 'J', 'Q'],
  ['7', '8', '9', '10', 'J'],
  ['6', '7', '8', '9', '10'],
  ['5', '6', '7', '8', '9'],
  ['4', '5', '6', '7', '8'],
  ['3', '4', '5', '6', '7'],
  ['2', '3', '4', '5', '6'],
  ['A', '2', '3', '4', '5'],
];

let playerOneScore = 0;
let playerTwoScore = 0;
let draw = 0;
let gamesPlayed = 0;

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

//convert letters to values
function valuesFromStrings(string) {
  if (string === '2') return 2;
  if (string === '3') return 3;
  if (string === '4') return 4;
  if (string === '5') return 5;
  if (string === '6') return 6;
  if (string === '7') return 7;
  if (string === '8') return 8;
  if (string === '9') return 9;
  if (string === '10') return 10;
  if (string === 'J') return 11;
  if (string === 'Q') return 12;
  if (string === 'K') return 13;
  if (string === 'A') return 14;
}

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
    let showBtn = 0;
    pickedCards.forEach((card) => {
      if (card.classList.contains('show')) {
        showBtn++;
      }
    });
    if (showBtn === 2) {
      run.classList.remove('hidden');
    }
  });
});

//card sets getting Functions
function checkStraight(arr) {
  let result = false;
  const valuesArr = [];
  arr.forEach((el) => {
    valuesArr.push(el.value);
  });
  for (const straight of straights) {
    if (straight.every((i) => valuesArr.includes(i))) {
      // console.log(straight);
      result = {
        value: 'straight',
        rank: straights.length - straights.indexOf(straight),
      };
      break;
    }
  }
  return result;
}

function highCard(arr) {
  const valuesArr = [];
  arr.forEach((el) => {
    valuesArr.push(el.value);
  });
  // console.log(valuesArr);
  for (const card of valuesOfCards) {
    if (valuesArr.indexOf(card) !== -1) {
      return card;
    }
  }
}

//check for flush
function checkFlush(arr) {
  let result = false;
  const symbolsArr = [];
  arr.forEach((el) => {
    symbolsArr.push(el.symbol);
  });
  const symbols = [];
  symbolsArr.forEach(function (x) {
    if (symbols.some((el) => el.symbol === x)) {
      symbols.some((el) => {
        if (el.symbol === x) {
          el.count++;
        }
      });
    } else {
      const symbol = x;
      const count = 1;
      symbols.push({
        symbol,
        count,
      });
    }
  });

  symbols.forEach((symbol) => {
    if (symbol.count >= 5) {
      result = {
        value: 'flush',
        symbol: symbol.symbol,
      };
    }
  });
  return result;
}

//get specific set for player
function getPlayerSet(cards, player) {
  if (checkStraight(cards)) {
    if (checkFlush(cards)) {
      player.value = 'poker';
      player.rank = checkStraight(cards).rank;
    }
  } else if (
    checkSameValues(cards) &&
    checkSameValues(cards).value === 'fourOfTheKind'
  ) {
    player.value = checkSameValues(cards).value;
    player.rank = checkSameValues(cards).rank;
  } else if (
    checkSameValues(cards) &&
    checkSameValues(cards).value === 'fullHouse'
  ) {
    player.value = checkSameValues(cards).value;
    player.rank = checkSameValues(cards).rank;
  } else if (checkFlush(cards)) {
    player.value = checkFlush(cards).value;
    player.rank = checkFlush(cards).symbol;
  } else if (checkStraight(cards)) {
    // checkStraight(playerOneSet);
    player.value = checkStraight(cards).value;
    player.rank = checkStraight(cards).rank;
  } else if (checkSameValues(cards)) {
    player.value = checkSameValues(cards).value;
    player.rank = checkSameValues(cards).rank;
  } else {
    highCard(cards);
    player.value = 'highCard';
    player.rank = highCard(cards);
  }
  return player;
}

function comparePlayers(arr) {
  if (arr.length === 2) {
    const playerOne = arr[0];
    const playerTwo = arr[1];
    if (
      valuesOfSets.indexOf(playerOne.value) >
      valuesOfSets.indexOf(playerTwo.value)
    ) {
      //playerOne wins
      playerOneScore++;
    } else if (
      valuesOfSets.indexOf(playerOne.value) <
      valuesOfSets.indexOf(playerTwo.value)
    ) {
      //playerTwo wins
      playerTwoScore++;
    } else if (
      valuesFromStrings(playerOne.rank) > valuesFromStrings(playerTwo.rank)
    ) {
      playerOneScore++;
    } else if (
      valuesFromStrings(playerOne.rank) < valuesFromStrings(playerTwo.rank)
    ) {
      playerTwoScore++;
    } else if (
      playerOne.value === 'twoPairs' ||
      playerOne.value === 'fullHouse'
    ) {
      if (
        valuesFromStrings(playerOne.rankSecond) >
        valuesFromStrings(playerTwo.rankSecond)
      ) {
        playerOneScore++;
      }
      if (
        valuesFromStrings(playerOne.rankSecond) <
        valuesFromStrings(playerTwo.rankSecond)
      ) {
        playerTwoScore++;
      }
    } else {
      draw++;
    }
  }
  gamesPlayed++;
}

// console.log(fullDeck);
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
  // console.log(
  //   `player 1 hand: ${playerHand[0].value} ${playerHand[0].symbol}, ${playerHand[1].value} ${playerHand[1].symbol}`
  // );
  //get second player hand to array
  const [one, two, ...rest] = fullDeck;
  const secondPlayerHand = [one, two];
  // console.log(
  //   `player 2 hand: ${secondPlayerHand[0].value} ${secondPlayerHand[0].symbol}, ${secondPlayerHand[1].value} ${secondPlayerHand[1].symbol}`
  // );
  //get table cards array
  const [flopOne, flopTwo, flopThree, turn, river, ...unused] = rest;
  const tableCards = [flopOne, flopTwo, flopThree, turn, river];
  // console.log(
  //   `Cards On Table: ${tableCards[0].value} ${tableCards[0].symbol},${tableCards[1].value} ${tableCards[1].symbol},${tableCards[2].value} ${tableCards[2].symbol},${tableCards[3].value} ${tableCards[3].symbol},${tableCards[4].value} ${tableCards[4].symbol} `
  // );

  const playerOneSet = tableCards.concat(playerHand);
  // const playerOneSet = testDeck;
  const playerTwoSet = tableCards.concat(secondPlayerHand);
  // console.log('Player one set:');
  // console.table(playerOneSet);
  //function for getting specific card set of a player
  const playerOne = {
    value: '',
    rank: 0,
  };
  const playerTwo = {
    value: '',
    rank: 0,
  };
  const playerOneObj = getPlayerSet(playerOneSet, playerOne);
  const playerTwoObj = getPlayerSet(playerTwoSet, playerTwo);
  const result = [playerOneObj, playerTwoObj];
  // console.log(result);
  comparePlayers(result);
  return result[0].value;
}

function countprobability() {
  playerOneScore = 0;
  playerTwoScore = 0;
  draw = 0;
  gamesPlayed = 0;
  let i = 100000;
  while (i > 0) {
    symulation();
    i--;
  }
  console.log(`Player One won ${(playerOneScore / gamesPlayed) * 100}%`);
  document.getElementById('player-one-odds').innerText = `Win ~ ${(
    (playerOneScore / gamesPlayed) *
    100
  ).toFixed(2)}%`;
  document.getElementById('player-two-odds').innerText = `Win ~ ${(
    (playerTwoScore / gamesPlayed) *
    100
  ).toFixed(2)}%`;

  document.getElementById('draw-odds').innerText = `Draw ~ ${(
    (draw / gamesPlayed) *
    100
  ).toFixed(2)}%`;
  console.log(`Player Two won ${(playerTwoScore / gamesPlayed) * 100}%`);
  console.log(`Draw happened ${(draw / gamesPlayed) * 100}% of the time`);
}

run.addEventListener('click', countprobability);
//count propability of winning based on current cards and number of players
// ????

function checkSameValues(arr) {
  let result = false;
  //get values array from card list
  const valuesArr = [];
  arr.forEach((el) => {
    valuesArr.push(el.value);
  });
  //get duplicated values
  const duplicates = [];
  valuesArr.forEach(function (x) {
    if (duplicates.some((el) => el.value === x)) {
      duplicates.some((el) => {
        if (el.value === x) {
          el.count++;
        }
      });
    } else {
      const value = x;
      const count = 1;
      duplicates.push({
        value,
        count,
      });
    }
  });
  //sorting starts
  duplicates.sort(function (a, b) {
    let keyA = valuesFromStrings(a.value);
    let keyB = valuesFromStrings(b.value);
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
  duplicates.sort(function (a, b) {
    let keyA = a.count;
    let keyB = b.count;
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
  // sorting ends
  for (const el of duplicates) {
    if (el.count === 4) {
      const value = 'fourOfTheKind';
      const rank = el.value;
      result = { value, rank };
      return result;
    } else if (el.count === 3) {
      const checker = new Set(valuesArr);
      //case full:
      if (checker.size <= 4) {
        const value = 'fullHouse';
        const rank = el.value;
        const rankSecond = duplicates[1].value;
        result = { value, rank, rankSecond };
        return result;
      } else {
        const value = 'threeOfTheKind';
        const rank = el.value;
        result = { value, rank };
        return result;
      }
    } else if (el.count === 2) {
      const checker = new Set(valuesArr);
      if (checker.size <= 5) {
        const value = 'twoPairs';
        const rank = el.value;
        const rankSecond = duplicates[1].value;
        result = { value, rank, rankSecond };
        return result;
      } else {
        const value = 'onePair';
        const rank = el.value;
        result = { value, rank };
        return result;
      }
    } else {
      continue;
    }
  }
  return result;
}

// test data:
shuffleArray(fullDeck);
const [jeden, dwa, trzy, cztery, piec, szesc, siedem, ...reszta] = fullDeck;

const testDeck = [jeden, dwa, trzy, cztery, piec, szesc, siedem];
const testPoker = [
  { symbol: '♦', value: '10' },
  { symbol: '♦', value: 'Q' },
  { symbol: '♦', value: 'K' },
  { symbol: '♦', value: 'J' },
  { symbol: '♦', value: 'A' },
  { symbol: '♦', value: '8' },
  { symbol: '♦', value: '9' },
];

const testFull = [
  { symbol: '♠', value: '2' },
  { symbol: '♥', value: 'Q' },
  { symbol: '♦', value: 'J' },
  { symbol: '♣', value: 'J' },
  { symbol: '♦', value: 'Q' },
  { symbol: '♥', value: '2' },
  { symbol: '♠', value: 'Q' },
];

const testPairs = [
  { symbol: '♠', value: '2' },
  { symbol: '♥', value: '5' },
  { symbol: '♥', value: '2' },
  { symbol: '♣', value: 'J' },
  { symbol: '♣', value: 'Q' },
  { symbol: '♠', value: '5' },
  { symbol: '♦', value: 'Q' },
];
// const symbolsOfCards = ['♣', '♦', '♥', '♠'];
// console.table(testDeck);

checkSameValues(testPairs);
