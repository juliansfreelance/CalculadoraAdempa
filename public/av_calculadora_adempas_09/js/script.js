/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
*/
"use strict";
import chartHomeModule from './modules/chartHome.js';
import chartTecnologyModule from './modules/chartTecnology.js';
import chartProceduresModule from './modules/chartProcedures.js';

let veeva = {};

let slideNueve = {

   ini: async function () {
      const resolveReferences = (obj) => {
         const resolvePath = (path, obj) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
         };
         const traverseAndResolve = (currentObj, rootObj) => {
            for (let key in currentObj) {
               if (typeof currentObj[key] === 'string' && currentObj[key].startsWith('@root.')) {
                  const path = currentObj[key].slice(6);
                  currentObj[key] = resolvePath(path, rootObj);
               } else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                  traverseAndResolve(currentObj[key], rootObj);
               }
            }
         };
         const newObj = JSON.parse(JSON.stringify(obj));
         traverseAndResolve(newObj, newObj);
         return newObj;
      };

      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         veeva = await resolveReferences(veeva);
         slideNueve.getTotalCostsByProcedures();
         slideNueve.getTotalCostsByTechnology();
      } else {
         const alert = document.querySelector('.alert-conten');
         alert.classList.replace('alert-animate-down', 'alert-animate-up');
         setTimeout(() => {
            slideNueve.openAlert('bd-clear');
         }, 1600);
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

   openAlert: function (alert) {
      const customAlert = document.querySelector(`custom-alert[name="alert-${alert}"]`);
      const customAlertConten = document.querySelector(`custom-alert[name="alert-${alert}"] .alert-conten`);
      const customAlertAlert = document.querySelector(`custom-alert[name="alert-${alert}"] .alert`);
      switch (alert) {

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

   toggleFolder: function(folderId) {
      const headerElement = document.querySelector('.slide header');
      const mainElement = document.querySelector('.slide main');
      const contentFolder = document.querySelector('.content-folder');
      const folder = document.getElementById(folderId);
      const openFolders = document.querySelectorAll('.folder.open');
      const chartContainers = document.querySelectorAll('.chart');

      chartContainers.forEach(chartContainer => {
         if (!chartContainer.classList.contains('chart-home')) {
            chartContainer.innerHTML = '';
         }
      });

      openFolders.forEach(openFolder => {
         if (openFolder.id !== folderId) {
            openFolder.classList.replace('open', 'close');
         }
      });
      if (folder.classList.contains('open')) {
         setTimeout(() => {
            headerElement.classList.replace('z-10','z-50');
            mainElement.classList.replace('z-10', 'z-50');
         }, 560);
         folder.classList.replace('open', 'close');
         contentFolder.classList.replace('fade-in', 'fade-out');
      } else {
         headerElement.classList.replace('z-50', 'z-10');
         mainElement.classList.replace('z-50', 'z-10');
         contentFolder.classList.replace('fade-out', 'fade-in');
         folder.classList.replace('close', 'open');
         slideNueve.chartTecnology();
         slideNueve.chartProcedures();
      }
   },

   getTotalCostsByProcedures: function () {
      const { calculadora } = veeva;
      calculadora.procedimientos.bajo = Math.round(((calculadora.referencias.procedimientos.HAP.bajo * calculadora.grupos.HAP) + (calculadora.referencias.procedimientos.HTEC.bajo * calculadora.grupos.HTEC)) / 100);
      calculadora.procedimientos.intermedio = Math.round(((calculadora.referencias.procedimientos.HAP.intermedio * calculadora.grupos.HAP) + (calculadora.referencias.procedimientos.HTEC.intermedio * calculadora.grupos.HTEC)) / 100);
      calculadora.procedimientos.alto = Math.round(((calculadora.referencias.procedimientos.HAP.alto * calculadora.grupos.HAP) + (calculadora.referencias.procedimientos.HTEC.alto * calculadora.grupos.HTEC)) / 100);
      calculadora.procedimientos.promedio = parseFloat(((calculadora.procedimientos.bajo + calculadora.procedimientos.intermedio + calculadora.procedimientos.alto) / 3).toFixed(2));
      calculadora.chartOptions.chartProcedures.valores = [calculadora.procedimientos.bajo, calculadora.procedimientos.intermedio, calculadora.procedimientos.alto];
   },

   getTotalCostsByTechnology: function () {
      const { calculadora } = veeva;
      const costoPromedio = calculadora.tecnologias.costoPromedio;
      const { diasMes, mesesYear } = calculadora.referencias.tecnologias.tecnologia;
      const tecnologias = ['monoterapias', 'terapiasDobles', 'terapiasTripes'];
      const riegos = ['bajo', 'intermedio', 'alto'];
      tecnologias.forEach(type => {
         costoPromedio[type].terapias.forEach((terapia, terapiaIndex) => {
            terapia.tratamientos.forEach(tratamiento => {
               riegos.forEach(riesgo => {
                  const { costoUnitarioPromedio, dosisDia } = calculadora.referencias.tecnologias.tecnologia[tratamiento];
                  const costoDia = costoUnitarioPromedio * dosisDia;
                  const costoMes = costoDia * diasMes;
                  const costoYear = costoMes * mesesYear;
                  const valorRiesgo = calculadora.tecnologias[type].terapias[terapiaIndex][riesgo];
                  const costoTratamiento = (costoYear * valorRiesgo) / 100;
                  const costoTratamientoRounded = Math.round(costoTratamiento);
                  const costoTratamientoFormatted = parseFloat(costoTratamiento.toFixed(2));
                  if (riesgo === 'bajo') {
                     costoPromedio[type].bajo += costoTratamientoRounded;
                     costoPromedio.totalRiesgoBajo += costoTratamientoRounded;
                  } else if (riesgo === 'intermedio') {
                     costoPromedio[type].intermedio += costoTratamientoRounded;
                     costoPromedio.totalRiesgoIntermedio += costoTratamientoRounded;
                  } else if (riesgo === 'alto') {
                     costoPromedio[type].alto += costoTratamientoRounded;
                     costoPromedio.totalRiesgoAlto += costoTratamientoRounded;
                  }
                  costoPromedio[type].terapias[terapiaIndex][riesgo] += costoTratamientoFormatted;
               });
            });
         });
      });
      veeva.calculadora.chartOptions.chartTecnology.valores = [veeva.calculadora.tecnologias.costoPromedio.totalRiesgoBajo, veeva.calculadora.tecnologias.costoPromedio.totalRiesgoIntermedio, veeva.calculadora.tecnologias.costoPromedio.totalRiesgoAlto];
      slideNueve.updateResult();
   },

   updateResult: function () {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      const { calculadora } = veeva;

      const resPoblacion = document.querySelector("input[name='res-poblacion']");

      const resRiskBajo = document.querySelector("input[name='res-risk-bajo']");
      const resRiskIntermedio = document.querySelector("input[name='res-risk-intermedio']");
      const resRiskAlto = document.querySelector("input[name='res-risk-alto']");

      const resPercentBajo = document.querySelector("input[name='res-percent-bajo']");
      const resPercentIntermedio = document.querySelector("input[name='res-percent-intermedio']");
      const resPercentAlto = document.querySelector("input[name='res-percent-alto']");
      const costoPromedio = calculadora.tecnologias.costoPromedio;

      const resTecnoBajo = document.querySelector("input[name='res-tecno-bajo']");
      const resTecnoIntermedio = document.querySelector("input[name='res-tecno-intermedio']");
      const resTecnoAlto = document.querySelector("input[name='res-tecno-alto']");
      const resTecnoPromedio = document.querySelector("input[name='res-tecno-promedio']");

      const resProcedureBajo = document.querySelector("input[name='res-procedimientos-bajo']");
      const resProcedureIntermedio = document.querySelector("input[name='res-procedimientos-intermedio']");
      const resProcedureAlto = document.querySelector("input[name='res-procedimientos-alto']");
      const resProcedurePromedio = document.querySelector("input[name='res-procedimientos-promedio']");
      const costoProcedimiento = calculadora.procedimientos;

      resPoblacion.value = calculadora.poblacion;

      resRiskBajo.value = calculadora.estadificacionCategoria.bajo;
      resRiskIntermedio.value = calculadora.estadificacionCategoria.intermedio;
      resRiskAlto.value = calculadora.estadificacionCategoria.alto;

      resPercentBajo.value = calculadora.estadificacionPacientes.bajo;
      resPercentIntermedio.value = calculadora.estadificacionPacientes.intermedio;
      resPercentAlto.value = calculadora.estadificacionPacientes.alto;

      resTecnoBajo.value = FORMAT_ENTERO(costoPromedio.totalRiesgoBajo).format();
      resTecnoIntermedio.value = FORMAT_ENTERO(costoPromedio.totalRiesgoIntermedio).format();
      resTecnoAlto.value = FORMAT_ENTERO(costoPromedio.totalRiesgoAlto).format();
      resTecnoPromedio.value = FORMAT_ENTERO(Math.round((costoPromedio.totalRiesgoBajo + costoPromedio.totalRiesgoIntermedio + costoPromedio.totalRiesgoAlto) / 3)).format();

      resProcedureBajo.value = FORMAT_ENTERO(costoProcedimiento.bajo).format();
      resProcedureIntermedio.value = FORMAT_ENTERO(costoProcedimiento.intermedio).format();
      resProcedureAlto.value = FORMAT_ENTERO(costoProcedimiento.alto).format();
      resProcedurePromedio.value = FORMAT_ENTERO(costoProcedimiento.promedio).format();

      slideNueve.chartIni();
   },

   chartIni: function () {
      const chartContainer = document.querySelector('.chart-home');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartHome" class="chart-animate-fade-in"></canvas>`;
         chartHomeModule.chartIni(veeva);
      }, 1600);
   },

   chartTecnology: function () {
      const chartContainer = document.querySelector('.chart-tecnology');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartTecnology" class="chart-animate-fade-in"></canvas>`;
         chartTecnologyModule.chartTecnology(veeva);
      }, 600);
   },

   chartProcedures: function () {
      const chartContainer = document.querySelector('.chart-procedures');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartProcedures" class="chart-animate-fade-in"></canvas>`;
         chartProceduresModule.chartProcedures(veeva);
      }, 600);
   }
};

window.slideNueve = slideNueve;
window.veeva = veeva;

document.addEventListener('DOMContentLoaded', function () {
   slideNueve.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideNueve.ini();
   });
});