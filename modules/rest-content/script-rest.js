'use strict';

const quizContainer = document.getElementById('quiz');

//full questions array
let quizArray = [];
//API url
let quizUrl = '';
//Initialize btn
const initBtn = document.getElementById('create');
//btn next question
const nextBtn = document.getElementById('next');
//score tracker during game
const myScoreSpan = document.getElementById('myScore');
//final score container
const winningScreen = document.getElementById('winning-screen');
//button reset whole game
const restartBtn = document.getElementById('restart');
//variable for time value
let timeOutVar = '';
//iterate through quiz
let loopIteration = 0;
//score container
let myScore = 0;
//how many questions
let numberOfQuestions = 0;

// function for retrieving data from API
const fetchApi = () => {
  //reset url value on function call
  quizUrl = '';
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  quizUrl = `https://opentdb.com/api.php?${amount}${category}${difficulty}&type=multiple`;

  const request = async () => {
    const response = await fetch(quizUrl);
    const json = await response.json();
    console.log(json);
    quizArray = await json.results;
  };
  request();
};

//create or remove timer bar
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

//create question&answer nodes
const gameLoop = (arrayEl) => {
  toggleTimer();
  clearTimeout(timeOutVar);
  const heading = document.createElement('h2');
  const questionNumber = document.createElement('p');
  const answerBox = document.createElement('div');
  answerBox.classList.add('answer-box');
  questionNumber.classList.add('question-number');
  heading.innerHTML = `${arrayEl.question}`;
  let answers = [arrayEl.correct_answer].concat(arrayEl.incorrect_answers);
  shuffleArray(answers);
  const checkName = (name) => (arrayEl.correct_answer === name ? true : false);
  for (let i = 0; i < answers.length; i++) {
    answerBox.innerHTML += `<button class="answer" value="${checkName(
      answers[i]
    )}">${answers[i]}</button>`;
  }
  questionNumber.innerText = `${loopIteration + 1}.`;
  quizContainer.appendChild(questionNumber);
  quizContainer.appendChild(heading);
  quizContainer.appendChild(answerBox);
  addClickEvents();
  timeOutVar = setTimeout(gameReset, 12000);
};

//reset values after loop iteration
const gameReset = () => {
  toggleTimer();
  loopIteration++;
  clearTimeout(timeOutVar);
  const current = [
    document.querySelector('#quiz h2'),
    document.querySelector('.answer-box'),
    document.querySelector('#quiz p'),
  ];
  current[0].remove();
  current[1].remove();
  current[2].remove();
  quizArray.shift();
  quizArray.length === 0 ? gameEnd() : gameLoop(quizArray[0]);
};

const gameEnd = () => {
  clearTimeout(timeOutVar);
  winningScreen.classList.toggle('hidden');
  const finalScore = Math.trunc((myScore / numberOfQuestions) * 100);
  const messageWin = document.createElement('h1');
  if (finalScore <= 40) {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>keep practising</p>`;
  } else if (finalScore <= 50 && finalScore > 40) {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>getting better</p>`;
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

const gameNew = () => {
  console.log('gonna reset some values');
};

//click events for quiz answers
const addClickEvents = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener('click', function () {
      if (answerBtns[i].value === 'true') {
        answerBtns[i].classList.add('true');
        answerBtns.forEach((btn) => {
          btn.classList.add('disabled');
        });
        myScore++;
        myScoreSpan.innerText = Math.trunc((myScore / numberOfQuestions) * 100);
      } else if (answerBtns[i].value === 'false') {
        answerBtns[i].classList.add('false');
        document.querySelector('.answer[value="true"]').classList.add('border');
        answerBtns.forEach((btn) => {
          btn.classList.add('disabled');
        });
      }
    });
  }
};

//New set of questions on click
nextBtn.addEventListener('click', gameReset);

restartBtn.addEventListener('click', gameNew);

//create new quizArray on click
initBtn.addEventListener('click', async () => {
  fetchApi();
  initBtn.innerText = 'Loading';
  initBtn.classList.add('loading');
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  numberOfQuestions = quizArray.length;
  document.querySelector('.starter').classList.add('hidden');
  console.log('Loaded data:');
  console.log(quizArray);
  //setTimeout(console.log(quizArray), 3000);
  gameLoop(quizArray[0]);
});

//To do:
// -reset values in gameNew function to
// -handle API errors (no data Available in alert box or something)
