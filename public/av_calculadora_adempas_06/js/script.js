"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideSeis = {

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         console.log(veeva);
         document.dispatchEvent(new Event('configLoaded'));
      }
   },

   loadConfig: function() {
      return fetch('js/config.json').then(response => response.json()).then(data => {
         veeva = data;
      }).catch(error => {
            console.error('Error al cargar la configuración:', error);
      });
   },

   jumpToSlide: function(slide) {
      slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   },

   popUp: function(pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('hidden', 'pop-animate-down');
         customPop.classList.add('flex', 'pop-animate-up');
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   popDown: function(pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('flex', 'pop-animate-up');
         customPop.classList.add('pop-animate-down');
         setTimeout(() => {
            customPop.classList.add('hidden')
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   validarForm: function() {
      console.log('Validacion slide 06 pendiente');
      slideSeis.jumpToSlide('07');
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideSeis.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSeis.ini();
   });
});