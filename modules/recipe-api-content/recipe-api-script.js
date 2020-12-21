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

//get recipe
init.addEventListener('click', fetchApi);
