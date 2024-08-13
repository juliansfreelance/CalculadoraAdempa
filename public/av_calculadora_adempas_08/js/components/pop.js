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

   getRubros(rubros) {
      let rubrosHTML = '';
      rubros.forEach((rubro, i) => {
         if (rubro && rubro.nombre) {
            rubrosHTML += `
               <tr>
                  <td>${rubro.nombre}</td>
                  <td><custom-input name="${this.type}-${i}-bajo" type="edit" valor="${this.formatToFloatString(rubro.bajo)}"></custom-input></td>
                  <td><custom-input name="${this.type}-${i}-intermedio" type="edit" valor="${this.formatToFloatString(rubro.intermedio)}"></custom-input></td>
                  <td><custom-input name="${this.type}-${i}-alto" type="edit" valor="${this.formatToFloatString(rubro.alto)}"></custom-input></td>
               </tr>`;
         }
      });
      return rubrosHTML;
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
         const complicaciones = {
            microcosteo: veeva.calculadora.complicaciones.microcosteo,
         }[type] || null;
         console.log(complicaciones.rubros);

         this.innerHTML = `
         <section class="pop-conten">
            <section class="pop animate-fade-in-up animate-delay-100 animate-duration-slow">
               <div class="pop-form relative">
                  <table class="thead">
                     <thead>
                        <tr>
                           <th class="font-bold text-base text-orange-400 text-left">Rubro</th>
                           <th class="font-bold text-base text-green-500 text-center">Estadificación riesgo Bajo</th>
                           <th class="font-bold text-base text-cyan-500 text-center">Estadificación riesgo Intermedio</th>
                           <th class="font-bold text-base text-red-500 text-center">Estadificación riesgo Alto</th>
                        </tr>
                     </thead>
                  </table>
                  <table class="w-full">
                     <tbody class="overflow-y-scroll h-[400px] block">
                        ${this.getRubros(complicaciones.rubros)}
                     </tbody>
                  </table>
               </div>
               <div class="pop-label">
                  <div>
                     <h4>${complicaciones.title}</h4>
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
            <article class="w-full text-left text-text-500 text-sm leading-none pt-3"><ul class="list-disc ml-24"><li>Ingrese la cantidad por paciente</li></ul></article>
         </section>`;
         // slideOcho.updateInputTecnologias();
      });
   }
}
window.customElements.define("custom-pop", customPop);