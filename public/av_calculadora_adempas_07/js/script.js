"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideSiete = {

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         console.log(veeva);
         document.dispatchEvent(new Event('configLoaded'));
      }
   },

   loadConfig: function () {
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
         customPop.classList.add('block', 'pop-animate-up');
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   popDown: function(pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('block', 'pop-animate-up');
         customPop.classList.add('pop-animate-down');
         setTimeout(() => {
            customPop.classList.add('hidden')
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   toggleFolder: function(folderId) {
      const headerElement = document.querySelector('.slide header');
      const mainElement = document.querySelector('.slide main');
      const contentFolder = document.querySelector('.content-folder');
      const folder = document.getElementById(folderId);
      const openFolders = document.querySelectorAll('.folder.open');

      openFolders.forEach(openFolder => {
         if (openFolder.id !== folderId) {
            openFolder.classList.replace('open', 'close');
         }
      });
      if (folder.classList.contains('open')) {
         setTimeout(() => {
            headerElement.classList.add('z-50');
            mainElement.classList.add('z-50');
         }, 600);
         folder.classList.replace('open', 'close');
         contentFolder.classList.replace('fade-in', 'fade-out');
      } else {
         headerElement.classList.remove('z-50');
         mainElement.classList.remove('z-50');
         contentFolder.classList.replace('fade-out', 'fade-in');
         folder.classList.replace('close', 'open');
      }
   }
};

document.addEventListener('DOMContentLoaded', function () {
   slideSiete.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSiete.ini();
   });
});