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
   const contentFolder = document.querySelector('.content-folder');
   const z50 = document.querySelector('header','main');
   const openFolders = document.querySelectorAll('.folder.open');
   const folder = document.getElementById(folderId);

   openFolders.forEach(folder => {
      if (folder.id !== folderId && folder.classList.contains('open')) {
         folder.classList.remove('open');
         folder.classList.add('close');
      }
   });

   if (folder.classList.contains('open')) {
      setTimeout(() => {
         z50.classList.add('z-50');
      }, 600);
      contentFolder.classList.remove('fade-in');
      contentFolder.classList.add('fade-out');
      folder.classList.remove('open');
      folder.classList.add('close');
   } else {
      z50.classList.remove('z-50');
      contentFolder.classList.remove('fade-out');
      contentFolder.classList.add('fade-in');
      folder.classList.remove('close');
      folder.classList.add('open');
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