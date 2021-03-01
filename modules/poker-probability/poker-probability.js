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
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['ten', 10],
];
const playerScores = [
  { player: 1, score: 0, draw: 0 },
  { player: 2, score: 0, draw: 0 },
  { player: 3, score: 0, draw: 0 },
  { player: 4, score: 0, draw: 0 },
  { player: 5, score: 0, draw: 0 },
  { player: 6, score: 0, draw: 0 },
  { player: 7, score: 0, draw: 0 },
  { player: 8, score: 0, draw: 0 },
  { player: 9, score: 0, draw: 0 },
  { player: 10, score: 0, draw: 0 },
];

let numberOfPlayers = 4;
const otherPlayers = document.getElementById('other-players');
const cardList = document.getElementById('card-list');
const pickedCards = document.querySelectorAll('.card-container.active');
const table = document.getElementById('table');
const btnAdd = document.getElementById('add');
const btnRemove = document.getElementById('remove');
const btnRun = document.getElementById('run');
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

function addPlayer() {
  if (numberOfPlayers < 10) {
    const player = additionalPlayers[numberOfPlayers];
    console.log(player[0], player[1]);
    const playerName = player[0];
    const playerNum = player[1];
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-container');
    const heading = document.createElement('h3');
    heading.innerText = `Player ${playerNum}`;
    const winP = document.createElement('p');
    // winP.classList.add(`player-${playerName}-win`);
    winP.id = `player-${playerName}-win`;
    const drawP = document.createElement('p');
    // drawP.classList.add(`player-${playerName}-draw`);
    drawP.id = `player-${playerName}-draw`;
    otherPlayers.appendChild(playerContainer);
    playerContainer.appendChild(heading);
    playerContainer.appendChild(winP);
    playerContainer.appendChild(drawP);
    numberOfPlayers++;
  }
}

function removePlayer() {
  if (numberOfPlayers > 2) {
    const player = additionalPlayers[numberOfPlayers - 2];
    console.log(player[0], player[1]);
    otherPlayers.removeChild(otherPlayers.lastChild);
    numberOfPlayers--;
  }
}
btnAdd.addEventListener('click', addPlayer);
btnRemove.addEventListener('click', removePlayer);

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
    btnRun.classList.remove('hidden');
    //add full table
    const tableCards = table.querySelectorAll('.card-container');
    tableCards.forEach((card) => {
      card.classList.add('active');
      card.addEventListener('click', openList);
    });
  }

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
  //checkFlush() of five cards (exclude )
  arr.forEach((el) => {
    valuesArr.push(el.value);
  });
  for (const straight of straights) {
    if (straight.every((i) => valuesArr.includes(i))) {
      const pokerTest = [];
      arr.forEach((el) => {
        // console.log(el.value);
        // console.log(straight);
        if (straight.includes(el.value)) {
          pokerTest.push(el);
        }
      });
      if (checkFlush(pokerTest)) {
        result = {
          value: 'poker',
          rank: straights.length - straights.indexOf(straight),
        };
        break;
      } else {
        continue;
      }
    }
  }
  if (!result) {
    for (const straight of straights) {
      if (straight.every((i) => valuesArr.includes(i))) {
        result = {
          value: 'straight',
          rank: straights.length - straights.indexOf(straight),
        };
        break;
      }
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
function getPlayerSet(cards, playernum) {
  const result = {
    value: '',
    rank: '',
    rankSecond: '',
    player: playernum,
  };
  if (checkStraight(cards) && checkStraight(cards).value === 'poker') {
    result.value = checkStraight(cards).value;
    result.rank = checkStraight(cards).rank;
  } else if (
    checkSameValues(cards) &&
    checkSameValues(cards).value === 'fourOfTheKind'
  ) {
    result.value = checkSameValues(cards).value;
    result.rank = checkSameValues(cards).rank;
  } else if (
    checkSameValues(cards) &&
    checkSameValues(cards).value === 'fullHouse'
  ) {
    result.value = checkSameValues(cards).value;
    result.rank = checkSameValues(cards).rank;
    result.rankSecond = checkSameValues(cards).rankSecond;
  } else if (checkFlush(cards)) {
    result.value = checkFlush(cards).value;
    result.rank = checkFlush(cards).symbol;
  } else if (checkStraight(cards)) {
    // checkStraight(playerOneSet);
    result.value = checkStraight(cards).value;
    result.rank = checkStraight(cards).rank;
  } else if (checkSameValues(cards)) {
    result.value = checkSameValues(cards).value;
    result.rank = checkSameValues(cards).rank;
    if (checkSameValues(cards).rankSecond !== undefined) {
      result.rankSecond = checkSameValues(cards).rankSecond;
    }
  } else {
    highCard(cards);
    result.value = 'highCard';
    result.rank = highCard(cards);
  }
  return result;
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

  //get table cards array
  let [one, two, three, four, five, ...unused] = fullDeck;
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
    tableCards = tableCards.concat([one, two, three, four]);
    unused.push(five);
  } else if (tableCards.length === 2) {
    tableCards = tableCards.concat([one, two, three]);
    unused = unused.concat([four, five]);
  } else if (tableCards.length === 3) {
    tableCards = tableCards.concat([one, two]);
    unused = unused.concat([three, four, five]);
  } else if (tableCards.length === 4) {
    tableCards.push(one);
    unused = unused.concat([two, three, four, five]);
  } else {
    //no need to do anything
  }
  const playerOneSet = tableCards.concat(playerHand);
  const currentDeck = [...unused];
  const result = [];
  //loop for multiple players start
  for (let i = 1; i <= numberOfPlayers; i++) {
    if (i === 1) {
      result.push(getPlayerSet(playerOneSet, i));
      // console.log(`player ${i} hand:`);
      // console.log(playerHand);
      // console.log(`player ${i} deck:`);
      // console.log(tableCards);
      // console.log(`player ${i} full set:`);
      // console.log(playerOneSet);
      // console.log(`player ${i} result:`);
      // console.log(getPlayerSet(playerOneSet, i));
    } else {
      const hand = [currentDeck[0], currentDeck[1]];
      currentDeck.splice([0, 1], 2);
      // console.log(`player ${i} hand:`);
      // console.log(hand);
      // console.log(`player ${i} deck:`);
      // console.log(tableCards);
      // console.log(`player ${i} full set:`);
      // console.log(tableCards.concat(hand));
      // console.log(`player ${i} result:`);
      // console.log(getPlayerSet(tableCards.concat(hand), i));
      result.push(getPlayerSet(tableCards.concat(hand), i));
    }
  }

  compareMultiple(result);
  // compareMultiple(testResult);
}

function countprobability() {
  playerOneScore = 0;
  playerTwoScore = 0;
  draw = 0;
  // gamesPlayed = 0;
  let i = 10000;
  while (i > 0) {
    symulation();
    i--;
  }
  for (let i = 0; i < numberOfPlayers; i++) {
    const wins = playerScores[i].score;
    const draws = playerScores[i].draw;
    const name = additionalPlayers[i][0];
    console.log(`${name} wins: ${wins} draws: ${draws}`);
    document.getElementById(`player-${name}-win`).innerText = `Win ~ ${(
      (wins / gamesPlayed) *
      100
    ).toFixed(2)}%`;
    document.getElementById(`player-${name}-draw`).innerText = `Draw ~ ${(
      (draws / gamesPlayed) *
      100
    ).toFixed(2)}%`;
  }
}

btnRun.addEventListener('click', countprobability);
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

function compareMultiple(arr) {
  gamesPlayed++;
  let result = {
    value: 'highCard',
  };
  let arrStoreSets = [];
  let arrStoreRanks = [];
  let arrStoreSecondRanks = [];
  //first condition (Set value)
  arr.forEach((el) => {
    if (valuesOfSets.indexOf(result.value) < valuesOfSets.indexOf(el.value)) {
      result = el;
    }
  });
  arr.forEach((el) => {
    if (el.value === result.value) {
      arrStoreSets.push(el);
    }
  });
  if (arrStoreSets.length === 1) {
    playerScores.find((x) => x.player === result.player).score++;
    return result;
  }
  //second condition (Rank value)
  result = arrStoreSets[0];
  arrStoreSets.forEach((el) => {
    if (valuesFromStrings(result.rank) < valuesFromStrings(el.rank)) {
      result = el;
    }
  });
  arrStoreSets.forEach((el) => {
    if (valuesFromStrings(result.rank) === valuesFromStrings(el.rank)) {
      arrStoreRanks.push(el);
    }
  });
  if (arrStoreRanks.length === 1) {
    playerScores.find((x) => x.player === result.player).score++;
    return result;
  }
  //third condition (rankSecond value)
  result = arrStoreRanks[0];
  arrStoreRanks.forEach((el) => {
    if (
      valuesFromStrings(result.rankSecond) < valuesFromStrings(el.rankSecond)
    ) {
      result = el;
    }
  });
  arrStoreRanks.forEach((el) => {
    if (
      valuesFromStrings(result.rankSecond) === valuesFromStrings(el.rankSecond)
    ) {
      arrStoreSecondRanks.push(el);
    }
  });
  if (arrStoreSecondRanks.length === 1) {
    playerScores.find((x) => x.player === result.player).score++;
    return result;
  }
  //last condition (draw for multiple players)
  arrStoreSecondRanks.forEach((el) => {
    playerScores.find((x) => x.player === el.player).draw++;
  });
  // return result;
}

// const testResult = [
//   {
//     value: 'poker',
//     rank: '10',
//     rankSecond: 0,
//     player: 1,
//   },
//   {
//     value: 'poker',
//     rank: '9',
//     rankSecond: '4',
//     player: 2,
//   },
//   {
//     value: 'onePair',
//     rank: 'A',
//     rankSecond: '3',
//     player: 3,
//   },
//   {
//     value: 'twoPairs',
//     rank: 'A',
//     rankSecond: '4',
//     player: 4,
//   },
//   {
//     value: 'highCard',
//     rank: 'A',
//     rankSecond: '3',
//     player: 5,
//   },
// ];
// compareMultiple(testResult);

// const testCardSet = [
//   { symbol: '♦', value: '9' },
//   { symbol: '♣', value: '2' },
//   { symbol: '♣', value: 'K' },
//   { symbol: '♦', value: 'A' },
//   { symbol: '♣', value: 'J' },
//   { symbol: '♣', value: '10' },
//   { symbol: '♣', value: 'Q' },
// ];
