'use strict';

const quizContainer = document.getElementById('quiz');

//full questions array
let quizArray = [];
//API url
let quizUrl = '';
//Initialize btn
const initBtn = document.getElementById('create');
//variable for time value
let timeOutVar = '';

// function for API url generation:
const generateUrl = () => {
  //reset url value on function call
  quizUrl = '';
  //Example https://opentdb.com/api.php?amount=10&category=10&difficulty=medium
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  quizUrl = `https://opentdb.com/api.php?${amount}${category}${difficulty}&type=multiple`;
};

// function for retrieving data from API
const getApiData = (dataUrl) => {
  //reset questions on call
  quizArray = [];
  const request = new XMLHttpRequest();
  request.open('GET', dataUrl, true);
  request.onload = function () {
    const data = JSON.parse(request.response);
    // let i = 1;
    if (data.response_code === 0) {
      let i = 0;
      data.results.forEach((iteration) => {
        let questionObject = {};
        questionObject.question = iteration.question;
        questionObject.correct = iteration.correct_answer;
        questionObject.incorrect = [
          iteration.incorrect_answers[0],
          iteration.incorrect_answers[1],
          iteration.incorrect_answers[2],
        ];
        quizArray[i] = questionObject;
        i++;
        gameLoop(questionObject);
      });
    } else {
      alert(`Couldn't load Api data. \nPlease change quiz parameters`);
    }
  };
  console.log('done');
  console.log(Array.isArray(quizArray));
  console.log(quizArray);
  request.send();
};

//create timer bar
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

//create new quizArray on click
initBtn.addEventListener('click', () => {
  generateUrl();
  getApiData(quizUrl);
  document.querySelector('.starter').classList.add('hidden');
  console.log('zupa');
  console.log(quizArray.length);
  console.log(quizArray);
  //setTimeout(console.log(quizArray), 3000);
  const myobj = [
    {
      correct_answer: 'elo',
      incorrect_answers: [1, 2, 3],
      question: 'elo',
    },
  ];
  toggleTimer();
  //gameLoop(quizArray);
});

//create questions front-end

const gameLoop = (arrayEl) => {
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
  quizContainer.appendChild(questionNumber);
  quizContainer.appendChild(heading);
  quizContainer.appendChild(answerBox);
  quizArray.shift();
  toggleTimer();
  toggleTimer();
  // maxScore === 20 ? winFunction() : (timeOutVar = setTimeout(resetQuiz, 9000));
  // timeOutVar = setTimeout(gameLoop, 9000);
};
