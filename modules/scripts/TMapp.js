console.log('Connection established, Sire!');

colorArr = ['water', 'mars', 'mars', 'mars', 'mars', 'water', 'mars', 'mars'];
resourcesArr1 = ['steel', 'titanium', '', 'card', 'plant', ''];
resourcesArr2 = ['steel', '', 'titanium', '', 'card', '', 'plant', ''];

function randomEl(arr) {
    var randomVal = Math.ceil(Math.random() * arr.length - 1);
    return arr[randomVal];
}

function generate_map() {
    document.write('<div id="mapContainer">');
    let val = 9;
    doubleit = val * 2;

    for (i = 0; i < doubleit; i++) {
        if (i < val && i >= 5) {
            document.write('<div class="hex-row">');
            for (j = 0; j < i; j++) {
                document.write(' <div class="hexagon ' + randomEl(colorArr) + ' "><small>' + randomEl(resourcesArr1) + '</small><small>' + randomEl(resourcesArr2) + '</small></div> ');
            }
            document.write('</div>');
        }
        if (i >= val && i <= 13) {
            document.write('<div class="hex-row">');
            for (j = doubleit; j > i; j--) {
                document.write(' <div class="hexagon ' + randomEl(colorArr) + ' "><small>' + randomEl(resourcesArr1) + '</small><small>' + randomEl(resourcesArr2) + '</small></div> ');
            }
            document.write('</div>');
        }
    }
    document.write('</div>');
}

generate_map();



//first iteration gonna go like that:
var mapHeightArr = [5, 6, 7, 8, 9, 8, 7, 6, 5];

function generateMapRow(item) {
    document.write('<div class="hex-row">');
    for (i = 1; i <= item; i++) {
        document.write(`<div class="hexagon ${randomEl(colorArr)}"><small> ${randomEl(resourcesArr1)} </small><small> ${randomEl(resourcesArr2)} </small></div> `);
    }
    document.write('</div>');
}

document.write('<div id="mapContainer" class="pt-5">');
mapHeightArr.forEach(item => generateMapRow(item));
document.write('/<div>');

/*
At the beginning of function:
1.select value from say 20 - 30
2.create array length 59 (59 tiles) randomly distributing values (0/1/2) 59 times to get the desired sum of these values (20-30)
3.create more arrays (or maybe construct an object?) to determine other tile parameters
4.use arrays/objects to extract values in the loop (foreach and for)
*/

console.log('-------');
mapHeightArr.forEach((item, index) => (console.log('index ' + index + ': ' + 'item' + item)));
//inside foreach include for loop with length of current element from foreach
console.log('-------');
mapHeightArr.forEach((item, index) => (console.log(`index ${index} : item ${item}`)));

// removing array element method
var array = [1, 2, 3, 4]
var item = 3

var index = array.indexOf(item);
array.splice(index, 1);

console.log(array);



console.log('-------');

//shuffle array

console.log('Array shuffle test');

function shuffle(array) {
    var m = array.length, t, i;

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
}

var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(myArray);
console.log(shuffle(myArray));

console.log('-----');
console.log('Array remover test');
var arrayRemoveEl = ['this', 'is', 'not', 'bullshit'];
console.log(arrayRemoveEl);
arrayRemoveEl.splice(arrayRemoveEl.indexOf('not'), 1);
console.log(arrayRemoveEl);
