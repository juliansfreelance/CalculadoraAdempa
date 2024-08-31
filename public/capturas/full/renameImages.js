const fs = require("fs");
const path = require("path");

// Directorio donde están las imágenes
const directoryPath = __dirname; // Cambia esto a la ruta de tu directorio si es necesario

fs.readdir(directoryPath, (err, files) => {
   if (err) {
      console.error("No se pudo listar el directorio.", err);
      return;
   }

   // Filtrar los archivos que cumplen con el patrón esperado
   const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".jpg" || ext === ".png"; // Ajusta las extensiones si es necesario
   });

   imageFiles.forEach((file) => {
      const oldPath = path.join(directoryPath, file);

      // Extraer el número de la parte del nombre del archivo (antes de la extensión)
      const match = file.match(/^(\d+)\.(jpg|png)$/);
      if (match) {
         const number = match[1]; // El número extraído
         const newFileName = `av_calculadora_adempas_${String(number).padStart(2,"0")}-full${path.extname(file)}`;
         const newPath = path.join(directoryPath, newFileName);

         fs.rename(oldPath, newPath, (err) => {
            if (err) {
               console.error(`Error renombrando el archivo ${file}:`, err);
            } else {
               console.log(`Renombrado ${file} a ${newFileName}`);
            }
         });
      } else {
         console.log(`El archivo ${file} no sigue el patrón esperado`);
      }
   });
});
//para ejecutar terminal de Node, ruta hacia el archivo y llamar al archivo: node renameImages.js

