'use strict';

const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const list = document.getElementById('list');
const init = document.getElementById('init');
const overlay = document.getElementById('overlay');
const numOfRecipesInput = document.getElementById('numOfRecipes');
// const allUsedCheckbox = document.getElementById('allUsed');
// const ingredientsDataCheckbox = document.getElementById('ingredientsData');
const radioMin = document.getElementById('radioMin');
const radioMax = document.getElementById('radioMax');
//ja
// const apiKey = 'apiKey=2499488283dd4cf184a49913669669df';
//basia
const apiKey = 'apiKey=17e683fbee834404b444c00c9c865f5d ';
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
    let ingredients = '';
    const ingNodes = document.querySelectorAll('#usedIngredients span');
    ingNodes.forEach((node) => {
      ingredients += `${node.getAttribute('value')},`;
    });
    // const ingredients = `?includeIngredients=${ingString}`;
    // const allUsed = allUsedCheckbox.checked
    //   ? `&sort=min-missing-ingredients&sortDirection=desc`
    //   : '';
    // const ingData = ingredientsDataCheckbox.checked
    //   ? `&fillIngredients=true`
    //   : '';

    // const allUsed = allUsedCheckbox.checked ? `&ranking=1` : `&ranking=2`;
    const minOrMax = radioMax.checked ? radioMax.value : radioMin.value;
    const howMany = `&number=${Number(numOfRecipesInput.value)}`;
    dataUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}${minOrMax}${howMany}&${apiKey}`;
    // dataUrl = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}${allUsed}&addRecipeInformation=true${ingData}${howMany}&${apiKey}`;
    console.log(dataUrl);
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
  //remove existing if exists
  const oldList = document.querySelectorAll('.single');
  if (oldList !== null || oldList !== undefined) {
    oldList.forEach((oldElement) => {
      oldElement.remove();
    });
    list.classList.toggle('hidden');
  }
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
    if (
      element.missedIngredients !== undefined &&
      element.missedIngredients.length !== 0
    ) {
      const missed = document.createElement('p');
      missed.classList.add('info');
      let missedHtml = '<b>Need to buy:</b> ';
      element.missedIngredients.forEach((item) => {
        missedHtml += `${item.name}, `;
      });
      missed.innerHTML = missedHtml;
      container.appendChild(missed);
    }
    if (
      element.unusedIngredients !== undefined &&
      element.unusedIngredients.length !== 0
    ) {
      const unused = document.createElement('p');
      unused.classList.add('info');
      let unusedHtml = '<b>Not used:</b> ';
      element.unusedIngredients.forEach((item) => {
        unusedHtml += `${item.name}, `;
      });
      unused.innerHTML = unusedHtml;
      container.appendChild(unused);
    }
    container.appendChild(button);
    button.addEventListener('click', initializeRecipe);
  });
};

const createModal = async () => {
  //create modal with data
  const modal = document.createElement('div');
  modal.classList.add('modal');
  //close modal
  const close = document.createElement('p');
  close.classList.add('modal-close');
  close.innerHTML = '&times;';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const link = document.createElement('a');
  // do something with fetchResponse object
  link.href = fetchResponse.sourceUrl;
  link.target = '_blank';
  link.innerText = 'Full recipe';
  link.classList.add('link');
  const summary = document.createElement('p');
  summary.innerHTML = fetchResponse.summary;
  summary.classList.add('summary');
  overlay.appendChild(modal);
  modal.appendChild(close);
  modal.appendChild(modalContent);
  modalContent.appendChild(summary);
  modalContent.appendChild(link);
  const removeModal = () => {
    modal.remove();
  };
  close.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    setTimeout(removeModal, 400);
  });
};

// adding ingredients to form data:

const usedIngredients = document.getElementById('usedIngredients');

const addIngredient = function () {
  const newName = this.innerText;
  const element = document.createElement('span');
  element.innerText = `${newName}, `;
  element.setAttribute('value', newName);
  usedIngredients.appendChild(element);
  element.addEventListener('click', element.remove);
};

const listOfIngredients = document.querySelectorAll('#ingredientsList button');
for (const el of listOfIngredients) {
  el.addEventListener('click', addIngredient.bind(el));
}

//remove span on click
const listOfUsedIngredients = document.querySelectorAll(
  '#usedIngredients span'
);

for (const el of listOfUsedIngredients) {
  el.addEventListener('click', el.remove);
}
// //remove span on click (and validate if ingredient is used or not)
// function remove() {
//   var element = this;
//   element.remove();
// }

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

//loading animation:
const toggleLoader = (parent) => {
  let element = document.getElementById('loading');
  if (element !== null && element !== undefined) {
    element.remove();
  } else {
    element = document.createElement('div');
    element.id = 'loading';
    parent.appendChild(element);
  }
};
// create a list of recipes:
async function initializeList() {
  // console.log();
  toggleLoader(this.parentNode);
  createUrl('list');
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  createList();
  setTimeout(list.classList.remove('hidden'), 4000);
  resetApi();
  toggleLoader(this.parentNode);
}
// create a single recipe modal:
async function initializeRecipe() {
  toggleLoader(this.parentNode);
  let thisId = this.value;
  createUrl(thisId);
  console.log(dataUrl);
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  createModal();
  setTimeout(showHide('modal'), 4000);
  resetApi();
  toggleLoader(this.parentNode);
}

//onclick get recipe
init.addEventListener('click', initializeList);
