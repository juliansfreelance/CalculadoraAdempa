/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
*/
"use strict";
import chartHomeModule from './modules/chartHome.js';

 let veeva = {};

let slideSiete = {

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         slideSiete.updateResult();
         console.log(veeva);
      } else {
         const alert = document.querySelector('.alert-conten');
         alert.classList.replace('alert-animate-down', 'alert-animate-up');
         setTimeout(() => {
            alert.classList.replace('hidden', 'flex');
         }, 500);
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
            headerElement.classList.replace('z-10','z-50');
            mainElement.classList.replace('z-10','z-50');
         }, 560);
         folder.classList.replace('open', 'close');
         contentFolder.classList.replace('fade-in', 'fade-out');
      } else {
         headerElement.classList.replace('z-50', 'z-10');
         mainElement.classList.replace('z-50', 'z-10');
         contentFolder.classList.replace('fade-out', 'fade-in');
         folder.classList.replace('close', 'open');
      }
   },

   updateResult: function () {

      const resPoblacion = document.querySelector("input[name='res-poblacion']");

      const resRiskBajo = document.querySelector("input[name='res-risk-bajo']");
      const resRiskIntermedio = document.querySelector("input[name='res-risk-intermedio']");
      const resRiskAlto = document.querySelector("input[name='res-risk-alto']");

      const resPercentBajo = document.querySelector("input[name='res-percent-bajo']");
      const resPercentIntermedio = document.querySelector("input[name='res-percent-intermedio']");
      const resPercentAlto = document.querySelector("input[name='res-percent-alto']");

      resPoblacion.value = veeva.calculadora.poblacion;

      resRiskBajo.value = veeva.calculadora.estadificacionCategoria.bajo;
      resRiskIntermedio.value = veeva.calculadora.estadificacionCategoria.intermedio;
      resRiskAlto.value = veeva.calculadora.estadificacionCategoria.alto;

      resPercentBajo.value = veeva.calculadora.estadificacionPacientes.bajo;
      resPercentIntermedio.value = veeva.calculadora.estadificacionPacientes.intermedio;
      resPercentAlto.value = veeva.calculadora.estadificacionPacientes.alto;

      slideSiete.chartIni();
   },

   chartIni: function () {
      console.log(veeva);
      const chartContainer = document.querySelector('.chart-home');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartHome" class="chart-animate-fade-in"></canvas>`;
         chartHomeModule.chartIni(veeva);
      }, 1600);
   }
};

window.slideSiete = slideSiete;
window.veeva = veeva;

document.addEventListener('DOMContentLoaded', function () {
   slideSiete.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSiete.ini();
   });
});