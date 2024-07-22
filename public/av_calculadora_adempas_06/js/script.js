"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideSeis = {

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         slideSeis.openAlert('bd-clear');
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
         case 'ref-tecnologias':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
            break;

         case 'ref-complicaciones':
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

      monoterapiaBajo.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.bajo);
      monoterapiaIntermedio.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.intermedio);
      monoterapiaAlto.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.monoterapias.alto);

      dobleBajo.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.bajo);
      dobleIntermedio.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.intermedio);
      dobleAlto.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasDobles.alto);

      tripleBajo.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.bajo);
      tripleIntermedio.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.intermedio);
      tripleAlto.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.terapiasTripes.alto);

      totalRiesgoBajo.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoBajo);
      totalRiesgoIntermedio.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoIntermedio);
      totalRiesgoAlto.value = slideSeis.formatToFloatString(veeva.calculadora.tecnologias.totalRiesgoAlto);

      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideSeis.closeAlert();
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
      slideSeis.actualizarInputs()
   },

   syncComplicationsWithReference: function(){
      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideSeis.closeAlert();
         }, 400);
      }
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
               input.value = terapia[riesgo];
            }
         }
      });
      slideSeis.updateInputTecnologias();
   },

   validarForm: function() {
      console.log('Validacion slide 06 pendiente');
      slideSeis.jumpToSlide('07');
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideSeis.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideSeis.ini();
   });
});