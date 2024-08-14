"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideOcho = {
   validateCounnt: 0,
   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         setTimeout(() => {
            slideOcho.openAlert('bd-clear');
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
      slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
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
      switch (alert) {

         case 'ref-microcosteo':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
         break;

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

   formatToFloatMoney: function(value) {
      return slideOcho.formatNumber(parseInt(value));
   },

   formatToFloatString: function (value) {
      let floatValue = parseFloat(value).toFixed(2);
      return floatValue.replace('.', ',');
   },

   updateInputCosts: function () {
      const costos = veeva.calculadora.complicaciones.costos;
      const costTypes = ['bajo', 'intermedio', 'alto'];
      const costGroups = ['costo-1', 'costo-2', 'costo-3'];
      const setValues = (group, values) => {
         costTypes.forEach((type, index) => {
            document.querySelector(`input[name='${group}-${type}']`).value = slideOcho.formatToFloatMoney(values[type]);
         });
      };
      costGroups.forEach((group, index) => {
         setValues(group, costos[index]);
      });
      costTypes.forEach(type => {
         document.querySelector(`input[name='total-${type}']`).value = slideOcho.formatToFloatMoney(costos[3][type]);
      });
      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideOcho.validateCosts();
            slideOcho.closeAlert();
         }, 400);
      }
   },

   syncCostsWithReference: function () {
      const costos = veeva.calculadora.complicaciones.costos;
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const referencias = veeva.calculadora.referencias.complicaciones;

      referencias.costo.forEach((referencia, index) => {
         costos[index].bajo = referencia.bajo;
         costos[index].intermedio = referencia.intermedio;
         costos[index].alto = referencia.alto;
      });
      rubros.forEach((rubro, index) => {
         rubro.bajo = referencias.microcosteo[index].cantidad.bajo;
         rubro.intermedio = referencias.microcosteo[index].cantidad.intermedio;
         rubro.alto = referencias.microcosteo[index].cantidad.alto;
      });
      slideOcho.actualizarInputs()
   },

   actualizarInputs: function () {
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const inputs = document.querySelectorAll('input[name^="microcosteo"]');
      inputs.forEach(input => {
      const name = input.name;
      const [tipo, index, riesgo] = name.split('-');
         input.value = slideOcho.formatToFloatString(rubros[index][riesgo]);
      });
      slideOcho.updateInputCosts();
   },

   validateCosts: function () {
      slideOcho.validateCounnt++;
      const error = document.querySelector('.error-input');
      const errorMicroCost = document.querySelector('.error-microcosteo');
      const getValuesInputs = (names) => {
         return names.map(name => {
            const input = document.querySelector(`input[name="${name}"]`);
            return {
               value: parseFloat(input.value.replace(',', '.')),
               parentTd: input.closest('td')
            };
         });
      };
      const inputs = [
         ...getValuesInputs(['costo-1-bajo', 'costo-1-intermedio', 'costo-1-alto']),
         ...getValuesInputs(['costo-2-bajo', 'costo-2-intermedio', 'costo-2-alto']),
         ...getValuesInputs(['costo-3-bajo', 'costo-3-intermedio', 'costo-3-alto'])
      ]
      const microcosteoInputs = [...getValuesInputs(['costo-3-bajo', 'costo-3-intermedio', 'costo-3-alto'])];
      inputs.forEach(({ value, parentTd }) => {
         value === 0 ? parentTd.classList.add('input-error'): parentTd.classList.remove('input-error');
      });
      inputs.every(({ value }) => value !== 0) ? error.classList.add('hidden') : error.classList.remove('hidden');
      microcosteoInputs.forEach(({ value, parentTd }) => {
         value === 0 ? parentTd.classList.add('input-error') : parentTd.classList.remove('input-error');
      });
      microcosteoInputs.every(({ value }) => value !== 0) ? errorMicroCost.classList.replace('flex', 'hidden') : errorMicroCost.classList.replace('hidden', 'flex');
      const validate = inputs.every(({ value }) => value !== 0) && microcosteoInputs.every(({ value }) => value !== 0);
      return validate;
   },

   validarForm: function() {
      const validateCosts = slideOcho.validateCosts();
      console.log('validacion exitosa', validateCosts);
      if (validateCosts === true) {
         localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
         slideOcho.jumpToSlide('09');
      }
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideOcho.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideOcho.ini();
      setTimeout(() => {
         slideOcho.updateInputCosts();
      }, 1000);
   });
});