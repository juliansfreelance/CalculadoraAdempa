"use strict";
let veeva = {};

function loadConfig() {
   return fetch('js/config.json')
      .then(response => response.json())
      .then(data => {
         veeva = data;
         document.dispatchEvent(new Event('configLoaded'));
      })
      .catch(error => {
         console.error('Error al cargar la configuración:', error);
      });
}

function jumpToSlide(slide) {
   slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
   if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
      document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
   } else {
      document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
   }
}

function popUp(pop) {
   const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
   if (customPop) {
      customPop.classList.remove('hidden', 'pop-animate-down');
      customPop.classList.add('block', 'pop-animate-up');
   } else {
      console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
   }
}

function popDown(pop) {
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
}

function toggleFolder(folderId) {
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


function validarForm() {
   console.log('Validacion slide 06 pendiente');
   jumpToSlide('07');
}

document.addEventListener('DOMContentLoaded', function () {
   loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});