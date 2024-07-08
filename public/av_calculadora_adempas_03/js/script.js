"use strict";
let veeva = {};

function loadConfig() {
   return fetch('js/config.json')
      .then(response => response.json())
      .then(data => {
         veeva = data;
      })
      .catch(error => {
         console.error('Error al cargar la configuración:', error);
      });
}
function uploadDocuments(enlaces) {
   let containerBotonesHTML = document.getElementById('container');
   enlaces.forEach((enlace, index) => {
      let btn = `
      <div class="btn-enlaces animate-fade-in-up delay-${index+1} animate-duration-slower">
         <div></div>
         <button onclick="javascript:jumToDoc('${enlace.zipName}', '${enlace.presentationCode}')"
            style="background-color: ${enlace.color}">
            <h5>${enlace.docName}</h5>
         </button>
      </div>`;
      containerBotonesHTML.insertAdjacentHTML('beforeend', btn);
   });
}
function jumptoSlide(slide) {
   if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
      document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
   } else {
      document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
   }
}
function jumToDoc(doc, zip) {
   if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
      document.location = `veeva:gotoSlide(${doc}.zip,${zip})`;
   } else {
      alert(`Estas abriendo el documento: ${doc}.zip, presentación: ${zip}`);
   }
}

document.addEventListener('DOMContentLoaded', function () {
   loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      uploadDocuments(veeva.enlaces);
   });
});