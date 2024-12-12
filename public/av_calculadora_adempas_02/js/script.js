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

   jumpToSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      if (slide === '01' && localStorage.getItem('instrucciones') !== null) slide = '06';
      localStorage.removeItem('instrucciones');
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
   slideDos.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});