'use strict';

const { log } = require('console');

//Variables

// dodane: pierscionki, koczyki, bransoletki skórzane, bransoletki z mini.., bransoletki sztywne,

const dataPierscionki = [
  {
    name: 'Pierścionek Zodiac',
    code: '155/',
  },
  {
    name: 'Obrączka Flowers',
    code: 'P/125',
  },
  {
    name: 'Pierścionek Lune',
    code: 'P/128',
  },
  {
    name: 'Pierścionek Połączone serca',
    code: 'P/AZUR/105',
  },
  {
    name: 'Pierścionek z piórem',
    code: 'P/AZUR/115',
  },
  {
    name: 'Pierścionek Paw',
    code: 'P/AZUR/122',
  },
  {
    name: 'Pierścionek Barok Niebieski',
    code: 'P/AZUR/123/N',
  },
  {
    name: 'Pierścionek Biarritz',
    code: 'P/AZUR/123',
  },
  {
    name: 'Pierścionek Flowers',
    code: 'P/AZUR/125',
  },
  {
    name: 'Pierścionek California',
    code: 'P/AZUR/139',
  },
  {
    name: 'Pierścionek Ażur serce',
    code: 'P/AZUR/3',
  },
  {
    name: 'Pierścionek Ażur koniczyna',
    code: 'P/AZUR/4',
  },
  {
    name: 'Pierścionek Ażur motyl',
    code: 'P/AZUR/89',
  },
  {
    name: 'Pierścionek Ażur skrzydło',
    code: 'P/AZUR/98',
  },
  {
    name: 'Pierścionek Full Love',
    code: 'P/AZUR/FL',
  },
  {
    name: 'Pierścionek Z blaszką',
    code: 'P/BLASZKA',
  },
  {
    name: 'Pierścionek Szafir Zielony',
    code: 'P/SZ/ZC',
  },
];

const dataKolczyki = [
  {
    name: 'Kolczyki clover',
    code: '148',
  },
  {
    name: 'Kolczyki medalik',
    code: 'K/1/8',
  },
  {
    name: 'Kolczyki eternity',
    code: 'K/110',
  },
  {
    name: 'Kolczyki biarritz',
    code: 'K/123',
  },
  {
    name: 'Kolczyki Flowers',
    code: 'K/125',
  },
  {
    name: 'Kolczyki zwierzaki',
    code: 'K/127',
  },
  {
    name: 'Kolczyki lune',
    code: 'K/128',
  },
  {
    name: 'Kolczyki north star',
    code: 'K/134',
  },
  {
    name: 'Kolczyki love',
    code: 'K/136/love',
  },
  {
    name: 'Kolczyki Olive',
    code: 'K/143/15',
  },
  {
    name: 'Kolczyki koniczyna',
    code: 'K/2/8',
  },
  {
    name: 'Kolczyki gwiazdka',
    code: 'K/26/8',
  },
  {
    name: 'Kolczyki serce',
    code: 'K/3/8',
  },
  {
    name: 'Kolczyki nieskończoność',
    code: 'K/32/8',
  },
  {
    name: 'Kolczyki miś',
    code: 'K/41/8',
  },
  {
    name: 'Kolczyki skrzydła',
    code: 'K/98',
  },
  {
    name: 'Kolczyki paw',
    code: 'K/122',
  },
  {
    name: 'Kolczyki sunshine',
    code: 'K/azur/126',
  },
  {
    name: 'Kolczyki ażurowe North Star',
    code: 'K/azur/134',
  },
  {
    name: 'Kolczyki oko proroka',
    code: 'K/azur/137',
  },
  {
    name: 'Kolczyki ażurowe california',
    code: 'K/139',
  },
  {
    name: 'Kolczyki ażurowe 3E/Serce',
    code: 'K/azur/3E/3',
  },
  {
    name: 'Kolczyki z Piórem',
    code: 'K/m/115',
  },
  {
    name: 'Kolczyki lilie XXI',
    code: 'K/m/azur/48',
  },
];

const dataElementy = [
  {
    name: 'medalik',
    code: '1',
  },
  {
    name: 'klucz 2 cm',
    code: '10',
  },
  {
    name: 'mini serce z płomieniami',
    code: '101',
  },
  {
    name: 'wisior FULL LOVE',
    code: '102',
  },
  {
    name: 'gwiazdka ze skszydłami',
    code: '103',
  },
  {
    name: 'połączone serca',
    code: '104',
  },
  {
    name: 'połączone serca z nieskończonością',
    code: '105',
  },
  {
    name: 'zapięcie LOVE',
    code: '106',
  },
  {
    name: 'blaszka podłużna na szyję',
    code: '107',
  },
  {
    name: 'kometa FULL STAR na rękę',
    code: '108',
  },
  {
    name: 'naszyjnik gołąb pokoju',
    code: '109',
  },
  {
    name: 'medalik płaski',
    code: '111',
  },
  {
    name: 'lilijka płaska',
    code: '112',
  },
  {
    name: 'serce płaskie ',
    code: '113',
  },
  {
    name: 'koniczynka okrągła płaska',
    code: '114',
  },
  {
    name: 'pióro na rękę',
    code: '115',
  },
  {
    name: 'baletnica na rękę',
    code: '116',
  },
  {
    name: 'ręka',
    code: '119',
  },
  {
    name: 'krążek',
    code: '12',
  },
  {
    name: 'paw na rękę',
    code: '122',
  },
  {
    name: 'Naszyjnik Barok',
    code: '123',
  },
  {
    name: 'Naszyjnik kwiaty',
    code: '125',
  },
  {
    name: 'Zwierzaki',
    code: '127',
  },
  {
    name: 'zawieszka wisząca Lune',
    code: '128',
  },
  {
    name: 'ażurowa korona z cyrkonią',
    code: '130',
  },
  {
    name: 'koleckcja california',
    code: '139',
  },
  {
    name: 'ginko',
    code: '138',
  },
  {
    name: 'zawieszka mars',
    code: '140',
  },
  {
    name: 'kolekcja sun',
    code: '145',
  },
  {
    name: 'literki',
    code: '147',
  },
  {
    name: 'zawieszka płaska infinity',
    code: '150',
  },
  {
    name: 'kolekcja luck',
    code: '152',
  },
  {
    name: 'zawieszka płaska cross',
    code: '153',
  },
  {
    name: 'motyl',
    code: '19 lub 89',
  },
  {
    name: 'koniczyna',
    code: '2',
  },
  {
    name: 'blaszka prostokątna z koniczyną',
    code: '22',
  },
  {
    name: 'sowa',
    code: '23',
  },
  {
    name: 'kłódka',
    code: '24',
  },
  {
    name: 'wózek',
    code: '25',
  },
  {
    name: 'gwiazdka',
    code: '26',
  },
  {
    name: 'serce',
    code: '3',
  },
  {
    name: 'zapięcie/gisele',
    code: '31',
  },
  {
    name: 'nieskończoność',
    code: '32',
  },
  {
    name: 'puzzel',
    code: '33',
  },
  {
    name: 'zapięcie wkręcane',
    code: '34',
  },
  {
    name: 'zapięcie serce',
    code: '35',
  },
  {
    name: 'koniczyna okrągła',
    code: '4',
  },
  {
    name: 'słoń 1',
    code: '40',
  },
  {
    name: 'miś',
    code: '41',
  },
  {
    name: 'koń',
    code: '42',
  },
  {
    name: 'bobas mały',
    code: '43',
  },
  {
    name: 'nutka',
    code: '44',
  },
  {
    name: 'klucz wiolinowy',
    code: '45',
  },
  {
    name: 'złączone serca',
    code: '47',
  },
  {
    name: 'lilijka',
    code: '48',
  },
  {
    name: 'przełamane serca',
    code: '49',
  },
  {
    name: 'dziewczynka 1 kuc',
    code: '5',
  },
  {
    name: 'zapięcie serce ażur',
    code: '50',
  },
  {
    name: 'podkowa',
    code: '52',
  },
  {
    name: 'krążek ażurowy koniczyna',
    code: '53',
  },
  {
    name: 'pies',
    code: '59',
  },
  {
    name: 'dziewczynka 2 kuce',
    code: '6',
  },
  {
    name: 'drzewo ażurowe',
    code: '60',
  },
  {
    name: 'piękne anioły',
    code: '61',
  },
  {
    name: 'aniołek ażurowy',
    code: '64',
  },
  {
    name: 'wisior chłopiec/wieża Eiffla',
    code: '7',
  },
  {
    name: 'konik na biegunach',
    code: '72',
  },
  {
    name: 'bransoletka łańcuszek',
    code: '75',
  },
  {
    name: 'korona',
    code: '76',
  },
  {
    name: 'krzyż',
    code: '77',
  },
  {
    name: 'kotwica',
    code: '79',
  },
  {
    name: 'anioł',
    code: '8',
  },
  {
    name: 'kość',
    code: '81',
  },
  {
    name: 'ręka fatimy',
    code: '83',
  },
  {
    name: 'mini serce ze skrzydłami',
    code: '84',
  },
  {
    name: 'LOVE',
    code: '85',
  },
  {
    name: 'skarabeusz',
    code: '87',
  },
  {
    name: 'kotek',
    code: '9',
  },
  {
    name: 'stópka',
    code: '93',
  },
  {
    name: 'dziewczynka twarz',
    code: '94',
  },
  {
    name: 'chłopiec twarz',
    code: '95',
  },
  {
    name: 'smoczek',
    code: '96',
  },
  {
    name: 'azur skrzydła',
    code: '98',
  },
  {
    name: 'tabliczka emocji',
    code: '99',
  },
];
const dataBransoletkiSkora = [
  { name: 'bransoletka skórzana czarny/czerwony', code: 'BR/SK/CZ/CZ/8' },
  { name: 'bransoletKA skórzanA fuksja/szary', code: 'BR/SK/SZ/F/8' },
  { name: 'bransoletKA skórzana LAMPART włos', code: 'BR/SK/LAMPART/8' },
  { name: 'haczyki małe pozłacane do bransoletek SK', code: 'BR/HACZYKI/M/PO' },
  { name: 'haczyki małe srebrne do bransoletek SK', code: 'BR/HACZYKI/M/SR' },
  { name: 'klamra pozłacana 8 mm do bransoletki SK', code: 'BR/KLAMRA/8/PO' },
  { name: 'klamra posrebrzana 8 mm do bransoletki SK', code: 'BR/KLAMRA/8/SK' },
  { name: 'wsuwane serce 8 mm BR SK', code: 'BR/3/8/PO' },
  { name: 'wsuwana koniczyna 8 mm BR SK', code: 'BR/4/8/PO' },
  { name: 'wsuwane złączone serca 8 mm BR', code: 'BR/47/8/PO' },
  { name: 'wsuwana lilijka 8 mm BR SK', code: 'BR/48/8/SR' },
  { name: 'wsuwana podkowa 8 mm BR SK', code: 'BR/52/8/SR' },
  { name: 'wsuwany motylek 8 mm BR SK', code: 'BR/89/8/SR' },
  { name: 'medalik kryształ BORDO', code: 'BR/1/KR/BORDO' },
];
const dataBransoletkiZmini = [
  { name: 'bransoletka gwiazdka ażur', code: 'AZUR/MINI/26/BR' },
  { name: 'bransoletka koniczyna ażur', code: 'AZUR/MINI/4/BR' },
  { name: 'bransoletka złączone serca', code: 'AZUR/MINI/47/BR' },
  { name: 'bransoletka z lilijką', code: 'AZUR/MINI/48/BR' },
];
const dataBransoletkiSztywne = [
  { name: 'bransoletka eternity', code: 'BRANS/110' },
  { name: 'bransoletka paw stal', code: 'BRANS/122' },
  { name: 'bransoletka paw nowa', code: '160/OS/BRA/AZU' },
  { name: 'bransoletka flowers', code: 'BRANS/125' },
  { name: 'bransoletka Lune', code: 'BRANS/128' },
  { name: 'bransoletka z kluczem i ażurowym sercem', code: 'BRANS/132' },
  { name: 'bransoletka łyżeczka', code: 'BRANS/135' },
  { name: 'bransoletka nieskończoność', code: 'BRANS/32' },
  { name: 'bransoletka skrzydła', code: 'BRANS/98' },
  { name: 'bransoletka ażurowa California', code: 'BRANS/AZUR/139' },
  { name: 'bransoletka Caroline ST', code: 'BRANS/CAROLINE' },
  { name: 'bransoletka ażurowe Lune', code: 'BRANS/M/AZUR' },
  { name: 'bransoletka Monica', code: 'BRANS/MON' },
  { name: 'bransoletka Penelope', code: 'BRANS/PEN' },
  { name: 'bransoletka Infinity 60 mm PO', code: 'BRANS/INFINITY/60/PO' },
];

const dataBransoletkLancuszkowe = [
  { name: 'Bransoletka łańcuszkowa supełki', code: 'LAN/BR/SUPEL' },
  { name: 'Bransoletka łańcuszkowa nitka', code: 'LAN/BR/NITKA' },
  { name: 'Bransoletka łańcuszkowa wąż cienki', code: 'LAN/BR/WAZ/C' },
  { name: 'Bransoletka łańcuszkowa wąż gruby', code: 'LAN/BR/WAZ/G' },
  { name: 'Bransoletka łańcuszkowa cienka', code: 'LAN/BR/CIENKI' },
  { name: 'Bransoletka łańcuszkowa kulki', code: 'LANCUSZEK/K' },
  { name: 'łańcuszek ST Germain', code: 'LANCU/STGERM' },
  { name: 'Bransoletka łańcuszkowa 3 kulki', code: 'LAN/BR/TROJKI' },
];

let myScore = 0;
let maxScore = 0;
const myScoreSpan = document.getElementById('myScore');

let dataArr = [];

const quizContainer = document.getElementById('quiz');
const resetBtn = document.getElementById('reset');
const answerBtn = document.getElementById('answer');

let fourValArr = [];

//Functions

//array shuffle function
const shuffleArray = function (array) {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

//get array with values
const getFourVals = () => {
  shuffleArray(dataArr);
  fourValArr = [dataArr[0], dataArr[1], dataArr[2], dataArr[3]];
};

//append new values to mainContainer
const putNewVals = (array) => {
  //append html from threValArr
  const heading = document.createElement('h2');
  heading.innerHTML = `${array[0].code}`;
  shuffleArray(array);
  const answerBox = document.createElement('div');
  const checkName = (name) => (heading.innerHTML === name ? true : false);
  answerBox.innerHTML = `
  <button class="answer" value="${checkName(array[0].code)}">${
    array[0].name
  }</button>
  <button class="answer" value="${checkName(array[1].code)}">${
    array[1].name
  }</button>
  <button class="answer"value="${checkName(array[2].code)}">${
    array[2].name
  }</button>
  <button class="answer" value="${checkName(array[3].code)}">${
    array[3].name
  }</button>`;
  answerBox.classList.add('answer-box');
  quizContainer.appendChild(heading);
  quizContainer.appendChild(answerBox);
};

const makeBtnUnclickable = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].classList.add('disabled');
  }
};
const makeBorderOnCorrect = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].classList.add('disabled');
    if (answerBtns[i].value === 'true') {
      answerBtns[i].classList.add('border');
    } else {
      continue;
    }
  }
};

const addClickEvents = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener('click', function () {
      if (answerBtns[i].value === 'true') {
        answerBtns[i].classList.add('true');
        makeBtnUnclickable();
        myScore++;
      } else if (answerBtns[i].value === 'false') {
        answerBtns[i].classList.add('false');
        makeBorderOnCorrect();
        makeBtnUnclickable();
      }
    });
  }
};

//reset values on click
const resetQuiz = () => {
  const current = [
    document.querySelector('#quiz h2'),
    document.querySelector('.answer-box'),
  ];
  if (current[0] === null || current[0] === undefined) {
    getFourVals();
    putNewVals(fourValArr);
    const answerBtns = document.querySelectorAll('.answer');

    for (let i = 0; i < answerBtns.length; i++) {
      answerBtns[i].addEventListener('click', function () {
        if (answerBtns[i].value === 'true') {
          answerBtns[i].classList.add('true');
        } else if (answerBtns[i].value === 'false') {
          answerBtns[i].classList.add('false');
        }
      });
    }
  } else {
    maxScore++;
    myScoreSpan.innerText = Math.trunc((myScore / maxScore) * 100);
    document.getElementById(
      'questionsTotal'
    ).innerText = `${myScore}/${maxScore}`;
    current[0].remove();
    current[1].remove();
    getFourVals();
    putNewVals(fourValArr);
    addClickEvents();
  }
};
let anyChecked = false;
const createDataObject = () => {
  const check = document.querySelectorAll('.check');
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked === true) {
      if (check[i].name === 'pierscionki')
        dataArr = dataArr.concat(dataPierscionki);
      anyChecked = true;
      if (check[i].name === 'kolczyki') dataArr = dataArr.concat(dataKolczyki);
      anyChecked = true;
      if (check[i].name === 'elementy') dataArr = dataArr.concat(dataElementy);
      anyChecked = true;
      if (check[i].name === 'bransoletkiskora')
        dataArr = dataArr.concat(dataBransoletkiSkora);
      anyChecked = true;
      if (check[i].name === 'bransoletkizmini')
        dataArr = dataArr.concat(dataBransoletkiZmini);
      anyChecked = true;
      if (check[i].name === 'bransoletkisztywne')
        dataArr = dataArr.concat(dataBransoletkiSztywne);
      anyChecked = true;
      if (check[i].name === 'bransoletkilancuszkowe')
        dataArr = dataArr.concat(dataBransoletkLancuszkowe);
      anyChecked = true;
    } else {
      //continue;
    }
  }
  if (anyChecked === false) {
    alert('Check at least one value');
  } else {
    document.querySelector('.starter').classList.add('hidden');
    //call when object is dataObject is created
    getFourVals();
    resetQuiz();
    addClickEvents();
  }
};

const btnCreate = document.getElementById('create');

btnCreate.addEventListener('click', createDataObject);

//ŁOWCY CUDÓW => beczga
//wykop => rosja, yt
