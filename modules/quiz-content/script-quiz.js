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
  {
    name: 'trzy',
    code: 'Ile razy szatan ograł jezusa w hokeju na trawie?',
  },
  {
    name: 'Z ropy naftowej',
    code: 'Z którego surowca mineralnego jest produkowana coca-cola?',
  },
  {
    name: 'żerują na liściach, a ich larwy żerują na korzeniach',
    code: 'Czy pan jacek, pan arkadiusz i pan wociech są szkodnikami?',
  },
  {
    name: 'Raczej nie...',
    code: 'Kto jest założycielem zamościa? Ja?',
  },
  {
    name: 'Edward Rydz-Śmigły',
    code: 'kto dowodził armią gotów w roku 410?',
  },
  {
    name: 'Węże mają tak krótkie łapki że nie mają zdolności chodzenia',
    code: 'Czy węże potrafią chodzić?',
  },
  {
    name: 'drogę do domu',
    code: 'Co zgubił kopciuszek podczas ucieczki z balu?',
  },
  {
    name: '312',
    code: 'Ile dni ma sierpień? (Można się pomylic o rok)',
  },
  {
    name: 'Harrison Ford',
    code: 'Kto widnieje w herbie warszawy?',
  },
  {
    name: 'Matematykę',
    code: 'Co należy kuć, póki gorące?',
  },
  {
    name: 'Reymont',
    code: 'Co władysław robi w budowlance?',
  },
  {
    name: 'Wąż',
    code: 'Jakie zwierze zawsze spada na 4 łapy?',
  },
  {
    name: 'Siano',
    code: 'Dokończ powiedzenie. Jaka praca, takie...',
  },
  {
    name: 'Doopie',
    code: 'W wierszu jana brzechwy, tytułowy leń siedzi na...',
  },
  {
    name: '0',
    code: 'W jakim wieku urodził się Kazimierz Przerwa-tetmajer?',
  },
  {
    name: 'Musztardą',
    code: 'Czym żywił się minotaur zamknięty w labiryncie?',
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
];

const dataHarry = [
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
    name: 'tak',
    code: 'Czy harry wie jak to jest, gdy się tak leży codziennie?',
  },
  {
    name: 'Kim jestem?',
    code: 'Posłuchaj "tylko harry", jesteś czarodziejem',
  },
  {
    name: 'Jaasne',
    code: 'Ron tu był? nic mu nie jest? Hermiona żyje?',
  },
  {
    name: 'Gamoń',
    code: 'kto się obudził?',
  },
  {
    name: 'Potafił zmienić gwizdek w gwizdek, ewentualnie odwrotnie.',
    code: 'Co, wg Alastora Moodiego potrafił cedric diggory w wieku harrego?',
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
  {
    name: 'Dziewięć!',
    code: 'Ile artur wesley miał interwencji w nocy?',
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

//variable for time value
let timeOutVar = '';

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
  const questionNumber = document.createElement('p');
  heading.innerHTML = `${array[0].code}`;
  questionNumber.innerHTML = `${maxScore + 1}.`;
  shuffleArray(array);
  const answerBox = document.createElement('div');
  const checkName = (name) => (heading.innerHTML === name ? true : false);

  for (let i = 0; i < array.length; i++) {
    answerBox.innerHTML += `<button class="answer" value="${checkName(
      array[i].code
    )}">${array[i].name}</button>`;
  }
  answerBox.classList.add('answer-box');
  quizContainer.appendChild(questionNumber);
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

const toggleTimer = () => {
  const exist = document.querySelector('.timer');
  if (exist === null || exist === undefined) {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    quizContainer.appendChild(timer);
  } else {
    document.querySelector('.timer').remove();
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

//const animate = () => {};

//reset question and button in a loop
const resetQuiz = () => {
  // timeOutVar = setTimeout(resetQuiz, 9000);
  clearTimeout(timeOutVar);
  //quizContainer.classList.add('animate');
  const current = [
    document.querySelector('#quiz h2'),
    document.querySelector('.answer-box'),
    document.querySelector('#quiz p'),
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
    toggleTimer();
    toggleTimer();
  } else {
    maxScore++;
    myScoreSpan.innerText = Math.trunc((myScore / maxScore) * 100);
    document.getElementById('questionsTotal').innerText = `${myScore}/20`;
    current[0].remove();
    current[1].remove();
    current[2].remove();
    getFourVals();
    putNewVals(fourValArr);
    addClickEvents();
    toggleTimer();
    toggleTimer();
  }
  maxScore === 20 ? winFunction() : (timeOutVar = setTimeout(resetQuiz, 9000));
};

const restartBtn = document.getElementById('restart');
console.log(restartBtn);

restartBtn.addEventListener('click', function () {
  myScore = 0;
  maxScore = 0;
  document.querySelector('#quiz h2').remove();
  document.querySelector('#quiz p').remove();
  document.querySelector('.answer-box').remove();
  //document.querySelector('#quiz h2').style.opacity = 0;
  //document.querySelector('#quiz .answer-box').style.opacity = 0;
  document.querySelector('#quiz .scoreFinal').style.opacity = 0;
  document.querySelector('#quiz .scorePoint').style.opacity = 0;
  winningScreen.classList.toggle('hidden');
  document.querySelector('.starter').classList.remove('hidden');
  document.querySelector('#winning-screen h1').remove();
  clearTimeout(timeOutVar);
  // winningScreen.classList.toggle('bg');
});

const winningScreen = document.getElementById('winning-screen');
const winFunction = () => {
  // winningScreen.classList.toggle('bg');
  winningScreen.classList.toggle('hidden');
  toggleTimer();
  const finalScore = Math.trunc((myScore / maxScore) * 100);
  const messageWin = document.createElement('h1');
  if (finalScore <= 50) {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>Try watching more youtube videos</p>`;
  } else if (finalScore <= 60 && finalScore > 50) {
    messageWin.innerHTML = `${finalScore}%<br/>Not Bad!`;
  } else if (finalScore > 60 && finalScore <= 80) {
    messageWin.innerHTML = `${finalScore}%<br/>Very nice!`;
  } else if (finalScore > 80 && finalScore < 100) {
    messageWin.innerHTML = `${finalScore}%<br/>Wow!`;
  } else {
    messageWin.innerHTML = `${finalScore}%<br/>Dobre!`;
  }
  winningScreen.appendChild(messageWin);
};

//
let anyChecked = false;
const createDataObject = () => {
  dataArr = [];
  const check = document.querySelectorAll('.check');
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked === true) {
      if (check[i].name === '1of10') dataArr = dataArr.concat(data1of10);
      anyChecked = true;
      if (check[i].name === 'harry') dataArr = dataArr.concat(dataHarry);
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
    myScoreSpan.innerText = 0;
    document.getElementById('questionsTotal').innerText = `0/20`;
    getFourVals();
    resetQuiz();
    addClickEvents();
    // document.querySelector('#quiz h2').style.opacity = 1;
    // document.querySelector('#quiz .answer-box').style.opacity = 1;
    document.querySelector('#quiz .scoreFinal').style.opacity = 1;
    document.querySelector('#quiz .scorePoint').style.opacity = 1;
  }
  toggleTimer();
};

const btnCreate = document.getElementById('create');

btnCreate.addEventListener('click', createDataObject);

//ŁOWCY CUDÓW => beczga
//wykop => rosja, yt
