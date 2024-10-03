"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By: Julio Calderón
 */
let veeva = {};
let slideSeis = {

   ini: async function () {
      const buttonsElement = document.querySelectorAll('button[name="conoceGrupos"]');
      const inputsElement = document.querySelector('.content-inputs');
      const riskEdit = document.querySelector('.risk-edit');
      const riskEstudy = document.querySelector('.risk-estudy');
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         console.log('Veeva desde el localStorage: ', veeva);
         const updateButtonStyles = (index) => {
            buttonsElement[index].classList.replace('background-btn-gray', 'background-btn-orange');
            buttonsElement[index].classList.replace('button-gray-corner-full', 'button-orange-corner-full');
         };
         if (veeva.calculadora.estadificacion.conoceDistribucion) {
            updateButtonStyles(0);
            const riskLowEditValue = document.querySelector('input[name="edit-risk-low"]');
            const riskIntermediateEditValue = document.querySelector('input[name="edit-risk-intermediate"]');
            const riskHighEditValue = document.querySelector('input[name="edit-risk-high"]');
            riskLowEditValue.value = veeva.calculadora.estadificacion.riesgoBajo.toString().replace('.', ',');
            riskIntermediateEditValue.value = veeva.calculadora.estadificacion.riesgoIntermedio.toString().replace('.', ',');
            riskHighEditValue.value = veeva.calculadora.estadificacion.riesgoAlto.toString().replace('.', ',');
            riskEdit.classList.replace('hidden', 'grid');
            inputsElement.classList.replace('hidden', 'flex');
         } else {
            if (veeva.calculadora.estadificacion.study !== '') {
               updateButtonStyles(1);
               const riskLowEstudyValue = document.querySelector('input[name="estudy-risk-low"]');
               const riskIntermediateValue = document.querySelector('input[name="estudy-risk-intermediate"]');
               const riskHighEstudyValue = document.querySelector('input[name="estudy-risk-high"]');
               const estadificacionSelected = veeva.calculadora.referencias.estadificacion.find(es => es.name === veeva.calculadora.estadificacion.study);
               riskLowEstudyValue.value = `${estadificacionSelected.riesgoBajo}`;
               riskIntermediateValue.value = `${estadificacionSelected.riesgoIntermedio}`;
               riskHighEstudyValue.value = `${estadificacionSelected.riesgoAlto}`;
               inputsElement.classList.replace('hidden', 'flex');
               riskEstudy.classList.replace('hidden', 'grid');
            }
         }
      }
      buttonsElement.forEach(button => {
         button.addEventListener('click', slideSeis.handleButtonClick);
      });
   },

   handleButtonClick(event) {
      const inputsElement = document.querySelector('.content-inputs');
      const buttonsElement = document.querySelectorAll('button[name="conoceGrupos"]');
      const riskEdit = document.querySelector('.risk-edit');
      const riskEstudy = document.querySelector('.risk-estudy');
      const button = event.currentTarget;
      buttonsElement.forEach(btn => {
         btn.classList.replace('background-btn-orange', 'background-btn-gray');
         btn.classList.replace('button-orange-corner-full', 'button-gray-corner-full');
      });
      riskEdit.classList.replace('grid', 'hidden');
      riskEstudy.classList.replace('grid', 'hidden');
      button.classList.replace('background-btn-gray', 'background-btn-orange');
      button.classList.replace('button-gray-corner-full', 'button-orange-corner-full');
      const conoceDistribucion = button.value.trim().toLowerCase() === "true";
      veeva.calculadora.estadificacion.conoceDistribucion = conoceDistribucion;
      if (conoceDistribucion) {
         veeva.calculadora.estadificacion.riesgoBajo = 0;
         veeva.calculadora.estadificacion.riesgoIntermedio = 0;
         veeva.calculadora.estadificacion.riesgoAlto = 0;
         veeva.calculadora.estadificacion.study = "";
         riskEdit.classList.replace('hidden', 'grid');
         inputsElement.classList.replace('hidden', 'flex');
      } else {
         inputsElement.classList.replace('flex', 'hidden');
         slideSeis.popUp();
      }
   },

   popUp: function () {
      const pop = document.querySelector('.pop-conten');
      const alertBody = document.querySelector('.pop-conten-body');
      let gruposHTML = ''
      veeva.calculadora.referencias.estadificacion.forEach((estadifi, i)  => {
         gruposHTML += `
         <tr>
            <td class="text-sm text-text-500">${estadifi.name}</td>
            <td><custom-input name="" type="calc" valor="${estadifi.riesgoBajo.toString().replace('.', ',')}" icon="porcentaje"></custom-input></td>
            <td><custom-input name="" type="calc" valor="${estadifi.riesgoIntermedio.toString().replace('.', ',')}" icon="porcentaje"></custom-input></td>
            <td><custom-input name="" type="calc" valor="${estadifi.riesgoAlto.toString().replace('.', ',')}" icon="porcentaje"></custom-input></td>
            <td>
               <button onclick="slideSeis.selectGrupo('${estadifi.name}')" class="text-green-600 shadow-md rounded-full p-0.5 bg-white ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill size-5" viewBox="0 0 16 16">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
               </button>
            </td>
         </tr>
         `;
      });
      alertBody.innerHTML = gruposHTML;
      pop.classList.replace('hidden', 'flex');
      pop.classList.replace('pop-animate-down', 'pop-animate-up');
   },

   popDown: function() {
      const pop = document.querySelector('.pop-conten');
      const buttonsElement = document.querySelectorAll('button[name="conoceGrupos"]');
      pop.classList.replace('pop-animate-up', 'pop-animate-down');
      setTimeout(() => {
         pop.classList.replace('flex', 'hidden');
         buttonsElement.forEach(button => {
            button.classList.replace('background-btn-orange', 'background-btn-gray');
            button.classList.replace('button-orange-corner-full', 'button-gray-corner-full');
         });
      }, 500);
   },

   selectGrupo(estadificacion) {
      const pop = document.querySelector('.pop-conten');
      const inputsElement = document.querySelector('.content-inputs');
      const riskEstudy = document.querySelector('.risk-estudy');
      const riskLowEstudyValue = document.querySelector('input[name="estudy-risk-low"]');
      const riskIntermediateValue = document.querySelector('input[name="estudy-risk-intermediate"]');
      const riskHighEstudyValue = document.querySelector('input[name="estudy-risk-high"]');
      
      const estadificacionSelected = veeva.calculadora.referencias.estadificacion.find(es => es.name === estadificacion);
      pop.classList.replace('pop-animate-up', 'pop-animate-down');
      if (estadificacionSelected) {
         riskLowEstudyValue.value = `${estadificacionSelected.riesgoBajo}`;
         riskIntermediateValue.value = `${estadificacionSelected.riesgoIntermedio}`;
         riskHighEstudyValue.value = `${estadificacionSelected.riesgoAlto}`;
         const { riesgoBajo, riesgoIntermedio, riesgoAlto, name } = estadificacionSelected;
         veeva.calculadora.estadificacion = { ...veeva.calculadora.estadificacion, riesgoBajo, riesgoIntermedio, riesgoAlto, study: name };
         setTimeout(() => {
            pop.classList.replace('flex', 'hidden');
            inputsElement.classList.replace('hidden', 'flex');
            riskEstudy.classList.replace('hidden', 'grid');
         }, 500);
      } else {
         console.error('Estadificacion ref no encontrado:', estadificacion);
      }
   },

   validarForm() {
      const { estadificacion } = veeva.calculadora;
      const toggleError = (selector, condition) => {
         document.querySelector(selector).classList.replace(condition ? 'hidden' : 'block', condition ? 'block' : 'hidden');
      };
      if (estadificacion.conoceDistribucion) {
         const riskLowEdit = document.querySelector('input[name="edit-risk-low"]');
         const riskIntermediateEdit = document.querySelector('input[name="edit-risk-intermediate"]');
         const riskHighEdit = document.querySelector('input[name="edit-risk-high"]');
         const riskLowEditValue = parseFloat(riskLowEdit.value.replace(',', '.'));
         const riskIntermediateEditValue = parseFloat(riskIntermediateEdit.value.replace(',', '.'));
         const riskHighEditValue = parseFloat(riskHighEdit.value.replace(',', '.'));
         toggleError('.risk-low-error', !riskLowEdit.value);
         toggleError('.risk-intermediate-error', !riskIntermediateEdit.value);
         toggleError('.risk-high-error', !riskHighEdit.value);
         const inputsNotEmpty = riskLowEdit.value && riskIntermediateEdit.value && riskHighEdit.value;
         const sumNot100 = riskLowEditValue + riskIntermediateEditValue + riskHighEditValue !== 100;
         if (inputsNotEmpty && sumNot100) {
            toggleError('.grupos-error', true);
         } else if (inputsNotEmpty && !sumNot100) {
            toggleError('.grupos-error', false);
            estadificacion.riesgoBajo = riskLowEditValue;
            estadificacion.riesgoIntermedio = riskIntermediateEditValue;
            estadificacion.riesgoAlto = riskHighEditValue;
            slideSeis.estadificacionPacientes();
         }
      } else {
         slideSeis.estadificacionPacientes();
      }
   },

   estadificacionPacientes: function () {
      const { grupos, estadificacion, estadificacionPacientes } = veeva.calculadora;
      const riesgoBajo = parseFloat(estadificacion.riesgoBajo);
      const riesgoIntermedio = parseFloat(estadificacion.riesgoIntermedio);
      const riesgoAlto = parseFloat(estadificacion.riesgoAlto);
      const HAP = parseFloat(grupos.HAP);
      const HTEC = parseFloat(grupos.HTEC);
      const pacientesBajo = (((riesgoBajo * HAP) + (riesgoBajo * HTEC)))/100;
      const pacientesIntermedio = ((riesgoIntermedio * HAP) + (riesgoIntermedio * HTEC))/100;
      const pacientesAlto = ((riesgoAlto * HAP) + (riesgoAlto * HTEC)) / 100;
      estadificacionPacientes.bajo = pacientesBajo;
      estadificacionPacientes.intermedio = pacientesIntermedio;
      estadificacionPacientes.alto = pacientesAlto;
      slideSeis.estadificacionCategoria();
   },

   estadificacionCategoria: function () {
      const { poblacion, estadificacionPacientes, estadificacionCategoria } = veeva.calculadora;
      const gente = parseFloat(poblacion);
      let pacientesBajo = estadificacionPacientes.bajo;
      let pacientesIntermedio = estadificacionPacientes.intermedio;
      let pacientesAlto = estadificacionPacientes.alto;
      const categoriaBajo = (Math.floor(gente * pacientesBajo)) / 100;
      const categoriaIntermedio = (Math.floor(gente * pacientesIntermedio)) / 100;
      const categoriaAlto = (Math.floor(gente * pacientesAlto)) / 100;
      estadificacionCategoria.bajo = categoriaBajo;
      estadificacionCategoria.intermedio = categoriaIntermedio;
      estadificacionCategoria.alto = categoriaAlto;
      localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
      setTimeout(() => {
         slideSeis.jumpToSlide('07');
      }, 800);
   },

   openAlert: function (alert) {
      const customAlert = document.querySelector(`custom-alert[name="alert-${alert}"]`);
      const customAlertConten = document.querySelector(`custom-alert[name="alert-${alert}"] .alert-conten`);
      const customAlertAlert = document.querySelector(`custom-alert[name="alert-${alert}"] .alert`);
      switch (alert) {

         case 'reset':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
            break;

         case 'bd-clear':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
            break;
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
         console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
      }
   },

   formatNumber: function (val) {
      const FORMAT_DECIMAL = value => currency(value, { precision: 2, symbol: '', decimal: ',', separator: '.' });
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      if (val !== '') {
         let inputValue = val.toString().replace(/[^\d,.]/g, '');
         let integer = parseFloat(inputValue.replace(/\./g, '').replace(/,/g, '.'));
         return inputValue.indexOf(',') !== -1 ? FORMAT_DECIMAL(integer).format() : FORMAT_ENTERO(integer).format();
      }
   },

   handleInput: function (event) {
      let inputValue = event.target.value.replace(/[^\d,]/g, '');
      if (inputValue.includes(',')) {
         this.decimalMode = true;
      }
      if (this.decimalMode) {
         let decimalIndex = inputValue.indexOf(',');
         if (decimalIndex !== -1) {
            let decimalPart = inputValue.substring(decimalIndex + 1);
            if (decimalPart.length > 2) {
               inputValue = inputValue.substring(0, decimalIndex + 3);
            }
         }
      }
      event.target.value = inputValue;
      this.valor = inputValue;
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
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip, ${veeva.presentationCode})`;
         } else {
            document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {
   slideSeis.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSeis.ini();
   });
});


