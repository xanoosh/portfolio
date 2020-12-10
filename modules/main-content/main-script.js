'use strict';

AOS.init();

let delayVal = 0;
document.querySelectorAll(`[data-aos='fade-up']`).forEach((el) => {
  el.setAttribute('data-aos-delay', delayVal);
  delayVal += 100;
});
