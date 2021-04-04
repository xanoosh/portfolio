'use strict';

//AOS setup
AOS.init();
let delayVal = 0;
document.querySelectorAll(`[data-aos='fade-up']`).forEach((el) => {
  el.setAttribute('data-aos-delay', delayVal);
  delayVal += 100;
});

//type.js setup
const options = {
  strings: [
    'Hello there!^2000',
    'I am a webDev from Warsaw^1500',
    'See my projects below',
  ],
  typeSpeed: 60,
};
const typed = new Typed('.type-it', options);

// get some tinytyper / typer.js - typing animation
//...or write your own
//try to write your own animate on scroll :)
