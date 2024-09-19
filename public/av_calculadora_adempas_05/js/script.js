"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};
let slideCinco = {

   ini: async function () {
      const inputElement = document.querySelector('input[name="poblacion"]');
      const buttonsElement = document.querySelectorAll('button[name="conoceGrupos"]');
      const inputsElement = document.querySelector('.content-inputs');
      const htpEdit = document.querySelector('.htp-edit');
      const htpEstudy = document.querySelector('.htp-estudy');
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         console.log('Veeva desde el localStorage: ', veeva);
         inputElement.value = veeva.calculadora.poblacion;
         const updateButtonStyles = (index) => {
            buttonsElement[index].classList.replace('background-btn-gray', 'background-btn-orange');
            buttonsElement[index].classList.replace('button-gray-corner-full', 'button-orange-corner-full');
         };
         if (veeva.calculadora.grupos.conoceDistribucion) {
            updateButtonStyles(0);
            const hapEditValue = document.querySelector('input[name="edit-HAP"]');
            const htecEditValue = document.querySelector('input[name="edit-HTCE"]');
            hapEditValue.value = veeva.calculadora.grupos.HAP.toString().replace('.', ',');
            htecEditValue.value = veeva.calculadora.grupos.HTEC.toString().replace('.', ',');
            htpEdit.classList.replace('hidden', 'grid');
            inputsElement.classList.replace('hidden', 'flex');
         } else {
            updateButtonStyles(1);
            const hapEstudyValue = document.querySelector('input[name="estudy-HAP"]');
            const htecEstudyValue = document.querySelector('input[name="estudy-HTCE"]');
            const grupoSelected = veeva.calculadora.referencias.grupos.find(g => g.name === veeva.calculadora.grupos.study);
            hapEstudyValue.value = `${grupoSelected.name} - ${grupoSelected.HAP}`;
            htecEstudyValue.value = `${grupoSelected.name} - ${grupoSelected.HTEC}`;
            inputsElement.classList.replace('hidden', 'flex');
            htpEstudy.classList.replace('hidden', 'grid');
         }
      }
      inputElement.addEventListener('input', slideCinco.handleInput);
      inputElement.addEventListener('blur', slideCinco.handleBlur);
      buttonsElement.forEach(button => {
         button.addEventListener('click', slideCinco.handleButtonClick);
      });
   },

   handleButtonClick(event) {
      const inputsElement = document.querySelector('.content-inputs');
      const buttonsElement = document.querySelectorAll('button[name="conoceGrupos"]');
      const htpEdit = document.querySelector('.htp-edit');
      const htpEstudy = document.querySelector('.htp-estudy');
      const button = event.currentTarget;
      buttonsElement.forEach(btn => {
         btn.classList.replace('background-btn-orange', 'background-btn-gray');
         btn.classList.replace('button-orange-corner-full', 'button-gray-corner-full');
      });
      htpEdit.classList.replace('grid', 'hidden');
      htpEstudy.classList.replace('grid', 'hidden');
      button.classList.replace('background-btn-gray', 'background-btn-orange');
      button.classList.replace('button-gray-corner-full', 'button-orange-corner-full');
      const conoceDistribucion = button.value.trim().toLowerCase() === "true";
      veeva.calculadora.grupos.conoceDistribucion = conoceDistribucion;
      if (conoceDistribucion) {
         veeva.calculadora.grupos.HAP = 0;
         veeva.calculadora.grupos.HTEC = 0;
         veeva.calculadora.grupos.study = "";
         htpEdit.classList.replace('hidden', 'grid');
         inputsElement.classList.replace('hidden', 'flex');
      } else {
         inputsElement.classList.replace('flex', 'hidden');
         slideCinco.popUp();
      }
   },

   popUp: function () {
      const pop = document.querySelector('.pop-conten');
      const alertBody = document.querySelector('.pop-conten-body');
      let gruposHTML = ''
      veeva.calculadora.referencias.grupos.forEach((grupo, i)  => {
         gruposHTML += `
         <tr>
            <td class="font-bold text-base text-text-500">${grupo.name}</td>
            <td><custom-input name="" type="calc" valor="${grupo.HAP}" icon="porcentaje"></custom-input></td>
            <td><custom-input name="" type="calc" valor="${grupo.HTEC}" icon="porcentaje"></custom-input></td>
            <td>
               <button onclick="slideCinco.selectGrupo('${grupo.name}')" class="text-green-600 shadow-md rounded-full p-0.5 bg-white ">
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

   selectGrupo(grupo) {
      const pop = document.querySelector('.pop-conten');
      const inputsElement = document.querySelector('.content-inputs');
      const htpEstudy = document.querySelector('.htp-estudy');
      const hapEstudyValue = document.querySelector('input[name="estudy-HAP"]');
      const htecEstudyValue = document.querySelector('input[name="estudy-HTCE"]');
      const grupoSelected = veeva.calculadora.referencias.grupos.find(g => g.name === grupo);
      pop.classList.replace('pop-animate-up', 'pop-animate-down');
      if (grupoSelected) {
         hapEstudyValue.value = `${grupoSelected.name} - ${grupoSelected.HAP}`;
         htecEstudyValue.value = `${grupoSelected.name} - ${grupoSelected.HTEC}`;
         const { HAP, HTEC, name } = grupoSelected;
         veeva.calculadora.grupos = { ...veeva.calculadora.grupos, HAP, HTEC, study: name };
         setTimeout(() => {
            pop.classList.replace('flex', 'hidden');
            inputsElement.classList.replace('hidden', 'flex');
            htpEstudy.classList.replace('hidden', 'grid');
         }, 500);
      } else {
         console.error('Grupo no encontrado:', grupo);
      }
   },

   validarForm() {
      const { poblacion, grupos } = veeva.calculadora;
      const toggleError = (selector, condition) => {
         document.querySelector(selector).classList.replace(condition ? 'hidden' : 'block', condition ? 'block' : 'hidden');
      };
      toggleError('.input-poblacion .error', poblacion === 0);
      if (grupos.conoceDistribucion) {
         const hapInput = document.querySelector('input[name="edit-HAP"]');
         const htecInput = document.querySelector('input[name="edit-HTCE"]');
         const hapEditValue = parseFloat(hapInput.value.replace(',', '.'));
         const htecEditValue = parseFloat(htecInput.value.replace(',', '.'));
         toggleError('.hap-error', !hapInput.value);
         toggleError('.htce-error', !htecInput.value);
         const inputsNotEmpty = hapInput.value && htecInput.value;
         const sumNot100 = hapEditValue + htecEditValue !== 100;
         if (inputsNotEmpty && sumNot100) {
            toggleError('.grupos-error', true);
         } else if (inputsNotEmpty && !sumNot100) {
            toggleError('.grupos-error', false);
            grupos.HAP = hapEditValue;
            grupos.HTEC = htecEditValue;
            if (poblacion !== 0) {
               localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
               setTimeout(() => {
                  slideCinco.jumpToSlide('06');
               }, 800);
            }
         }
      } else if (poblacion !== 0) {
         localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
         setTimeout(() => {
            slideCinco.jumpToSlide('06');
         }, 800);
      }
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
      let inputValue;
      event.target.id === 'poblacion' ? inputValue = event.target.value.replace(/[^\d]/g, '') : inputValue = event.target.value.replace(/[^\d,]/g, '');
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

   handleBlur: function (event) {
      if (event.target.value !== '') {
         let inputValue = event.target.value.replace(/[^\d,.]/g, '');
         veeva.calculadora.poblacion = parseInt(event.target.value);
         event.target.value = slideCinco.formatNumber(inputValue);
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
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide("${veeva.zipName}${slide}.zip", "${veeva.presentationCode}")`;
         } else {
            document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {
   slideCinco.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideCinco.ini();
   });
});


