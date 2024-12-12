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

let slideNueve = {
   validateCounnt: 0,

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         setTimeout(() => {
            slideNueve.openAlert('bd-clear');
         }, 1400);
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
   },

   popUp: function (pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('hidden', 'pop-animate-down');
         customPop.classList.add('flex', 'pop-animate-up');
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   popDown: function (pop) {
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

   openAlert: function (alert) {
      const customAlert = document.querySelector(`custom-alert[name="alert-${alert}"]`);
      const customAlertConten = document.querySelector(`custom-alert[name="alert-${alert}"] .alert-conten`);
      const customAlertAlert = document.querySelector(`custom-alert[name="alert-${alert}"] .alert`);
      if (customAlert) {
         customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
         customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
         customAlert.classList.replace('hidden', 'block');
      } else {
         console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${alert}".`);
      }
   },

   closeAlert: function () {
      const customAlert = document.querySelector('custom-alert.block');
      const customAlertConten = document.querySelector('custom-alert.block .alert-conten');
      const customAlertAlert = document.querySelector('custom-alert.block .alert-conten .alert');
      if (customAlert) {
         customAlertConten.classList.replace('alert-animate-in', 'alert-animate-out');
         customAlertAlert.classList.replace('alert-conten-animate-in', 'alert-conten-animate-out');
         setTimeout(() => {
            customAlert.classList.replace('block', 'hidden');
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-alert> Abierto.`);
      }
   },

   formatToFloatString: function(value) {
      let floatValue = parseFloat(value).toFixed(2);
      return floatValue.replace('.', ',');
   },

   updateInputComplications: function () {
      const probabilidades = veeva.calculadora.complicaciones.probabilidades
      const inputs = document.querySelectorAll('input[name^="complicacion"]');
      inputs.forEach(input => {
         const name = input.name;
         const [tipo, index, riesgo] = name.split('-');
         input.value = slideNueve.formatToFloatString(probabilidades[index - 1][riesgo]);
      });
   },

   syncComplicationsWithReference: function () {
      const probabilidades = veeva.calculadora.complicaciones.probabilidades
      const referencias = veeva.calculadora.referencias.complicaciones.probabilidades;

      referencias.forEach((refProbabilidades, index) => {

         probabilidades[index].bajo = referencias[index].bajo;
         probabilidades[index].intermedio = referencias[index].intermedio;
         probabilidades[index].alto = referencias[index].alto;
      });

      console.log("Complicaciones actualizadas:", probabilidades);
      slideNueve.actualizarInputs()
   },

   actualizarInputs: function() {
      slideNueve.updateInputComplications();
      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideNueve.validateComplications();
            slideNueve.closeAlert();
         }, 400);
      }
   },

   validateComplications: function () {
      slideNueve.validateCounnt++;
      const error = document.querySelector('.error-probabilidad');
      const getValues = (names) => {
         return names.map(name => {
            const input = document.querySelector(`input[name="${name}"]`);
            return {
               value: parseFloat(input.value.replace(',', '.')),
               parentTd: input.closest('td')
            };
         });
      };

      const inputs = [
         ...getValues(['complicacion-1-bajo', 'complicacion-1-intermedio', 'complicacion-1-alto']),
         ...getValues(['complicacion-2-bajo', 'complicacion-2-intermedio', 'complicacion-2-alto']),
         ...getValues(['complicacion-3-bajo', 'complicacion-3-intermedio', 'complicacion-3-alto'])
      ];

      inputs.forEach(({ value, parentTd }) => {
         value === 0 ? parentTd.classList.add('input-error') : parentTd.classList.remove('input-error');
      });
      inputs.every(({ value }) => value !== 0) ? error.classList.add('hidden') : error.classList.remove('hidden');

      const validate = inputs.every(({ value }) => value !== 0);
      return validate;
   },

   validarForm: function() {
      const validateComplications = slideNueve.validateComplications();
      if (validateComplications === true) {
         localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
         slideNueve.jumpToSlide('10');
      }
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideNueve.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideNueve.ini();
      setTimeout(() => {
         slideNueve.updateInputComplications();
      }, 1000);
   });
});