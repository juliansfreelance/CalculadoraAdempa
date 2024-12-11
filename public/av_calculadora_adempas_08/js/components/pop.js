class customPop extends HTMLElement{
   constructor() {
      super();
      this.type = '';
   }

   static get observedAttributes() {
      return ['type'];
   }

   formatToFloatString(value) {
      let floatValue = parseFloat(value).toFixed(2);
      return floatValue.replace('.', ',');
   }

   getTerapias(terapias) {
      let terapiasHTML = '';
      terapias.forEach((terapia, i) => {
         if (terapia && terapia.nombre) {
            terapiasHTML += `
               <tr>
                  <td>${terapia.nombre}</td>
                  <td><custom-input name="${this.type}-${i}-bajo" type="edit" icon="porcentaje" valor="${this.formatToFloatString(terapia.bajo)}"></custom-input></td>
                  <td><custom-input name="${this.type}-${i}-intermedio" type="edit" icon="porcentaje" valor="${this.formatToFloatString(terapia.intermedio)}"></custom-input></td>
                  <td><custom-input name="${this.type}-${i}-alto" type="edit" icon="porcentaje" valor="${this.formatToFloatString(terapia.alto)}"></custom-input></td>
               </tr>`;
         }
      });
      return terapiasHTML;
   }

   attributeChangedCallback(nameAttr, oldValue, newValue) {
      switch (nameAttr) {
         case "type":
            this.type = newValue;
            break;
      }
   }

   connectedCallback() {
      document.addEventListener('configLoaded', () => {
         const { type } = this;
         const terapia = {
            monoterapia: veeva.calculadora.tecnologias.monoterapias,
            biterapia: veeva.calculadora.tecnologias.terapiasDobles,
            triterapia: veeva.calculadora.tecnologias.terapiasTripes,
         }[type] || null;

         this.innerHTML = `
         <section class="pop-conten">
            <section class="pop animate-fade-in-up animate-delay-100 animate-duration-slow">
               <div class="pop-form">
                  <table class="w-full table-auto">
                     <thead>
                        <tr>
                           <th></th>
                           <th class="font-bold text-base text-green-500 text-center">Estadificación riesgo Bajo</th>
                           <th class="font-bold text-base text-text-intermedio text-center">Estadificación riesgo Intermedio</th>
                           <th class="font-bold text-base text-red-500 text-center">Estadificación riesgo Alto</th>
                        </tr>
                     </thead>
                     <tbody>
                        ${this.getTerapias(terapia.terapias)}
                     </tbody>
                  </table>
               </div>
               <div class="pop-label">
                  <div>
                     <h4>${terapia.title}</h4>
                     <button onclick="javascript:slideOcho.popDown('${this.type}')" class="text-red-600 shadow-md rounded-full bg-white h-fit">
                        <svg class="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                           <path fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                              clip-rule="evenodd" />
                        </svg>
                     </button>
                  </div>
               </div>
            </section>
         </section>`;
         slideOcho.updateInputTecnologias();
      });
   }
}
window.customElements.define("custom-pop", customPop);