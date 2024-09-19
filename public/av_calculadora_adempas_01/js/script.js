"use strict";
let veeva = {};
let slideUno = {
   loadConfig: function () {
      return fetch('js/config.json')
         .then(response => response.json())
         .then(data => {
            veeva = data;
         })
         .catch(error => {
            console.error('Error al cargar la configuración:', error);
         });
   },

   jumptoSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      const isVeeva = navigator.userAgent.includes("Veeva" || "veeva");
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      alert(
         "userAgent:" + navigator.userAgent +
         "\nisVeeva: " + isVeeva +
         "\nisIpad: " + isIpad +
         "\nTestIpad" + /iPad/.test(navigator.userAgent) +
         "\nplatform: " + navigator.platform +
         "\nmaxTouchPoints: " + navigator.maxTouchPoints
      );
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            alert("veeva navigation");
            document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip, ${veeva.presentationCode})`;
         } else {
            alert("browser navigation");
            document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {
   slideUno.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      localStorage.removeItem('calculadora');
   });
});