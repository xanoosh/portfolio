'use strict';

//Variables

const data1of10 = [
  {
    name: '3*6 czyli 18',
    code: 'Ile nóg ma padalec?',
  },
  {
    name: 'Nikt',
    code: 'Kto mieszka w Londynie przy Downing street 10?',
  },
  {
    name: 'Stuart',
    code:
      'Jakim imieniem Odyseusz przedstawił się oślepionemu cyklopowi polifemowi?',
  },
  {
    name: 'Laskę',
    code: 'Kogo Aleksander Dumas?',
  },
  {
    name: 'Bolka i Lolka',
    code: 'Kogo Po śmierci Dobrawy poślubił Mieszko I?',
  },
  {
    name: 'Sasha Grey',
    code: 'Jak Robinson Cruzoe nazwał swojego koziołka?',
  },
  {
    name: 'Nikt. Mają rzeczy swoją miarę',
    code: 'Kto dowodził pierwszą udaną wyprawą dookoła Pana Wojciecha?',
  },
  {
    name: 'Jan Sebastian Bach',
    code: 'Kto jest wynalazcą dynamitu?',
  },
  {
    name: 'Kasjerka',
    code: 'Kto umierając powiedział "Reszta jest milczeniem."?',
  },
  {
    name: 'W chooy',
    code: 'Ile gwiazd mieści się w kosmosie?',
  },
  {
    name: 'W meczecie',
    code: 'Gdzie meczą muzłumańskie kozy?',
  },
  {
    name: 'Meskalina',
    code: 'Co wg Kabaretu starszych panów jest dobre na wszystko?',
  },
  {
    name: 'Zagrzeb',
    code: 'Które miasto jest stolicą Zombie?',
  },
  {
    name: 'Grzeszy',
    code: 'Co robi człowiek przed spowiedzią?',
  },
  {
    name: 'we wtorek',
    code: 'Kiedy nastąpił upadek cesarstwa zachodniorzymskiego?',
  },
  {
    name: 'Wyspiański',
    code: 'Kto jest autorem robinsona cruzoe?',
  },
  {
    name: 'Szwajcarsko-niemiecki lekarz Theophrastus Bombastus von Hohenheim',
    code: 'Kto jest groźnym robo-gadem wyglądem przypominającym człowieka?',
  },
  {
    name: 'Harley Davidson',
    code: 'Kto odkrył kometę Halleya?',
  },
  {
    name: 'Pluto to pies',
    code: 'Pluton stanowi część kompanii czy kompania jest częścią plutonu?',
  },
  {
    name: 'Elektryczność',
    code: 'Co jest źródłem światła w lampie LED?',
  },
  {
    name: 'Trzymają w ręce takie lampki no i nam świecą',
    code: 'Czy planetoidy są źródłami światła?',
  },
];

const dataRandom = [
  {
    name: 'Z wycieczki',
    code: 'Skąd wracają Litwini?',
  },
  {
    name: 'Szczytnym okazaniem braku szacunku drugiemu człowiekowi',
    code: 'Czym jest dekapitacja?',
  },
  {
    name: '***** ***',
    code: 'Call on me...',
  },
  {
    name: 'Owca/Lama',
    code: 'Więcej niż jedno zwierze to:',
  },
  {
    name: 'Jak księciunio',
    code: 'Jak upije się menel za 2 złote?',
  },
  {
    name: 'Chema mie najczęściej interesuje, nie podoba mi się!',
    code: 'Co pana najbardziej denerwuje?',
  },
  //hari pota
  {
    name: 'E-żyje',
    code: 'Gdzie Twoja mamusia, Potter?',
  },
  {
    name: 'Żałosna imitacja wieży astronomicznej',
    code: 'Hogwart:',
  },
  {
    name: 'Brawa',
    code: 'Co Dumbledore chce przed rozpoczęciem uczty?',
  },
  {
    name: 'Nie!',
    code: 'No, a ty ciągle tutaj?',
  },
  {
    name: 'Raz nie a raz nie. Wiesz, i tak miałem szczęście.',
    code: 'Bardzo cię boli, Draco?',
  },
  {
    name: 'Przykro mi z powodu twojego ojca chrzestnego.',
    code: 'Co zawsze powtarza matka Luny Lovegood?',
  },
  {
    name: 'Neville.',
    code: 'Musicie sobie wyobrazić kształt, który jest zabawny, na przykład...',
  },
  {
    name: 'Ty zostań i usuń troche kamieni, ja idę szukać Ginny.',
    code: 'Dobra i co teraz?',
  },
  {
    name: 'jednym z nas',
    code: '-Jest jednym z nas. -Czyli kim?',
  },
  {
    name: 'Vera Verto',
    code: '-Jakim zaklęciem zmieniamy zwierzęta w puchary na wódę?',
  },
  {
    name: 'peter pettigrew jest i pozostaje nadal... ojcem Harrego',
    code: 'Co jest najgorsze?',
  },
  {
    name: 'Gamoń',
    code: 'kto się obudził?',
  },
  {
    name: 'Potafił zmienić gwizdek w gwizdek, ewentualnie odwrotnie.',
    code: 'Co ,wg Alastora Moodiego potrafił cedric diggory w wieku harrego?',
  },
  {
    name: 'To zwyły, tępy osiłek.',
    code: 'Kim jest fleur delacour?',
  },
  {
    name: 'To orzech wskrzeszenia, przywołujący jednorożca zza grobu.',
    code: 'Czym było trzecie insygnium śmierci?',
  },
  {
    name: 'Dobrze znam nasze przepisy, Severusie.',
    code: 'Zrzucamy bakłażany, smażymy z dwóch stron',
  },
  {
    name: 'Sam-wiesz-kto, po tym jak Dumbledore zabił tego biedaka Cedrica.',
    code: 'Kto polecił pani Figg mieć oko na Harrego?',
  },
  {
    name: 'Super, harry!',
    code:
      'W szkole, gdy kumpel umiera na waszych oczach... wiecie jak to jest.',
  },
  {
    name: 'Postanowili się zabić',
    code:
      'Co postanowili potterowie, gdy znaleźli się w śmiertelnym niebezpieczeństwie?',
  },
];

const dataX = [
  {
    name: 'x',
    code: 'x',
  },
  {
    name: 'x',
    code: 'x',
  },
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
  quizContainer.classList.add('animate');
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
    quizContainer.classList.toggle('animate');
    quizContainer.classList.toggle('animate');
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
    quizContainer.classList.toggle('animate');
    quizContainer.classList.toggle('animate');
  }
  setTimeout(resetQuiz, 8000);
};
//
let anyChecked = false;
const createDataObject = () => {
  const check = document.querySelectorAll('.check');
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked === true) {
      if (check[i].name === '1of10') dataArr = dataArr.concat(data1of10);
      anyChecked = true;
      if (check[i].name === 'random') dataArr = dataArr.concat(dataRandom);
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
    //quizContainer.classList.add('animate');
  }
};

const btnCreate = document.getElementById('create');

btnCreate.addEventListener('click', createDataObject);

//ŁOWCY CUDÓW => beczga
//wykop => rosja, yt
