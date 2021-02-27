'use strict';

//Variables
const symbolsOfCards = ['♣', '♦', '♠', '♥'];
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
const additionalPlayers = [
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['ten', 10],
];
const cardList = document.getElementById('card-list');
const pickedCards = document.querySelectorAll('.card-container.active');
const table = document.getElementById('table');
const run = document.getElementById('run');
let playerOneScore = 0;
let playerTwoScore = 0;
let draw = 0;
let gamesPlayed = 0;
let fullDeck = [];
let usedDeck = [];

//functions
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
//current deck to card list
function updateCardList() {
  if (document.querySelectorAll('card-container-small' !== null)) {
    document.querySelectorAll('card-container-small').forEach((el) => {
      el.remove();
    });
  } else if (document.querySelector('card-container-small') !== null) {
    document.querySelector('card-container-small').remove();
  }
  fullDeck.forEach((card) => {
    const newCard = document.createElement('div');
    const value = document.createElement('p');
    const symbol = document.createElement('p');
    newCard.classList.add('card-container-small');
    value.innerHTML = card.value;
    symbol.innerHTML = card.symbol;
    if (card.symbol === '♦' || card.symbol === '♥') {
      newCard.classList.add('red');
    }
    newCard.addEventListener('click', addFromList);
    cardList.appendChild(newCard);
    newCard.appendChild(value);
    newCard.appendChild(symbol);
  });
}
//initialize deck and list
createDeck();
updateCardList();
//card list event listener
function addFromList() {
  const target = document.querySelector('.clicked');
  const value = this.childNodes[0].innerHTML;
  const symbol = this.childNodes[1].innerHTML;
  //find object in full deck
  fullDeck.forEach((card) => {
    if (card.symbol === symbol && card.value === value) {
      console.log(card);
      fullDeck.splice(fullDeck.indexOf(card), 1);
    }
  });
  this.remove();
  const cardValue = document.createElement('p');
  const cardSymbol = document.createElement('p');
  cardValue.innerHTML = value;
  cardSymbol.innerHTML = symbol;
  if (symbol === '♦' || symbol === '♥') {
    target.classList.add('red');
  }
  target.classList.add('show');
  let showBtn = 0;
  pickedCards.forEach((card) => {
    if (card.classList.contains('show')) {
      showBtn++;
    }
  });
  if (showBtn === 2) {
    run.classList.remove('hidden');
    //add full table
    const tableCards = table.querySelectorAll('.card-container');
    tableCards.forEach((card) => {
      card.classList.add('active');
      card.addEventListener('click', openList);
    });
  }
  // if (showBtn === 2 /*and flop is not partially added*/) {
  //   run.classList.remove('hidden');
  //   //add flop
  // }

  target.appendChild(cardValue);
  target.appendChild(cardSymbol);
  target.classList.toggle('clicked');
  target.removeEventListener('click', openList);
  cardList.classList.toggle('show');
}
//event listener - show card list
function openList() {
  this.classList.toggle('clicked');
  cardList.classList.toggle('show');
}
pickedCards.forEach((hand) => {
  hand.addEventListener('click', openList);
});

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
  return string;
}
//shuffle
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
    player.rankSecond = checkSameValues(cards).rankSecond;
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
    if (checkSameValues(cards).rankSecond !== undefined) {
      player.rankSecond = checkSameValues(cards).rankSecond;
    }
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
      valuesFromStrings(playerOne.rankSecond) &&
      valuesFromStrings(playerTwo.rankSecond)
    ) {
      if (
        valuesFromStrings(playerOne.rankSecond) >
        valuesFromStrings(playerTwo.rankSecond)
      ) {
        playerOneScore++;
      } else if (
        valuesFromStrings(playerOne.rankSecond) <
        valuesFromStrings(playerTwo.rankSecond)
      ) {
        playerTwoScore++;
      } else {
        draw++;
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
  //get second player hand to array
  const [secondOne, secondTwo, ...rest] = fullDeck;
  const secondPlayerHand = [secondOne, secondTwo];
  //get table cards array
  const [one, two, three, four, five, ...unused] = rest;
  //check if there are cards on the table
  let tableCards = [];
  table.querySelectorAll('.card-container').forEach((card) => {
    if (card.classList.contains('show')) {
      const value = card.querySelector('p:first-of-type').innerHTML;
      const symbol = card.querySelector('p:last-of-type').innerHTML;
      tableCards.push({
        symbol,
        value,
      });
    }
  });
  if (tableCards.length === 0) {
    tableCards = [one, two, three, four, five];
  } else if (tableCards.length === 1) {
    tableCards = [one, two, three, four];
  } else if (tableCards.length === 2) {
    tableCards = [one, two, three];
  } else if (tableCards.length === 3) {
    tableCards = [one, two];
  } else if (tableCards.length === 4) {
    tableCards.push(one);
  } else {
    //no need to do anything
  }
  const playerOneSet = tableCards.concat(playerHand);
  // const playerOneSet = testDeck;
  const playerTwoSet = tableCards.concat(secondPlayerHand);
  //function for getting specific card set of a player
  const playerOne = {
    value: '',
    rank: 0,
    rankSecond: 0,
  };
  const playerTwo = {
    value: '',
    rank: 0,
    rankSecond: 0,
  };
  const playerOneObj = getPlayerSet(playerOneSet, playerOne);
  // console.log('playerOneObj');
  // console.log(playerOneObj);
  const playerTwoObj = getPlayerSet(playerTwoSet, playerTwo);
  // console.log('playerTwoObj');
  // console.log(playerTwoObj);
  const result = [playerOneObj, playerTwoObj];
  // console.log(result);
  //testing data
  // const testResult = [
  //   {
  //     value: 'straight',
  //     rank: '10',
  //     // rankSecond: 'J',
  //   },
  //   {
  //     value: 'highCard',
  //     rank: 'A',
  //     // rankSecond: '3',
  //   },
  // ];
  // console.log(fullDeck);
  // comparePlayers(testResult);
  comparePlayers(result);
  // console.log(result);
  // return result[0].value;
  // return testResult;
}

function countprobability() {
  playerOneScore = 0;
  playerTwoScore = 0;
  draw = 0;
  gamesPlayed = 0;
  let i = 10000;
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
  // console.log(duplicates);
  for (const el of duplicates) {
    if (el.count === 4) {
      const value = 'fourOfTheKind';
      const rank = el.value;
      const rankSecond = duplicates[1].value;
      result = { value, rank, rankSecond };
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
        const rankSecond = duplicates[1].value;
        result = { value, rank, rankSecond };
        return result;
      }
    } else if (el.count === 2) {
      const checker = new Set(valuesArr);
      if (checker.size <= 5) {
        const value = 'twoPairs';
        const rank = el.value;
        const rankSecond = duplicates[1].value;
        result = { value, rank, rankSecond };
        // console.log(result);
        return result;
      } else {
        const value = 'onePair';
        const rank = el.value;
        const rankSecond = duplicates[1].value;
        result = { value, rank, rankSecond };
        return result;
      }
    } else {
      continue;
    }
  }
  return result;
}
