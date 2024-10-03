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
   validateCounnt: 0,

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         setTimeout(() => {
            slideSiete.openAlert('bd-clear');
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
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip, ${veeva.presentationCode})`;
         } else {
            document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
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
      switch (alert) {
         case 'ref-tecnologias':
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

   formatToFloatString: function(value) {
      let floatValue = parseFloat(value).toFixed(2);
      return floatValue.replace('.', ',');
   },

   updateInputTecnologias: function () {
      const totalRiesgoBajo = document.querySelector("input[name='total-bajo']");
      const totalRiesgoIntermedio = document.querySelector("input[name='total-intermedio']");
      const totalRiesgoAlto = document.querySelector("input[name='total-alto']");

      const monoterapiaBajo = document.querySelector("input[name='monoterapia-bajo']");
      const monoterapiaIntermedio = document.querySelector("input[name='monoterapia-intermedio']");
      const monoterapiaAlto = document.querySelector("input[name='monoterapia-alto']");

      const dobleBajo = document.querySelector("input[name='doble-bajo']");
      const dobleIntermedio = document.querySelector("input[name='doble-intermedio']");
      const dobleAlto = document.querySelector("input[name='doble-alto']");

      const tripleBajo = document.querySelector("input[name='triple-bajo']");
      const tripleIntermedio = document.querySelector("input[name='triple-intermedio']");
      const tripleAlto = document.querySelector("input[name='triple-alto']");

      monoterapiaBajo.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.bajo);
      monoterapiaIntermedio.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.intermedio);
      monoterapiaAlto.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.alto);

      dobleBajo.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.bajo);
      dobleIntermedio.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.intermedio);
      dobleAlto.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.alto);

      tripleBajo.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.bajo);
      tripleIntermedio.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.intermedio);
      tripleAlto.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.alto);

      totalRiesgoBajo.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoBajo);
      totalRiesgoIntermedio.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoIntermedio);
      totalRiesgoAlto.value = slideSiete.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoAlto);

      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideSiete.validateTecnnology();
            slideSiete.closeAlert();
         }, 400);
      }
   },

   syncTechnologyWithReference: function () {

      const tecnologias = veeva.calculadora.tecnologias;
      const referencias = veeva.calculadora.referencias.tecnologias;

      // Reset totals
      tecnologias.totalRiesgoBajo = 0;
      tecnologias.totalRiesgoIntermedio = 0;
      tecnologias.totalRiesgoAlto = 0;

      // Update monoterapias
      tecnologias.monoterapias.bajo = 0;
      tecnologias.monoterapias.intermedio = 0;
      tecnologias.monoterapias.alto = 0;
      referencias.monoterapias.terapias.forEach((refTerapia, index) => {
         const tecTerapia = tecnologias.monoterapias.terapias[index];
         tecTerapia.bajo = refTerapia.bajo;
         tecTerapia.intermedio = refTerapia.intermedio;
         tecTerapia.alto = refTerapia.alto;

         tecnologias.monoterapias.bajo += tecTerapia.bajo;
         tecnologias.monoterapias.intermedio += tecTerapia.intermedio;
         tecnologias.monoterapias.alto += tecTerapia.alto;

         tecnologias.totalRiesgoBajo += tecTerapia.bajo;
         tecnologias.totalRiesgoIntermedio += tecTerapia.intermedio;
         tecnologias.totalRiesgoAlto += tecTerapia.alto;
      });

      // Update terapias dobles
      tecnologias.terapiasDobles.bajo = 0;
      tecnologias.terapiasDobles.intermedio = 0;
      tecnologias.terapiasDobles.alto = 0;
      referencias.terapiasDobles.terapias.forEach((refTerapia, index) => {
         const tecTerapia = tecnologias.terapiasDobles.terapias[index];
         tecTerapia.bajo = refTerapia.bajo;
         tecTerapia.intermedio = refTerapia.intermedio;
         tecTerapia.alto = refTerapia.alto;

         tecnologias.terapiasDobles.bajo += tecTerapia.bajo;
         tecnologias.terapiasDobles.intermedio += tecTerapia.intermedio;
         tecnologias.terapiasDobles.alto += tecTerapia.alto;

         tecnologias.totalRiesgoBajo += tecTerapia.bajo;
         tecnologias.totalRiesgoIntermedio += tecTerapia.intermedio;
         tecnologias.totalRiesgoAlto += tecTerapia.alto;
      });

      // Update terapias triples
      tecnologias.terapiasTripes.bajo = 0;
      tecnologias.terapiasTripes.intermedio = 0;
      tecnologias.terapiasTripes.alto = 0;
      referencias.terapiasTripes.terapias.forEach((refTerapia, index) => {
         const tecTerapia = tecnologias.terapiasTripes.terapias[index];
         tecTerapia.bajo = refTerapia.bajo;
         tecTerapia.intermedio = refTerapia.intermedio;
         tecTerapia.alto = refTerapia.alto;

         tecnologias.terapiasTripes.bajo += tecTerapia.bajo;
         tecnologias.terapiasTripes.intermedio += tecTerapia.intermedio;
         tecnologias.terapiasTripes.alto += tecTerapia.alto;

         tecnologias.totalRiesgoBajo += tecTerapia.bajo;
         tecnologias.totalRiesgoIntermedio += tecTerapia.intermedio;
         tecnologias.totalRiesgoAlto += tecTerapia.alto;
      });

      console.log("Tecnologías actualizadas:", tecnologias);
      slideSiete.actualizarInputs()
   },

   actualizarInputs: function() {
      const tecnologias = veeva.calculadora.tecnologias;
      const inputs = document.querySelectorAll('input.porcentaje');

      inputs.forEach(input => {
         const name = input.name;
         const [tipo, index, riesgo] = name.split('-');
         const terapiaMap = {
            monoterapia: "monoterapias",
            biterapia: "terapiasDobles",
            triterapia: "terapiasTripes",
         }
         const terapiasName = terapiaMap[tipo] || null;
         if (tecnologias[terapiasName]) {
            const terapia = tecnologias[terapiasName].terapias[index];
            if (terapia) {
               input.value = slideSiete.formatToFloatString(terapia[riesgo]);
            }
         }
      });
      slideSiete.updateInputTecnologias();
   },

   validateTecnnology: function () {
      slideSiete.validateCounnt++;
      const getValues = (names) => {
         return names.map(name => parseFloat(document.querySelector(`input[name="${name}"]`).value.replace(',', '.')));
      };
      const updateErrorState = (selector, hasError) => {
         document.querySelector(selector).classList.replace(hasError ? 'hidden' : 'flex', hasError ? 'flex' : 'hidden');
      };
      const updateValidationState = (selector, hasError) => {
         document.querySelector(selector).classList.replace(hasError ? 'bg-slate-200' : 'bg-red-200', hasError ? 'bg-red-200' : 'bg-slate-200');
         document.querySelector(selector.replace('total', 'error')).classList.replace(hasError ? 'hidden' : 'block', hasError ? 'block' : 'hidden');
      };
      const [monoterapiaBajoValue, monoterapiaIntermedioValue, monoterapiaAltoValue] = getValues(['monoterapia-bajo', 'monoterapia-intermedio', 'monoterapia-alto']);
      const [dobleBajoValue, dobleIntermedioValue, dobleAltoValue] = getValues(['doble-bajo', 'doble-intermedio', 'doble-alto']);
      const [tripleBajoValue, tripleIntermedioValue, tripleAltoValue] = getValues(['triple-bajo', 'triple-intermedio', 'triple-alto']);
      const [totalTecnologyBajoValue, totalTecnologyIntermedioValue, totalTecnologyAltoValue] = getValues(['total-bajo', 'total-intermedio', 'total-alto']);
      const monoterapiaTotal = monoterapiaBajoValue + monoterapiaIntermedioValue + monoterapiaAltoValue;
      const dobleTotal = dobleBajoValue + dobleIntermedioValue + dobleAltoValue;
      const tripleTotal = tripleBajoValue + tripleIntermedioValue + tripleAltoValue;
      updateErrorState('.error-monoterapia', monoterapiaTotal === 0);
      updateErrorState('.error-doble', dobleTotal === 0);
      updateErrorState('.error-triple', tripleTotal === 0);
      if (monoterapiaTotal !== 0 && dobleTotal !== 0 && tripleTotal !== 0) {
         updateValidationState('.total-bajo', totalTecnologyBajoValue !== 100);
         updateValidationState('.total-intermedio', totalTecnologyIntermedioValue !== 100);
         updateValidationState('.total-alto', totalTecnologyAltoValue !== 100);
      }

      let validate = (
         totalTecnologyBajoValue === 100 &&
         totalTecnologyIntermedioValue === 100 &&
         totalTecnologyAltoValue === 100
      );
      return validate;
   },

   validarForm: function() {
      const validateTecnnology = slideSiete.validateTecnnology();
      console.log('validacion exitosa', validateTecnnology);
      if (validateTecnnology === true) {
         localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
         slideSiete.jumpToSlide('08');
      }
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideSiete.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSiete.ini();
   });
});