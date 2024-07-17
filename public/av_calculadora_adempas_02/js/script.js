"use strict";
let veeva = {};

let slideDos = {
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
      if (slide === '01' && localStorage.getItem('instrucciones') !== null) slide = '05'; localStorage.removeItem('instrucciones');
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   }
}



document.addEventListener('DOMContentLoaded', function () {
   slideDos.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});