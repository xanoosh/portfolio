'use strict';

const main = document.getElementById('main');
const init = document.getElementById('init');
const apiKey = '&apiKey=2499488283dd4cf184a49913669669df';
let ingredientsArr = [];
let fetchResponse = {};
let dataUrl = '';

// function for retrieving data from API
const fetchApi = () => {
  dataUrl = '';
  //find a way to construct ingredients string from array
  //include value for number
  const ingredients = '?ingredients=apples,+flour,+sugar';
  const numOfIngredients = '&number=2';
  dataUrl = `https://api.spoonacular.com/recipes/findByIngredients${ingredients}${numOfIngredients}${apiKey}`;
  const request = async () => {
    const response = await fetch(dataUrl);
    const json = await response.json();
    console.log(json);
    fetchResponse = json;
    ingredientsArr = await json;
  };
  request();
};

const createList = async () => {
  ingredientsArr.forEach((element) => {
    const image = document.createElement('img');
    image.src = element.image;
    const heading = document.createElement('h3');
    heading.innerText = element.title;
    const paragraph = document.createElement('p');
    paragraph.innerHTML = element.id;
    const container = document.createElement('div');
    container.classList.add('single');
    main.appendChild(container);
    container.appendChild(image);
    container.appendChild(heading);
    container.appendChild(paragraph);
  });
};

function initialize() {
  fetchApi();
  createList();
}

//onclick get recipe
init.addEventListener('click', initialize);
