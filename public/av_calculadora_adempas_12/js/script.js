/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
*/
"use strict";
import chartHomeModule from './modules/chartHome.js';
import chartPatientModule from './modules/chartPatient.js';
import chartProceduresModule from './modules/chartProcedures.js';
import chartComplicationsModule from './modules/chartComplications.js';
import chartTecnologyModule from './modules/chartTecnology.js';

let veeva = {};

let slideDoce = {

   ini: function () {
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
         veeva.calculadora = JSON.parse(calculadoraData);
         veeva = resolveReferences(veeva);
         slideDoce.getTotalCostsByTechnology();
      } else {
         const alert = document.querySelector('.alert-conten');
         alert.classList.replace('alert-animate-down', 'alert-animate-up');
         setTimeout(() => {
            slideDoce.openAlert('bd-clear');
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

   jumpToSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
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

         case 'reset':
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
            mainElement.classList.replace('z-10', 'z-40');
         }, 560);
         folder.classList.replace('open', 'close');
         contentFolder.classList.replace('fade-in', 'fade-out');
      } else {
         headerElement.classList.replace('z-50', 'z-10');
         mainElement.classList.replace('z-40', 'z-10');
         contentFolder.classList.replace('fade-out', 'fade-in');
         folder.classList.replace('close', 'open');
         slideDoce.chartTecnology();
         slideDoce.chartProcedures();
         slideDoce.chartPatient();
         slideDoce.chartComplications();
      }
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
      slideDoce.updateResult();
   },

   updateResult: function () {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      const { calculadora } = veeva;

      const resPoblacion = document.querySelector("input[name='res-poblacion']");
      resPoblacion.value = calculadora.poblacion;

      const resRiskBajo = document.querySelector("input[name='res-risk-bajo']");
      const resRiskIntermedio = document.querySelector("input[name='res-risk-intermedio']");
      const resRiskAlto = document.querySelector("input[name='res-risk-alto']");
      resRiskBajo.value = calculadora.estadificacionCategoria.bajo;
      resRiskIntermedio.value = calculadora.estadificacionCategoria.intermedio;
      resRiskAlto.value = calculadora.estadificacionCategoria.alto;

      const resPercentBajo = document.querySelector("input[name='res-percent-bajo']");
      const resPercentIntermedio = document.querySelector("input[name='res-percent-intermedio']");
      const resPercentAlto = document.querySelector("input[name='res-percent-alto']");
      const costoPromedio = calculadora.tecnologias.costoPromedio;
      resPercentBajo.value = calculadora.estadificacionPacientes.bajo;
      resPercentIntermedio.value = calculadora.estadificacionPacientes.intermedio;
      resPercentAlto.value = calculadora.estadificacionPacientes.alto;

      const resTecnoBajo = document.querySelector("input[name='res-tecno-bajo']");
      const resTecnoIntermedio = document.querySelector("input[name='res-tecno-intermedio']");
      const resTecnoAlto = document.querySelector("input[name='res-tecno-alto']");
      const resTecnoPromedio = document.querySelector("input[name='res-tecno-promedio']");
      resTecnoBajo.value = FORMAT_ENTERO(costoPromedio.totalRiesgoBajo).format();
      resTecnoIntermedio.value = FORMAT_ENTERO(costoPromedio.totalRiesgoIntermedio).format();
      resTecnoAlto.value = FORMAT_ENTERO(costoPromedio.totalRiesgoAlto).format();
      resTecnoPromedio.value = FORMAT_ENTERO(Math.round((costoPromedio.totalRiesgoBajo + costoPromedio.totalRiesgoIntermedio + costoPromedio.totalRiesgoAlto) / 3)).format();

      const resProcedureBajo = document.querySelector("input[name='res-procedimientos-bajo']");
      const resProcedureIntermedio = document.querySelector("input[name='res-procedimientos-intermedio']");
      const resProcedureAlto = document.querySelector("input[name='res-procedimientos-alto']");
      const resProcedurePromedio = document.querySelector("input[name='res-procedimientos-promedio']");
      const costoProcedimiento = calculadora.procedimientos.totales;
      resProcedureBajo.value = FORMAT_ENTERO(costoProcedimiento.bajo).format();
      resProcedureIntermedio.value = FORMAT_ENTERO(costoProcedimiento.intermedio).format();
      resProcedureAlto.value = FORMAT_ENTERO(costoProcedimiento.alto).format();
      resProcedurePromedio.value = FORMAT_ENTERO(costoProcedimiento.promedio).format();

      const resPatientBajo = document.querySelector("input[name='res-patient-bajo']");
      const resPatientIntermedio = document.querySelector("input[name='res-patient-intermedio']");
      const resPatientAlto = document.querySelector("input[name='res-patient-alto']");
      const resPatientTotal = document.querySelector("input[name='res-patient-total']");
      const resPatientPromedio = document.querySelector("input[name='res-patient-promedio']");
      const resPatientEstBajo = document.querySelector(".patient-estadificacion-bajo");
      const resPatientEstInter = document.querySelector(".patient-estadificacion-intermedio");
      const resPatientEstAlto = document.querySelector(".patient-estadificacion-alto");
      const resPatientTecno = document.querySelector(".patient-represent-tecno");
      const resPatientProced = document.querySelector(".patient-represent-proced");
      const resPatientCompli = document.querySelector(".patient-represent-compli");
      resPatientBajo.value = FORMAT_ENTERO(costoPromedio.totalRiesgoBajo + costoProcedimiento.bajo + veeva.calculadora.complicaciones.costos[3].bajo).format();
      resPatientIntermedio.value = FORMAT_ENTERO(costoPromedio.totalRiesgoIntermedio + costoProcedimiento.intermedio + veeva.calculadora.complicaciones.costos[3].intermedio).format();
      resPatientAlto.value = FORMAT_ENTERO(costoPromedio.totalRiesgoAlto + costoProcedimiento.alto + veeva.calculadora.complicaciones.costos[3].alto).format()
      resPatientPromedio.value = FORMAT_ENTERO(Math.round((parseInt(resPatientBajo.value.replace(/\./g, '')) + parseInt(resPatientIntermedio.value.replace(/\./g, '')) + parseInt(resPatientAlto.value.replace(/\./g, ''))) / 3)).format();
      resPatientTotal.value = FORMAT_ENTERO(Math.round(parseInt(resPatientBajo.value.replace(/\./g, '')) + parseInt(resPatientIntermedio.value.replace(/\./g, '')) + parseInt(resPatientAlto.value.replace(/\./g, '')))).format();
      resPatientEstBajo.innerHTML = Math.round((parseInt(resPatientBajo.value.replace(/\./g, '')) / parseInt(resPatientTotal.value.replace(/\./g, ''))) * 100);
      resPatientEstInter.innerHTML = Math.round((parseInt(resPatientIntermedio.value.replace(/\./g, '')) / parseInt(resPatientTotal.value.replace(/\./g, ''))) * 100);
      resPatientEstAlto.innerHTML = Math.round((parseInt(resPatientAlto.value.replace(/\./g, '')) / parseInt(resPatientTotal.value.replace(/\./g, ''))) * 100);
      resPatientTecno.innerHTML = Math.round((parseInt(resTecnoPromedio.value.replace(/\./g, '')) / parseInt(resPatientPromedio.value.replace(/\./g, ''))) * 100);
      resPatientProced.innerHTML = Math.round((parseInt(resProcedurePromedio.value.replace(/\./g, '')) / parseInt(resPatientPromedio.value.replace(/\./g, ''))) * 100);
      let promedioComplicaciones = ((veeva.calculadora.complicaciones.costos[3].bajo + veeva.calculadora.complicaciones.costos[3].intermedio + veeva.calculadora.complicaciones.costos[3].alto) / 3);
      resPatientCompli.innerHTML = Math.round((promedioComplicaciones / parseInt(resPatientPromedio.value.replace(/\./g, ''))) * 100);

      const costosCompli = calculadora.complicaciones.costos;
      const resCompliOneBajo = document.querySelector("input[name='res-compli-1-bajo']");
      const resCompliOneIntermedio = document.querySelector("input[name='res-compli-1-intermedio']");
      const resCompliOneAlto = document.querySelector("input[name='res-compli-1-alto']");
      const resCompliOneTotal = document.querySelector("input[name='res-compli-1-total']");
      resCompliOneBajo.value = FORMAT_ENTERO(costosCompli[0].bajo).format();
      resCompliOneIntermedio.value = FORMAT_ENTERO(costosCompli[0].intermedio).format();
      resCompliOneAlto.value = FORMAT_ENTERO(costosCompli[0].alto).format();
      resCompliOneTotal.value = FORMAT_ENTERO(Math.round((costosCompli[0].bajo + costosCompli[0].intermedio + costosCompli[0].alto) / 3)).format();

      const resCompliTwoBajo = document.querySelector("input[name='res-compli-2-bajo']");
      const resCompliTwoIntermedio = document.querySelector("input[name='res-compli-2-intermedio']");
      const resCompliTwoAlto = document.querySelector("input[name='res-compli-2-alto']");
      const resCompliTwoTotal = document.querySelector("input[name='res-compli-2-total']");
      resCompliTwoBajo.value = FORMAT_ENTERO(costosCompli[1].bajo).format();
      resCompliTwoIntermedio.value = FORMAT_ENTERO(costosCompli[1].intermedio).format();
      resCompliTwoAlto.value = FORMAT_ENTERO(costosCompli[1].alto).format();
      resCompliTwoTotal.value = FORMAT_ENTERO(Math.round((costosCompli[1].bajo + costosCompli[1].intermedio + costosCompli[1].alto) / 3)).format();

      const resCompliThreeBajo = document.querySelector("input[name='res-compli-3-bajo']");
      const resCompliThreeIntermedio = document.querySelector("input[name='res-compli-3-intermedio']");
      const resCompliThreeAlto = document.querySelector("input[name='res-compli-3-alto']");
      const resCompliThreeTotal = document.querySelector("input[name='res-compli-3-total']");
      resCompliThreeBajo.value = FORMAT_ENTERO(costosCompli[2].bajo).format();
      resCompliThreeIntermedio.value = FORMAT_ENTERO(costosCompli[2].intermedio).format();
      resCompliThreeAlto.value = FORMAT_ENTERO(costosCompli[2].alto).format();
      resCompliThreeTotal.value = FORMAT_ENTERO(Math.round((costosCompli[2].bajo + costosCompli[2].intermedio + costosCompli[2].alto) / 3)).format();

      const resCompliTotalBajo = document.querySelector("input[name='res-compli-total-bajo']");
      const resCompliTotalIntermedio = document.querySelector("input[name='res-compli-total-intermedio']");
      const resCompliTotalAlto = document.querySelector("input[name='res-compli-total-alto']");
      const resCompliTotalTotal = document.querySelector("input[name='res-compli-total-total']");
      resCompliTotalBajo.value = FORMAT_ENTERO(costosCompli[3].bajo).format();
      resCompliTotalIntermedio.value = FORMAT_ENTERO(costosCompli[3].intermedio).format();
      resCompliTotalAlto.value = FORMAT_ENTERO(costosCompli[3].alto).format();
      resCompliTotalTotal.value = FORMAT_ENTERO(Math.round((costosCompli[3].bajo + costosCompli[3].intermedio + costosCompli[3].alto) / 3)).format();

      const resCompliVsBajo = document.querySelector("input[name='res-compli-vs-bajo']");
      const resCompliVsIntermedio = document.querySelector("input[name='res-compli-vs-intermedio']");
      const resCompliVsAlto = document.querySelector("input[name='res-compli-vs-alto']");
      resCompliVsBajo.value = Math.round((parseInt(resCompliTotalBajo.value.replace(/\./g, '')) / parseInt(resCompliTotalTotal.value.replace(/\./g, ''))) * 100);
      resCompliVsIntermedio.value = Math.round((parseInt(resCompliTotalIntermedio.value.replace(/\./g, '')) / parseInt(resCompliTotalTotal.value.replace(/\./g, ''))) * 100);
      resCompliVsAlto.value = Math.round((parseInt(resCompliTotalAlto.value.replace(/\./g, '')) / parseInt(resCompliTotalTotal.value.replace(/\./g, ''))) * 100);

      const resCompliAltoPromedio = document.querySelector("input[name='res-compli-alto-promedio']");
      resCompliAltoPromedio.value = Math.round((costosCompli[2].alto / parseInt(resPatientPromedio.value.replace(/\./g, ''))) * 100);

      calculadora.chartOptions.chartComplications.valores = [costosCompli[3].bajo, costosCompli[3].intermedio, costosCompli[3].alto];

      const resCohortePacienteOneBajo = document.querySelector("input[name='res-cohorte-1-1-bajo']");
      const resCohortePacienteOneIntermedio = document.querySelector("input[name='res-cohorte-1-1-intermedio']");
      const resCohortePacienteOneAlto = document.querySelector("input[name='res-cohorte-1-1-alto']");
      const resCohortePacienteOneTotal = document.querySelector("input[name='res-cohorte-1-1-total']");
      resCohortePacienteOneBajo.value = Math.ceil((calculadora.estadificacionCategoria.bajo * calculadora.complicaciones.probabilidades[0].bajo)/100);
      resCohortePacienteOneIntermedio.value = Math.ceil((calculadora.estadificacionCategoria.intermedio * calculadora.complicaciones.probabilidades[0].intermedio)/100);
      resCohortePacienteOneAlto.value = Math.ceil((calculadora.estadificacionCategoria.alto * calculadora.complicaciones.probabilidades[0].alto)/100);
      resCohortePacienteOneTotal.value = parseInt(resCohortePacienteOneBajo.value) + parseInt(resCohortePacienteOneIntermedio.value) + parseInt(resCohortePacienteOneAlto.value);

      const resCohortePacienteTwoBajo = document.querySelector("input[name='res-cohorte-1-2-bajo']");
      const resCohortePacienteTwoIntermedio = document.querySelector("input[name='res-cohorte-1-2-intermedio']");
      const resCohortePacienteTwoAlto = document.querySelector("input[name='res-cohorte-1-2-alto']");
      const resCohortePacienteTwoTotal = document.querySelector("input[name='res-cohorte-1-2-total']");
      resCohortePacienteTwoBajo.value = Math.ceil((calculadora.estadificacionCategoria.bajo * calculadora.complicaciones.probabilidades[1].bajo) / 100);
      resCohortePacienteTwoIntermedio.value = Math.ceil((calculadora.estadificacionCategoria.intermedio * calculadora.complicaciones.probabilidades[1].intermedio) / 100);
      resCohortePacienteTwoAlto.value = Math.ceil((calculadora.estadificacionCategoria.alto * calculadora.complicaciones.probabilidades[1].alto) / 100);
      resCohortePacienteTwoTotal.value = parseInt(resCohortePacienteTwoBajo.value) + parseInt(resCohortePacienteTwoIntermedio.value) + parseInt(resCohortePacienteTwoAlto.value);

      const resCohortePacienteThreeBajo = document.querySelector("input[name='res-cohorte-1-3-bajo']");
      const resCohortePacienteThreeIntermedio = document.querySelector("input[name='res-cohorte-1-3-intermedio']");
      const resCohortePacienteThreeAlto = document.querySelector("input[name='res-cohorte-1-3-alto']");
      const resCohortePacienteThreeTotal = document.querySelector("input[name='res-cohorte-1-3-total']");
      resCohortePacienteThreeBajo.value = Math.ceil((calculadora.estadificacionCategoria.bajo * calculadora.complicaciones.probabilidades[2].bajo) / 100);
      resCohortePacienteThreeIntermedio.value = Math.ceil((calculadora.estadificacionCategoria.intermedio * calculadora.complicaciones.probabilidades[2].intermedio) / 100);
      resCohortePacienteThreeAlto.value = Math.ceil((calculadora.estadificacionCategoria.alto * calculadora.complicaciones.probabilidades[2].alto) / 100);
      resCohortePacienteThreeTotal.value = parseInt(resCohortePacienteThreeBajo.value) + parseInt(resCohortePacienteThreeIntermedio.value) + parseInt(resCohortePacienteThreeAlto.value);

      const resCohorteComplicationOneBajo = document.querySelector("input[name='res-cohorte-2-1-bajo']");
      const resCohorteComplicationOneIntermedio = document.querySelector("input[name='res-cohorte-2-1-intermedio']");
      const resCohorteComplicationOneAlto = document.querySelector("input[name='res-cohorte-2-1-alto']");
      const resCohorteComplicationOneTotal = document.querySelector("input[name='res-cohorte-2-1-total']");
      resCohorteComplicationOneBajo.value = FORMAT_ENTERO(calculadora.complicaciones.costos[0].bajo * parseInt(resCohortePacienteOneBajo.value)).format();
      resCohorteComplicationOneIntermedio.value = FORMAT_ENTERO(calculadora.complicaciones.costos[0].intermedio * parseInt(resCohortePacienteOneIntermedio.value)).format();
      resCohorteComplicationOneAlto.value = FORMAT_ENTERO(calculadora.complicaciones.costos[0].alto * parseInt(resCohortePacienteOneAlto.value)).format();
      resCohorteComplicationOneTotal.value = FORMAT_ENTERO(parseInt(resCohorteComplicationOneBajo.value.replace(/\./g, '')) + parseInt(resCohorteComplicationOneIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteComplicationOneAlto.value.replace(/\./g, ''))).format();

      const resCohorteComplicationTwoBajo = document.querySelector("input[name='res-cohorte-2-2-bajo']");
      const resCohorteComplicationTwoIntermedio = document.querySelector("input[name='res-cohorte-2-2-intermedio']");
      const resCohorteComplicationTwoAlto = document.querySelector("input[name='res-cohorte-2-2-alto']");
      const resCohorteComplicationTwoTotal = document.querySelector("input[name='res-cohorte-2-2-total']");
      resCohorteComplicationTwoBajo.value = FORMAT_ENTERO(calculadora.complicaciones.costos[1].bajo * parseInt(resCohortePacienteTwoBajo.value)).format();
      resCohorteComplicationTwoIntermedio.value = FORMAT_ENTERO(calculadora.complicaciones.costos[1].intermedio * parseInt(resCohortePacienteTwoIntermedio.value)).format();
      resCohorteComplicationTwoAlto.value = FORMAT_ENTERO(calculadora.complicaciones.costos[1].alto * parseInt(resCohortePacienteTwoAlto.value)).format();
      resCohorteComplicationTwoTotal.value = FORMAT_ENTERO(parseInt(resCohorteComplicationTwoBajo.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoAlto.value.replace(/\./g, ''))).format();

      const resCohorteComplicationThreeBajo = document.querySelector("input[name='res-cohorte-2-3-bajo']");
      const resCohorteComplicationThreeIntermedio = document.querySelector("input[name='res-cohorte-2-3-intermedio']");
      const resCohorteComplicationThreeAlto = document.querySelector("input[name='res-cohorte-2-3-alto']");
      const resCohorteComplicationThreeTotal = document.querySelector("input[name='res-cohorte-2-3-total']");
      resCohorteComplicationThreeBajo.value = FORMAT_ENTERO(calculadora.complicaciones.costos[2].bajo * parseInt(resCohortePacienteThreeBajo.value)).format();
      resCohorteComplicationThreeIntermedio.value = FORMAT_ENTERO(calculadora.complicaciones.costos[2].intermedio * parseInt(resCohortePacienteThreeIntermedio.value)).format();
      resCohorteComplicationThreeAlto.value = FORMAT_ENTERO(calculadora.complicaciones.costos[2].alto * parseInt(resCohortePacienteThreeAlto.value)).format();
      resCohorteComplicationThreeTotal.value = FORMAT_ENTERO(parseInt(resCohorteComplicationThreeBajo.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeAlto.value.replace(/\./g, ''))).format();

      const resCohorteComplicationFourBajo = document.querySelector("input[name='res-cohorte-2-4-bajo']");
      const resCohorteComplicationFourIntermedio = document.querySelector("input[name='res-cohorte-2-4-intermedio']");
      const resCohorteComplicationFourAlto = document.querySelector("input[name='res-cohorte-2-4-alto']");
      const resCohorteComplicationFourTotal = document.querySelector("input[name='res-cohorte-2-4-total']");
      resCohorteComplicationFourBajo.value = FORMAT_ENTERO(parseInt(resCohorteComplicationOneBajo.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoBajo.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeBajo.value.replace(/\./g, ''))).format();
      resCohorteComplicationFourIntermedio.value = FORMAT_ENTERO(parseInt(resCohorteComplicationOneIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeIntermedio.value.replace(/\./g, ''))).format();
      resCohorteComplicationFourAlto.value = FORMAT_ENTERO(parseInt(resCohorteComplicationOneAlto.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoAlto.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeAlto.value.replace(/\./g, ''))).format();
      resCohorteComplicationFourTotal.value = FORMAT_ENTERO(parseInt(resCohorteComplicationOneTotal.value.replace(/\./g, '')) + parseInt(resCohorteComplicationTwoTotal.value.replace(/\./g, '')) + parseInt(resCohorteComplicationThreeTotal.value.replace(/\./g, ''))).format();

      const resCohorteTotalBajo = document.querySelector("input[name='res-cohorte-3-1-bajo']");
      const resCohorteTotalIntermedio = document.querySelector("input[name='res-cohorte-3-1-intermedio']");
      const resCohorteTotalAlto = document.querySelector("input[name='res-cohorte-3-1-alto']");
      const resCohorteTotalTotal = document.querySelector("input[name='res-cohorte-3-1-total']");
      resCohorteTotalBajo.value = FORMAT_ENTERO((calculadora.estadificacionCategoria.bajo * costoPromedio.totalRiesgoBajo) + (calculadora.estadificacionCategoria.bajo * costoProcedimiento.bajo) + parseInt(resCohorteComplicationFourBajo.value.replace(/\./g, ''))).format();
      resCohorteTotalIntermedio.value = FORMAT_ENTERO((calculadora.estadificacionCategoria.intermedio * costoPromedio.totalRiesgoIntermedio) + (calculadora.estadificacionCategoria.intermedio * costoProcedimiento.intermedio) + parseInt(resCohorteComplicationFourIntermedio.value.replace(/\./g, ''))).format();
      resCohorteTotalAlto.value = FORMAT_ENTERO((calculadora.estadificacionCategoria.alto * costoPromedio.totalRiesgoAlto) + (calculadora.estadificacionCategoria.alto * costoProcedimiento.alto) + parseInt(resCohorteComplicationFourAlto.value.replace(/\./g, ''))).format();
      resCohorteTotalTotal.value = FORMAT_ENTERO(parseInt(resCohorteTotalBajo.value.replace(/\./g, '')) + parseInt(resCohorteTotalIntermedio.value.replace(/\./g, '')) + parseInt(resCohorteTotalAlto.value.replace(/\./g, ''))).format();

      const resCohortePorcentajeBajo = document.querySelector("input[name='res-cohorte-3-2-bajo']");
      const resCohortePorcentajeIntermedio = document.querySelector("input[name='res-cohorte-3-2-intermedio']");
      const resCohortePorcentajeAlto = document.querySelector("input[name='res-cohorte-3-2-alto']");
      resCohortePorcentajeBajo.value = FORMAT_ENTERO(Math.round(parseInt(resCohorteTotalBajo.value.replace(/\./g, '')) / parseInt(resCohorteTotalTotal.value.replace(/\./g, '')) * 100)).format();
      resCohortePorcentajeIntermedio.value = FORMAT_ENTERO(Math.round(parseInt(resCohorteTotalIntermedio.value.replace(/\./g, '')) / parseInt(resCohorteTotalTotal.value.replace(/\./g, '')) * 100)).format();
      resCohortePorcentajeAlto.value = FORMAT_ENTERO(Math.floor(parseInt(resCohorteTotalAlto.value.replace(/\./g, '')) / parseInt(resCohorteTotalTotal.value.replace(/\./g, '')) * 100)).format();

      calculadora.chartOptions.chartPatient.valores = [parseInt(resPatientBajo.value.replace(/\./g, '')), parseInt(resPatientIntermedio.value.replace(/\./g, '')), parseInt(resPatientAlto.value.replace(/\./g, ''))]
      slideDoce.chartIni();
   },

   chartIni: function () {
      const chartContainer = document.querySelector('.chart-home');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartHome" class="chart-animate-fade-in"></canvas>`;
         chartHomeModule.chartIni(veeva);
      }, 1600);
   },

   chartPatient: function () {
      const chartContainer = document.querySelector('.chart-patient');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartPatient" class="chart-animate-fade-in"></canvas>`;
         chartPatientModule.chartPatient(veeva);
      }, 600);
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
   },

   chartComplications: function () {
      const chartContainer = document.querySelector('.chart-complications');
      setTimeout(() => {
         chartContainer.innerHTML = `<canvas id="chartComplications" class="chart-animate-fade-in"></canvas>`;
         chartComplicationsModule.chartComplications(veeva);
      }, 600);
   }
};

window.slideDoce = slideDoce;
window.veeva = veeva;

document.addEventListener('DOMContentLoaded', function () {
   slideDoce.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideDoce.ini();
   });
});