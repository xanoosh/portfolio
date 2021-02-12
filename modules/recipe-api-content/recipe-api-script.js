'use strict';

const body = document.querySelector('body');
const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const list = document.getElementById('list');
const init = document.getElementById('init');
const overlay = document.getElementById('overlay');
const numOfRecipesInput = document.getElementById('numOfRecipes');
const radioMin = document.getElementById('radioMin');
const radioMax = document.getElementById('radioMax');
//ja
const apiKey = 'apiKey=2499488283dd4cf184a49913669669df';
//basia
// const apiKey = 'apiKey=17e683fbee834404b444c00c9c865f5d ';
let responseArr = [];
let fetchResponse = {};
let dataUrl = '';
const usedIngredients = document.getElementById('usedIngredients');
const ingredientsWindow = document.getElementById('ingredientsWindow');
const listOfIngredients = document.querySelectorAll(
  '#ingredientsList .group-ingredients button'
);
const listOfUsedIngredients = document.querySelectorAll(
  '#usedIngredients #ingredientsWindow button'
);
const usedIngredientsSet = new Set();
const scrollers = document.querySelectorAll('.scroll');
//set initial values of set
listOfUsedIngredients.forEach((ingredient) => {
  usedIngredientsSet.add(ingredient.getAttribute('value'));
});
// tablist variables
const barButtons = document.querySelectorAll('.bar');
const ingredientGroups = document.querySelectorAll('.group-ingredients .group');

//scroll animation for mobile
const scrollToEl = function () {
  if (this.textContent !== 'Back') {
    document.querySelector('#list .scroll').classList.remove('hidden');
  } else {
    this.classList.add('hidden');
  }

  const target = document.getElementById(this.value);
  target.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
};
for (const button of scrollers) {
  button.addEventListener('click', scrollToEl);
}

// construct url for API call
const createUrl = (mode) => {
  dataUrl = '';
  responseArr = [];
  fetchResponse = {};
  if (mode === 'list') {
    let ingredients = [...usedIngredientsSet].join(',');
    const minOrMax = radioMax.checked ? radioMax.value : radioMin.value;
    const howMany = `&number=${Number(numOfRecipesInput.value)}`;
    dataUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}${minOrMax}${howMany}&${apiKey}`;
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
    responseArr = await json;
  };
  request();
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
  responseArr.forEach((element) => {
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
    // if (
    //   element.unusedIngredients !== undefined &&
    //   element.unusedIngredients.length !== 0
    // ) {
    //   const unused = document.createElement('p');
    //   unused.classList.add('info');
    //   let unusedHtml = '<b>Not used:</b> ';
    //   element.unusedIngredients.forEach((item) => {
    //     unusedHtml += `${item.name}, `;
    //   });
    //   unused.innerHTML = unusedHtml;
    //   container.appendChild(unused);
    // }
    container.appendChild(button);
    button.addEventListener('click', initializeRecipe);
  });
};

const createModal = async () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  //close modal
  const close = document.createElement('p');
  close.classList.add('modal-close');
  close.innerHTML = '&times;';
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const link = document.createElement('a');
  link.href = fetchResponse.sourceUrl;
  link.target = '_blank';
  link.innerText = 'Full recipe';
  link.classList.add('link');
  const summaryTitle = document.createElement('h3');
  summaryTitle.innerText = 'Summary';
  const summarySmall = document.createElement('small');
  summarySmall.innerText = 'click below to expand';
  summarySmall.classList.add('arrow');
  const summary = document.createElement('span');
  summary.innerHTML = fetchResponse.summary;
  summary.classList.add('summary');
  const title = document.createElement('h3');
  title.innerText = fetchResponse.title;
  overlay.appendChild(modal);
  modal.appendChild(close);
  modal.appendChild(modalContent);
  modalContent.appendChild(title);
  //dish type
  if (fetchResponse.dishTypes && fetchResponse.dishTypes.length !== 0) {
    const dishTypes = document.createElement('small');
    if (fetchResponse.dishTypes.length > 1) {
      let dishText = '';
      fetchResponse.dishTypes.forEach((type) => {
        dishText += `${type}/`;
      });
      dishTypes.innerText = `(${dishText.slice(0, -1)})`;
    } else {
      dishTypes.innerText = `(${fetchResponse.dishTypes[0]})`;
    }
    modalContent.appendChild(dishTypes);
  }
  //list of ingredients
  if (fetchResponse.extendedIngredients) {
    const ingredientList = document.createElement('ul');
    ingredientList.innerHTML = `<h4>Ingredients list:</h4>`;
    fetchResponse.extendedIngredients.forEach((element) => {
      ingredientList.innerHTML += `<li>${element.name}</li>`;
    });
    modalContent.appendChild(ingredientList);
  }
  //checkList - meal type
  const checkList = document.createElement('ul');
  let checkListInner = '';
  const checkInLi = '<i>&#10004;</i>';
  checkList.classList.add('checkList');
  const vegetarian = fetchResponse.vegetarian;
  const vegan = fetchResponse.vegan;
  const glutenFree = fetchResponse.glutenFree;
  const dairyFree = fetchResponse.dairyFree;
  if (vegetarian && vegetarian === true) {
    checkListInner += `<li>${checkInLi} Vegetarian</li>`;
  }
  if (vegan && vegan === true) {
    checkListInner += `<li>${checkInLi} Vegan</li>`;
  }
  if (glutenFree && glutenFree === true) {
    checkListInner += `<li>${checkInLi} Gluten Free</li>`;
  }
  if (dairyFree && dairyFree === true) {
    checkListInner += `<li>${checkInLi} Dairy Free</li>`;
  }
  checkList.innerHTML = checkListInner;
  if (checkListInner.length > 0) {
    modalContent.appendChild(checkList);
  }
  //summary
  modalContent.appendChild(summaryTitle);
  modalContent.appendChild(summarySmall);
  modalContent.appendChild(summary);
  //optional instructions
  if (fetchResponse.instructions) {
    const instructionsTitle = document.createElement('h3');
    const instructions = document.createElement('span');
    const instructionsSmall = summarySmall.cloneNode(true);
    instructionsTitle.innerText = 'Instructions';
    instructionsTitle.classList.add('instructions');
    instructions.innerHTML = fetchResponse.instructions;
    modalContent.appendChild(instructionsTitle);
    modalContent.appendChild(instructionsSmall);
    modalContent.appendChild(instructions);

    instructions.addEventListener('click', () => {
      if (!instructions.classList.contains('show')) {
        instructions.classList.add('show');
      }
    });
  }
  modalContent.appendChild(link);
  close.addEventListener('click', function () {
    overlay.classList.toggle('hidden');
    setTimeout(this.parentElement.remove(), 400);
  });
  summary.addEventListener('click', () => {
    if (!summary.classList.contains('show')) {
      summary.classList.add('show');
    }
  });
};

// adding ingredients to set + validation:
const checkIfUsed = function () {
  listOfIngredients.forEach((ingredient) => {
    if (usedIngredientsSet.has(ingredient.textContent)) {
      ingredient.classList.add('used');
    } else {
      ingredient.classList.remove('used');
    }
  });
};
checkIfUsed();
const removeIngredient = function () {
  if (this.nextElementSibling || this.previousElementSibling) {
    this.remove();
    usedIngredientsSet.delete(this.getAttribute('value'));
  } else {
    this.remove();
    usedIngredientsSet.delete(this.getAttribute('value'));
    init.classList.add('inactive');
  }
  checkIfUsed();
};
const addIngredient = function () {
  init.classList.remove('inactive');
  const newName = this.innerText;
  if (!usedIngredientsSet.has(newName)) {
    usedIngredientsSet.add(newName);
    const element = document.createElement('button');
    element.innerText = `${newName}`;
    // element.setAttribute('value', newName);
    element.value = newName;
    ingredientsWindow.appendChild(element);
    element.addEventListener('click', removeIngredient);
  }
  checkIfUsed();
};

for (const el of listOfUsedIngredients) {
  el.addEventListener('click', removeIngredient);
}
for (const el of listOfIngredients) {
  el.addEventListener('click', addIngredient);
}
//tablist mechanizm
const selectGroup = function () {
  barButtons.forEach((button) => {
    button.classList.remove('active');
  });
  this.classList.add('active');
  ingredientGroups.forEach((group) => {
    if (group.classList.contains(this.value)) {
      group.classList.add('active');
    } else {
      group.classList.remove('active');
    }
  });
};
for (const button of barButtons) {
  button.addEventListener('click', selectGroup);
}
//toggle hidden
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
const toggleLoader = () => {
  overlay.classList.toggle('hidden');
  let element = document.getElementById('loading');
  if (element !== null && element !== undefined) {
    element.remove();
  } else {
    element = document.createElement('div');
    element.id = 'loading';
    overlay.appendChild(element);
  }
};
// create a list of recipes:
async function initializeList() {
  toggleLoader();
  createUrl('list');
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  createList();
  setTimeout(list.classList.remove('hidden'), 4000);
  toggleLoader();
}
// create a single recipe modal:
async function initializeRecipe() {
  toggleLoader();
  let thisId = this.value;
  createUrl(thisId);
  console.log(dataUrl);
  fetchApi();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  createModal();
  setTimeout(showHide('modal'), 4000);
  toggleLoader();
}

//search input
let searchInputArray = [];
let autoList = [];
//list of all ingredients to use

function updateSearchData() {
  searchInputArray = [];
  const dataButtons = document.querySelectorAll(
    '#ingredientsList .group-ingredients button:not(.used)'
  );
  dataButtons.forEach((ingredient) => {
    // console.log(ingredient);
    searchInputArray.push(ingredient.innerText);
  });
  searchInputArray.sort();
}

updateSearchData();

//copied start

const searchInput = document.querySelector('.autocomplete-input');
const searchList = document.querySelector('.autocomplete-list');

function createSearchList() {
  const elExists = searchList.querySelector('ul');
  if (elExists !== null) {
    elExists.remove();
  }
  const text = this.value;
  autoList = [];
  updateSearchData();
  if (text.length > 0) {
    let counter = 0;
    let arrValue = 0;
    while (counter < 5 && arrValue < searchInputArray.length) {
      if (
        searchInputArray[arrValue].toLowerCase().startsWith(text.toLowerCase())
      ) {
        autoList.push(searchInputArray[arrValue]);
        counter++;
      }
      arrValue++;
    }
  }
  if (autoList.length > 0) {
    const suggestions = document.createElement('ul');
    autoList.forEach((el) => {
      suggestions.innerHTML += `<li>${el}</li>`;
    });
    searchList.appendChild(suggestions);
    const listElements = searchList.querySelectorAll('li');
    listElements.forEach((el) => {
      el.addEventListener('click', hideList);
      el.addEventListener('click', addIngredient);
    });
  }
}

function hideList() {
  const element = searchList.querySelector('ul');
  if (element !== null) {
    searchList.querySelector('ul').remove();
    searchInput.value = '';
  }
  // if (body.classList.hasClass('fix')) {
  //   body.classList.remove('fix');
  // }
}

//create list below input:
searchInput.addEventListener('input', createSearchList);
searchInput.addEventListener('click', createSearchList);

//onclick get recipe
init.addEventListener('click', initializeList);

//workaround virtual keyboard on mobile (content jumping) :
function toggleFix() {
  body.classList.toggle('fix');
}
searchInput.addEventListener('focus', toggleFix);
searchInput.addEventListener('blur', toggleFix);
