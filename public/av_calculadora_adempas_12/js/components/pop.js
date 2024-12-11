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

   getRecursos(recursos) {
      let recursosHTML = '';
      recursos.forEach((recurso, i) => {
         recursosHTML += `
            <tr>
               <td>${recurso.recurso}</td>
               <td><custom-input name="${this.type}-${i}" type="calc" icon="money" valor="${this.formatToFloatString(recurso.costoUnitario)}"></custom-input></td>
            </tr>`;
      });
      return recursosHTML;
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
         let procedimientosHTEC = veeva.calculadora.referencias.procedimientos.HTEC;

         this.innerHTML = `
         <section class="pop-conten">
            <section class="pop animate-fade-in-up animate-delay-100 animate-duration-slow">
               <div class="pop-form relative">
                  <table class="thead table-auto">
                     <thead>
                        <tr>
                           <th class="font-bold text-base text-orange-400 text-left">Recurso</th>
                           <th class="font-bold text-base text-text-500 text-center">Costo unitario</th>
                        </tr>
                     </thead>
                  </table>
                  <table class="w-full">
                     <tbody class="overflow-y-scroll h-[400px] block">
                        ${this.getRecursos(procedimientosHTEC)}
                     </tbody>
                  </table>
               </div>
               <div class="pop-label">
                  <div>
                     <h4>Consumo de recursos por clase funcional HPTEC</h4>
                     <button onclick="javascript:slideDoce.popDown('${this.type}')" class="text-red-600 shadow-md rounded-full bg-white h-fit">
                        <svg class="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                           <path fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                              clip-rule="evenodd" />
                        </svg>
                     </button>
                  </div>
               </div>
            </section>

            <footer class="absolute w-full bottom-6">
               <div></div>
               <article class="ref animate-fade-in-up animate-delay-[300ms] animate-duration-slower">
                  <p class="px-4!"><span class="font-bold">Costos procedimientos por paciente</span> = Recurso en salud * Proporción de uso por estadificación de riesgo * Costo unitario.<br>La proporción de uso de recursos según estadificación de riesgo está basada en la literatura (38) y el costo unitario basado en el tarifario del Instituto de Seguridad Social de Colombia de 2001 más el 35% de inflación estimado desde año a la actualidad (39).</p>
                  <p class="px-4!">38. Zozaya N., et al. The economic burden of pulmonary arterial hypertension in Spain. BMC Pulm Med. 2022 Mar 26;22(1):105.39. Ministerio de Salud. ACUERDO No. 256 DE 2.001. URL disponible: https://lexsaludcolombia.files.wordpress.com/2010/10/tarifas-iss-2001.pdf.</p>
               </article>

            </footer>

         </section>`;
      });
   }
}
window.customElements.define("custom-pop", customPop);