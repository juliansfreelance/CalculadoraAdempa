"use strict";
let veeva = {};
let slideTres = {
   loadConfig: function () {
      return fetch('js/config.json')
         .then(response => response.json())
         .then(data => {
            veeva = data;
         })
         .catch(error => {
            console.error('Error al cargar la configuración:', error);
         });
   },
   uploadPages: async function () {
      try {
         // Obtener la lista de archivos en el directorio 'marcoTeorico'
         const response = await fetch('images/marcoTeorico/');
         const fileList = await response.text();

         // Parsear el listado de archivos (esto depende del formato de respuesta de tu servidor)
         // Este ejemplo asume que obtienes una lista de archivos en formato HTML, JSON, etc.
         const parser = new DOMParser();
         const doc = parser.parseFromString(fileList, 'text/html');
         const links = doc.querySelectorAll('a'); // Suponiendo que los archivos están listados como enlaces

         const imageFiles = Array.from(links)
            .map(link => link.getAttribute('href'))
            .filter(href => href.endsWith('.jpg'))
            .sort((a, b) => {
               // Extraer el número del archivo y ordenar
               const numA = parseInt(a.match(/page(\d+)\.jpg/)[1], 10);
               const numB = parseInt(b.match(/page(\d+)\.jpg/)[1], 10);
               return numA - numB;
            });

         const contentsDiv = document.querySelector('.contents');
         contentsDiv.innerHTML = ''; // Limpiar el contenido previo

         imageFiles.forEach(file => {
            const cleanedPath = file.substring(1);
            const parts = cleanedPath.split("/");
            file = parts.pop();
            const imgElement = document.createElement('img');
            imgElement.src = `./images/marcoTeorico/${file}`;
            imgElement.alt = `Marco teórico ${file}`;
            contentsDiv.appendChild(imgElement);
         });
      } catch (error) {
         console.error('Error al cargar las imágenes:', error);
      }
   },
   jumptoSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   },
   jumToDoc: function (doc, zip) {
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${doc}.zip,${zip})`;
      } else {
         alert(`Estas abriendo el documento: ${doc}.zip, presentación: ${zip}`);
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {
   slideTres.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideTres.uploadPages();
   });
});