"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By: Julio Calderón
 * last modified: 2024-12-12
 */
let veeva = {};

let slideCatorce = {

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
      if (slide === 'refClose' && localStorage.getItem('previousSlide')) {
         slide = localStorage.getItem('previousSlide');
      } else {
         slide = '01';
      }
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.userAgentData && navigator.userAgentData.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip, ${veeva.presentationCode})`;
         } else if (localStorage.getItem("ambiente") === "local") {
            window.location.href = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         } else {
            window.location.href = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   }
}


document.addEventListener('DOMContentLoaded', function () {
   slideCatorce.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});