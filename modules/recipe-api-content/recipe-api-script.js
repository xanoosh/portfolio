'use strict';

const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const list = document.getElementById('list');
const init = document.getElementById('init');
const overlay = document.getElementById('overlay');
const apiKey = 'apiKey=2499488283dd4cf184a49913669669df';
let ingredientsArr = [];
let fetchResponse = {};
let dataUrl = '';

// construct url for API call
const createUrl = (mode) => {
  dataUrl = '';
  ingredientsArr = [];
  fetchResponse = {};
  if (mode === 'list') {
    //get data from form:
    const ingredients = '?ingredients=apples,+flour,+sugar';
    const numOfIngredients = '&number=2';
    dataUrl = `https://api.spoonacular.com/recipes/findByIngredients${ingredients}${numOfIngredients}&${apiKey}`;
  } else {
    //get data from buttons:
    dataUrl = `https://api.spoonacular.com/recipes/${mode}/information?${apiKey}`;
  }
};
// retrieve data from API
const fetchApi = () => {
  const request = async () => {
    const response = await fetch(dataUrl);
    const json = await response.json();
    console.log(json);
    fetchResponse = json;
    ingredientsArr = await json;
  };
  request();
};

const resetApi = () => {
  ingredientsArr = [];
  fetchResponse = {};
  dataUrl = '';
};

const createList = async () => {
  ingredientsArr.forEach((element) => {
    const image = document.createElement('img');
    image.src = element.image;
    const heading = document.createElement('h3');
    heading.innerText = element.title;
    const paragraph = document.createElement('p');
    paragraph.innerHTML = element.id;
    const button = document.createElement('button');
    button.innerText = 'Details';
    button.value = element.id;
    const container = document.createElement('div');
    container.classList.add('single');
    // container.classList.add('hidden');
    list.appendChild(container);
    container.appendChild(image);
    container.appendChild(heading);
    container.appendChild(button);
    button.addEventListener('click', initializeRecipe);
  });
};

const createModal = async () => {
  //create modal with data
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const link = document.createElement('a');
  // do something with fetchResponse object
  link.href = fetchResponse.sourceUrl;
  link.target = '_blank';
  link.innerText = 'Full recipe';
  link.classList.add('link');
  const summary = document.createElement('p');
  summary.innerHTML = fetchResponse.summary;
  overlay.appendChild(modal);
  modal.appendChild(summary);
  modal.appendChild(link);
};

function showHide(classname) {
  const toggleClass = (el) => {
    el.classList.toggle('hidden');
  };
  const nodes = document.getElementsByClassName(`${classname}`);
  if (nodes.length >= 2) {
    for (const node of nodes) {
      toggleClass(node);
    }
  } else {
    toggleClass(overlay);
  }
}
// create a list of recipes:
async function initializeList() {
  createUrl('list');
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  createList();
  setTimeout(list.classList.remove('hidden'), 4000);
  resetApi();
}
// create a single recipe modal:
async function initializeRecipe() {
  let thisId = this.value;
  createUrl(thisId);
  console.log(dataUrl);
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  createModal();
  setTimeout(showHide('modal'), 2000);
  resetApi();
}

//onclick get recipe
init.addEventListener('click', initializeList);
