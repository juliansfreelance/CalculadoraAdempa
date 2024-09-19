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
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide("${veeva.zipName}${slide}.zip", "${veeva.presentationCode}")`;
         } else {
            document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   }
}


document.addEventListener('DOMContentLoaded', function () {
   slideCuatro.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});