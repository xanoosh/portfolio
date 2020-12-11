'use strict';

AOS.init();

let delayVal = 0;
document.querySelectorAll(`[data-aos='fade-up']`).forEach((el) => {
  el.setAttribute('data-aos-delay', delayVal);
  delayVal += 100;
});

// get some tinytyper / typer.js - typing animation
//...or write your own
//try to write your own animate on scroll :)

// const typeTxt = document.querySelector('.type-it');
// // const txt = 'Hello  there! ssss';
// let i = 0;
// typeTxt;

// //explode to words
// const typeWrite = function (fullTxt) {
//   const words = fullTxt.split(' ');
//   words.forEach((word) => {
//     console.log(word);
//     if (word.length > 0) {
//       typer(word);
//     }
//   });
//   i = 0;
// };

// // define typer for single word
// const typer = function (txt) {
//   if (i < txt.length) {
//     // console.log(txt + 'again' + typeof txt);
//     typeTxt.innerText += txt.charAt(i);
//     i++;
//     setTimeout(typer, 50);
//   }
// };

// setTimeout(typeWrite('Hello  there! ssss'), 500);
