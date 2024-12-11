"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By: Julio Calderón
 * last modified: 2024-12-12
 */
let veeva = {};
let slideTres = {
   loadConfig: function () {
      return fetch("js/config.json")
         .then((response) => response.json())
         .then((data) => {
            veeva = data;
         })
         .catch((error) => {
            console.error("Error al cargar la configuración:", error);
         });
   },
   uploadPages: async function (maxPages) {
      try {
         const imageFiles = [];
         for (let i = 1; i <= maxPages; i++) {
            const pageNumber = i.toString().padStart(2, "0");
            imageFiles.push(`page${pageNumber}.jpg`);
         }
         const contentsDiv = document.querySelector(".contents");
         contentsDiv.innerHTML = "";
         imageFiles.sort((a, b) => {
            const numA = parseInt(/page(\d+)\.jpg/.exec(a)[1], 10);
            const numB = parseInt(/page(\d+)\.jpg/.exec(b)[1], 10);
            return numA - numB;
         });
         imageFiles.forEach((file) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/marcoTeorico/${file}`;
            imgElement.alt = `Marco teórico ${file}`;
            contentsDiv.appendChild(imgElement);
         });
      } catch (error) {
         console.error("Error al cargar las imágenes:", error);
      }
   },
   jumptoSlide: function (slide) {
      localStorage.setItem("previousSlide", veeva.slide);
      const isIpad = /iPad/.test(navigator.userAgent) || (navigator.userAgentData && navigator.userAgentData.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (typeof veeva !== 'undefined') {
         if (isIpad) {
            document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip, ${veeva.presentationCode})`;
         } else if (localStorage.getItem("ambiente") === "local") {
            window.location.href = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         } else {
            window.location.href = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
         }
      } else {
         console.error('Error al cargar la configuración');
      }
   },

   jumToDoc: function (doc, zip) {
      if (veeva?.gotoSlide) {
         document.location = `veeva:gotoSlide(${doc}.zip,${zip})`;
      } else {
         alert(`Estas abriendo el documento: ${doc}.zip, presentación: ${zip}`);
      }
   },
};

document.addEventListener('DOMContentLoaded', function () {
   slideTres.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideTres.uploadPages(26);
   });
});