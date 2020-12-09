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
//box for select
const boxes = document.querySelector('.boxes');
//variable for time value
let timeOutVar = '';
//iterate through quiz
let loopIteration = 0;
//score container
let myScore = 0;
//how many questions
let numberOfQuestions = 0;
//current Api response
let myResponse = {};
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
    myResponse = json;
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
    messageWin.innerHTML = `<span>${finalScore}%</span><p>Not Bad!</p>`;
  } else if (finalScore > 60 && finalScore <= 80) {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>Very nice!</p>`;
  } else if (finalScore > 80 && finalScore < 100) {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>Wow!</p>`;
  } else {
    messageWin.innerHTML = `<span>${finalScore}%</span><p>Dobre!</p>`;
  }
  winningScreen.appendChild(messageWin);
};
const alertResponse = () => {
  boxes.classList.add('alert');
  quizArray = [];
  quizUrl = '';
  loopIteration = 0;
  myScore = 0;
  numberOfQuestions = 0;
  initBtn.innerText = 'Start';
  initBtn.classList.toggle('loading');
};
const gameNew = () => {
  winningScreen.querySelector('h1').remove();
  quizArray = [];
  quizUrl = '';
  loopIteration = 0;
  myScore = 0;
  numberOfQuestions = 0;
  initBtn.innerText = 'Start';
  initBtn.classList.toggle('loading');
  winningScreen.classList.toggle('hidden');
  document.querySelector('.starter').classList.toggle('hidden');
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

nextBtn.addEventListener('click', gameReset);
restartBtn.addEventListener('click', gameNew);

//create new quizArray on click
initBtn.addEventListener('click', async () => {
  if (boxes.classList.contains('alert')) boxes.classList.remove('alert');
  fetchApi();
  initBtn.innerText = 'Loading';
  initBtn.classList.toggle('loading');
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  if (myResponse.response_code !== 0) {
    alertResponse();
  } else {
    numberOfQuestions = quizArray.length;
    document.querySelector('.starter').classList.toggle('hidden');
    console.log('Loaded data:');
    console.log(quizArray);
    //setTimeout(console.log(quizArray), 3000);
    gameLoop(quizArray[0]);
  }
});
