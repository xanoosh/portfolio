'use strict';

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
const listOfIngredients = document.querySelectorAll(
  '#ingredientsList .group-ingredients button'
);
const listOfUsedIngredients = document.querySelectorAll(
  '#usedIngredients span'
);
const usedIngredientsSet = new Set();

//set initial values of set
listOfUsedIngredients.forEach((ingredient) => {
  usedIngredientsSet.add(ingredient.getAttribute('value'));
});

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
  if (fetchResponse.dishTypes.length !== 0) {
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
  //close modal event
  const removeModal = () => {
    modal.remove();
  };
  close.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    setTimeout(removeModal, 400);
  });
  //show/hide summary data
  summary.addEventListener('click', () => {
    if (!summary.classList.contains('show')) {
      summary.classList.add('show');
    }
  });
};

// adding ingredients to form data:

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
  let nodeBefore = this.previousElementSibling;
  if (this.nextElementSibling) {
    this.remove();
    usedIngredientsSet.delete(this.getAttribute('value'));
  } else if (nodeBefore.className !== 'arrow') {
    nodeBefore.textContent = nodeBefore.textContent.slice(0, -2);
    this.remove();
    usedIngredientsSet.delete(this.getAttribute('value'));
  }
  checkIfUsed();
  console.log(usedIngredientsSet);
};
const addIngredient = function () {
  const newName = this.innerText;
  if (!usedIngredientsSet.has(newName)) {
    usedIngredientsSet.add(newName);
    const element = document.createElement('span');
    element.innerText = `${newName}, `;
    element.setAttribute('value', newName);
    usedIngredients.appendChild(element);
    element.previousElementSibling.textContent += `, `;
    element.textContent = usedIngredients.lastChild.textContent.slice(0, -2);
    element.addEventListener('click', removeIngredient);
    console.log(usedIngredientsSet);
  }
  checkIfUsed();
};

for (const el of listOfUsedIngredients) {
  el.addEventListener('click', removeIngredient);
}
for (const el of listOfIngredients) {
  el.addEventListener('click', addIngredient);
}

//show/hide categories of ingredients:
const barButtons = document.querySelectorAll('.bar');
//all group-ingredients children (groups)
const ingredientGroups = document.querySelectorAll('.group-ingredients .group');

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
  toggleLoader(this.parentNode);
}

//onclick get recipe
init.addEventListener('click', initializeList);
