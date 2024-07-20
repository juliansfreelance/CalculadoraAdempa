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
      }
   },

   loadConfig: function() {
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
         document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   },

   popUp: function(pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('hidden', 'pop-animate-down');
         customPop.classList.add('flex', 'pop-animate-up');
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   popDown: function(pop) {
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