"use strict";
let veeva = {};

let slideCuatro = {

   loadConfig: function() {
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
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   }
}


document.addEventListener('DOMContentLoaded', function () {
   slideCuatro.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});