"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideDiez = {
   validateCounnt: 0,
   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         setTimeout(() => {
            slideDiez.openAlert('bd-clear');
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

   calcComplicationsRef: function () {
      const costo = veeva.calculadora.referencias.complicaciones.costo;
      const frecuencias = veeva.calculadora.referencias.complicaciones.frecuencia;
      const microcosteo = veeva.calculadora.referencias.complicaciones.microcosteo;

      frecuencias.forEach((frecuencia, index) => {
         costo[index].bajo = frecuencia.valorUnitario * frecuencia.bajo;
         costo[index].intermedio = frecuencia.valorUnitario * frecuencia.intermedio;
         costo[index].alto = frecuencia.valorUnitario * frecuencia.alto;
      });
      microcosteo.forEach(item => {
         item.costo.bajo = item.valorUnitario * item.cantidad.bajo;
         item.costo.intermedio = item.valorUnitario * item.cantidad.intermedio;
         item.costo.alto = item.valorUnitario * item.cantidad.alto;
         costo[2].bajo += item.costo.bajo;
         costo[2].intermedio += item.costo.intermedio;
         costo[2].alto += item.costo.alto;
      });
      slideDiez.syncValorUnitRubrosWithReference()
   },

   syncValorUnitRubrosWithReference: function () {
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const referencias = veeva.calculadora.referencias.complicaciones;
      rubros.forEach((rubro, index) => {
         rubro.valorUnitario = referencias.microcosteo[index].valorUnitario;
      });
   },

   jumpToSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
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

   updateInputCosts: function () {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      const costos = veeva.calculadora.complicaciones.costos;
      const costTypes = ['bajo', 'intermedio', 'alto'];
      const costGroups = ['costo-1', 'costo-2', 'costo-3'];
      const setValues = (group, values) => {
         costTypes.forEach((type, index) => {
            document.querySelector(`input[name='${group}-${type}']`).value = FORMAT_ENTERO(values[type]).format();
         });
      };
      costGroups.forEach((group, index) => {
         setValues(group, costos[index]);
      });
      costTypes.forEach(type => {
         document.querySelector(`input[name='total-${type}']`).value = FORMAT_ENTERO(costos[3][type]).format();
      });
      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideDiez.validateCosts();
            slideDiez.closeAlert();
         }, 400);
      }
   },

   syncCostsWithReference: function () {
      const costos = veeva.calculadora.complicaciones.costos;
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const referencias = veeva.calculadora.referencias.complicaciones;
      rubros.forEach((rubro, index) => {
         rubro.cantidad.bajo = referencias.microcosteo[index].cantidad.bajo;
         rubro.costo.bajo = referencias.microcosteo[index].costo.bajo;
         rubro.cantidad.intermedio = referencias.microcosteo[index].cantidad.intermedio;
         rubro.costo.intermedio = referencias.microcosteo[index].costo.intermedio;
         rubro.cantidad.alto = referencias.microcosteo[index].cantidad.alto;
         rubro.costo.alto = referencias.microcosteo[index].costo.alto;
      });
      referencias.costo.forEach((referencia, index) => {
         costos[index].bajo = referencia.bajo;
         costos[index].intermedio = referencia.intermedio;
         costos[index].alto = referencia.alto;
      });
      costos[3].bajo = 0; costos[3].intermedio = 0; costos[3].alto = 0
      costos.forEach((costo) => {
         if (costo.nombre !== "Totales") {
            costos[3].bajo += costo.bajo;
            costos[3].intermedio += costo.intermedio;
            costos[3].alto += costo.alto;
         }
      });

      slideDiez.actualizarInputs()
   },

   actualizarInputs: function () {
      const FORMAT_DECIMAL = value => currency(value, { precision: 2, symbol: '', decimal: ',', separator: '.' });
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const inputs = document.querySelectorAll('input[name^="microcosteo"]');
      inputs.forEach(input => {
      const name = input.name;
      const [tipo, index, riesgo] = name.split('-');
         input.value = FORMAT_DECIMAL(rubros[index].cantidad[riesgo]).format();
      });
      slideDiez.updateInputCosts();
   },

   calcMicrocosteo: function () {
      const costo = veeva.calculadora.complicaciones.costos;
      const microcosteo = veeva.calculadora.complicaciones.microcosteo.rubros;
      costo[2].bajo = 0; costo[2].intermedio = 0; costo[2].alto = 0;
      microcosteo.forEach(item => {
         costo[2].bajo += item.costo.bajo;
         costo[2].intermedio += item.costo.intermedio;
         costo[2].alto += item.costo.alto;
      });
   },

   validateCosts: function () {
      slideDiez.validateCounnt++;
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

   validarForm: function () {
      slideDiez.jumpToSlide('11');
      // const validateCosts = slideDiez.validateCosts();
      // console.log('validacion exitosa', validateCosts);
      // if (validateCosts === true) {
      //    localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
      //    slideDiez.jumpToSlide('11');
      // }
   },
   prueba: function () {
      const rubros = veeva.calculadora.complicaciones.microcosteo.rubros;
      const referencias = veeva.calculadora.referencias.complicaciones;
      rubros.forEach((rubro, index) => {
         rubro.cantidad.bajo = referencias.microcosteo[index].cantidad.bajo;
         rubro.costo.bajo = referencias.microcosteo[index].costo.bajo;
         rubro.cantidad.intermedio = referencias.microcosteo[index].cantidad.intermedio;
         rubro.costo.intermedio = referencias.microcosteo[index].costo.intermedio;
         rubro.cantidad.alto = referencias.microcosteo[index].cantidad.alto;
         rubro.costo.alto = referencias.microcosteo[index].costo.alto;
      });
      slideDiez.actualizarInputs();
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideDiez.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideDiez.ini();
      setTimeout(() => {
         slideDiez.calcComplicationsRef();
         slideDiez.updateInputCosts();
      }, 1000);
   });
});