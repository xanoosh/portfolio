'use strict';

console.log('Connection established');

//Function for random number generation
const randomNumberBetween = function (a, b) {
  const numSpace = b - a + 1;
  const random = Math.floor(Math.random() * numSpace);
  return random + a;
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

//how to remove specific element from array
// const arrayTest = ['a', 'b', 'c', 'd'];
// console.log(arrayTest);
// arrayTest.splice(0, 1);
// console.log(arrayTest);

//Function for declaring random values for resources
let resourcesArray = [];
const declareValues = function () {
  let steelNumber = randomNumberBetween(8, 15);
  let titaniumNumber = randomNumberBetween(4, 8);
  let cardNumber = randomNumberBetween(3, 7);
  let plantNumber = randomNumberBetween(25, 40);
  let heatNumber = randomNumberBetween(0, 10);
  resourcesArray = [
    steelNumber,
    titaniumNumber,
    cardNumber,
    plantNumber,
    heatNumber,
  ];
  return resourcesArray;
};
declareValues();

//Object with resources data.
//Create this object INSIDE main map generating function
const resourcesForMap = {
  aResourcesSetter: function () {
    //sum of resources for testing
    let sumOfTestValues = resourcesArray.reduce((a, b) => a + b, 0);
    //randomize numbers until they meet the condition
    while (sumOfTestValues < 38 && sumOfTestValues > 74) {
      declareValues();
    }
    (this.steel = resourcesArray[0]),
      (this.titanium = resourcesArray[1]),
      (this.card = resourcesArray[2]),
      (this.plant = resourcesArray[3]),
      (this.heat = resourcesArray[4]);
  },
};
//calling its method to set final resources values
resourcesForMap.aResourcesSetter();

//Create array for every resource
//all resources one per array element
const resourcesList = [];
//array containing 1 2 or no resource per element
//each element represents tile on map
const resourcesListFinal = [];
const createArrayOfResources = function () {
  for (let i = 0; i < resourcesForMap.steel; i++) {
    resourcesList.push('steel');
  }
  for (let i = 0; i < resourcesForMap.titanium; i++) {
    resourcesList.push('titanium');
  }
  for (let i = 0; i < resourcesForMap.card; i++) {
    resourcesList.push('card');
  }
  for (let i = 0; i < resourcesForMap.plant; i++) {
    resourcesList.push('plant');
  }
  for (let i = 0; i < resourcesForMap.heat; i++) {
    resourcesList.push('heat');
  }
  //shuffle resources array
  shuffleArray(resourcesList);

  //now iterate through resources, create 61 values with 2 1 and 0 resources
  let loopLength = 61;
  const resourcesLength = resourcesList.length;
  //console.log(resourcesList);
  //console.log(`${resourcesLength} length of list`);
  let numberOfDoubleResourcesSparce = 6;
  let numberOfDoubleResourcesAbundant = 13;
  while (loopLength > 0) {
    if (resourcesLength >= 34 && resourcesLength <= 48) {
      //need 6*2resources rest is one and none
      if (numberOfDoubleResourcesSparce > 0) {
        resourcesListFinal.push(`${resourcesList[0]}, ${resourcesList[1]}`);
        resourcesList.splice(0, 1);
        resourcesList.splice(0, 1);
      } else if (
        (numberOfDoubleResourcesSparce = 0 && resourcesList.length > 0)
      ) {
        resourcesListFinal.push(resourcesList[0]);
        resourcesList.splice(0, 1);
      } else if (resourcesList.length === 0) {
        resourcesListFinal.push('');
      }
    } else {
      //need 10*2resources rest is one and none
      if (numberOfDoubleResourcesAbundant > 0) {
        resourcesListFinal.push(`${resourcesList[0]}, ${resourcesList[1]}`);
        resourcesList.splice(0, 1);
        resourcesList.splice(0, 1);
      } else if (
        numberOfDoubleResourcesAbundant === 0 &&
        resourcesList.length > 0
      ) {
        resourcesListFinal.push(resourcesList[0]);
        resourcesList.splice(0, 1);
      } else if (resourcesList.length == 0) {
        resourcesListFinal.push('');
      }
    }
    numberOfDoubleResourcesSparce > 0
      ? numberOfDoubleResourcesSparce--
      : (numberOfDoubleResourcesSparce = 0);
    numberOfDoubleResourcesAbundant > 0
      ? numberOfDoubleResourcesAbundant--
      : (numberOfDoubleResourcesAbundant = 0);
    loopLength--;
  }
  shuffleArray(resourcesListFinal);
  return resourcesListFinal;
};
//calling a function
createArrayOfResources();

//Object for map tiles values
const tilesForMap = {
  water: 12,
  mars: 48,
  noctis: 1,
};

//Create an array for every tile
const tilesListFinal = [];
const createArrayOfTiles = function () {
  for (let i = 0; i < tilesForMap.water; i++) {
    tilesListFinal.push('water');
  }
  for (let i = 0; i < tilesForMap.mars; i++) {
    tilesListFinal.push('mars');
  }
  for (let i = 0; i < tilesForMap.noctis; i++) {
    tilesListFinal.push('noctis');
  }
  shuffleArray(tilesListFinal);
  return tilesListFinal;
};
//calling a function
createArrayOfTiles();

console.log('Recources object and shuffled array of resources for map');
console.log(resourcesForMap, resourcesListFinal);
console.log('Tiles object and shuffled array of tiles for map');
console.log(tilesForMap, tilesListFinal);

//all data prepared!
// use arrays: tilesListFinal and resourcesListFinal in a loop to generate the final map :)

function generate_map() {
  document.write('<div id="mapContainer">');
  let val = 9;
  const doubleit = val * 2;

  for (let i = 0; i < doubleit; i++) {
    if (i < val && i >= 5) {
      document.write('<div class="hex-row">');
      for (let j = 0; j < i; j++) {
        let tile = tilesListFinal[0];
        tilesListFinal.splice(0, 1);
        let resource = resourcesListFinal[0];
        resourcesListFinal.splice(0, 1);

        document.write(
          `<div class="hexagon ${tile}"><small>${resource}</small></div>`
        );
      }
      document.write('</div>');
    }
    if (i >= val && i <= 13) {
      document.write('<div class="hex-row">');
      for (let j = doubleit; j > i; j--) {
        let tile = tilesListFinal[0];
        tilesListFinal.splice(0, 1);
        let resource = resourcesListFinal[0];
        resourcesListFinal.splice(0, 1);

        document.write(
          `<div class="hexagon ${tile}"><small>${resource}</small></div>`
        );
      }
      document.write('</div>');
    }
  }
  document.write('</div>');
}
//call map generator
generate_map();

//function end

//below some ideas for rearranging code in the future:

// //first iteration gonna go like that:
// var mapHeightArr = [5, 6, 7, 8, 9, 8, 7, 6, 5];

// function generateMapRow(item) {
//   document.write('<div class="hex-row">');
//   for (i = 1; i <= item; i++) {
//     document.write(
//       `<div class="hexagon ${randomEl(colorArr)}"><small> ${randomEl(
//         resourcesArr1
//       )} </small><small> ${randomEl(resourcesArr2)} </small></div> `
//     );
//   }
//   document.write('</div>');
// }

// document.write('<div id="mapContainer" class="pt-5">');
// mapHeightArr.forEach((item) => generateMapRow(item));
// document.write('/<div>');

// /*
// At the beginning of function:
// 1.select value from say 20 - 30
// 2.create array length 59 (59 tiles) randomly distributing values (0/1/2) 59 times to get the desired sum of these values (20-30)
// 3.create more arrays (or maybe construct an object?) to determine other tile parameters
// 4.use arrays/objects to extract values in the loop (foreach and for)
// */

// console.log('-------');
// mapHeightArr.forEach((item, index) =>
//   console.log('index ' + index + ': ' + 'item' + item)
// );
// //inside foreach include for loop with length of current element from foreach
// console.log('-------');
// mapHeightArr.forEach((item, index) =>
//   console.log(`index ${index} : item ${item}`)
// );

// // removing array element method
// var array = [1, 2, 3, 4];
// var item = 3;

// var index = array.indexOf(item);
// array.splice(index, 1);

// console.log(array);

// console.log('-------');

// //shuffle array test

// console.log('Array shuffle test');

// var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(myArray);
// console.log(shuffleArray(myArray));

//all values 38 -74
//  [1, 2, 3, 4] .reduce((a, b) => a + b, 0)
