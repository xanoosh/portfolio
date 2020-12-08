'use strict';

const root = document.getElementById('root');

//full questions array
let quizArray = [];
//API url
let quizUrl = '';
//Initialize btn
const initBtn = document.getElementById('create');

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
      data.results.forEach((iteration) => {
        let questionObject = {};
        questionObject.question = iteration.question;
        questionObject.correct = iteration.correct_answer;
        questionObject.incorrect = [
          iteration.incorrect_answers[0],
          iteration.incorrect_answers[1],
          iteration.incorrect_answers[2],
        ];
        quizArray.push(questionObject);
      });
    } else {
      alert(`Couldn't load Api data. \nPlease change quiz parameters`);
    }
  };
  request.send();
  // show quizArray
  console.log(quizArray);
};

//create new quizArray on click
initBtn.addEventListener('click', () => {
  generateUrl();
  getApiData(quizUrl);
});
