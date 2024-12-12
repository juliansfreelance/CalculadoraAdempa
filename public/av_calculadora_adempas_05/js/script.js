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
let slideCinco = {


   openAlert: function (alert) {
      const customAlert = document.querySelector(`custom-alert[name="alert-${alert}"]`);
      const customAlertConten = document.querySelector(`custom-alert[name="alert-${alert}"] .alert-conten`);
      const customAlertAlert = document.querySelector(`custom-alert[name="alert-${alert}"] .alert`);
      if (customAlert) {
         customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
         customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
         customAlert.classList.replace('hidden', 'grid');
      } else {
         console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${alert}".`);
      }
   },

   closeAlert: function () {
      const customAlert = document.querySelector('custom-alert.grid');
      const customAlertConten = document.querySelector('custom-alert.grid .alert-conten');
      const customAlertAlert = document.querySelector('custom-alert.grid .alert-conten .alert');
      if (customAlert) {
         customAlertConten.classList.replace('alert-animate-in', 'alert-animate-out');
         customAlertAlert.classList.replace('alert-conten-animate-in', 'alert-conten-animate-out');
         setTimeout(() => {
            customAlert.classList.replace('grid', 'hidden');
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-alert> abierto.`);
      }
   },

   flujo: function (flujo, estado) {
      console.log(flujo, estado);
      if (flujo === 'HAP' && estado === true) {
         localStorage.setItem('HAP', true);
      }
      if (flujo === 'HAP' && estado === false) {
         localStorage.setItem('HAP', false);
      }
      if (flujo === 'HPTEC' && estado === true) {
         localStorage.setItem('HPTEC', true);
      }
      if (flujo === 'HPTEC' && estado === false) {
         localStorage.setItem('HPTEC', false);
      }
   },


   loadConfig: function () {
      return fetch('js/config.json').then(response => response.json()).then(data => {
         veeva = data;
      }).catch(error => {
         console.error('Error al cargar la configuración:', error);
      });
   },

   jumpToSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
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
   slideCinco.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});


