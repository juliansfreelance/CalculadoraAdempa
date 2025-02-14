class customInput extends HTMLElement {

   constructor() {
      super();
      this.name = '';
      this.type = '';
      this.valor = '';
      this.paceholder = '';
      this.icon = '';
      this.iconConten = '';
      this.decimalMode = false;
      this.previousValue = '';
      this.handleBlur = this.handleBlur.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
   }

   static get observedAttributes(){
      return ['name', 'type', 'valor', 'paceholder', 'icon', ];
   }

   attributeChangedCallback(nameAttr, oldValue, newValue) {
      switch (nameAttr) {
         case "name":
            this.name = newValue;
            break;

         case "type":
            this.type = 'input-' + newValue;
            break;

         case "icon":
            this.icon = newValue;
            break;

         case 'valor':
            this.valor = newValue || '';
            break;

         case 'paceholder':
            this.paceholder = newValue || '';
            break;
      }
   }

   getIcon(iconType) {
      if (iconType === "porcentaje") {
         return `<div class="icon-${iconType}">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-percent" viewBox="0 0 16 16">
                        <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                     </svg>
                  </div>`;
      } else if (iconType === 'money') {
         return `<div class="icon-${iconType}">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                     </svg>
                  </div>`;
      } else {
         return '';
      }
   }

   formatNumber(val) {
      const FORMAT_DECIMAL = value => currency(value, { precision: 2, symbol: '', decimal: ',', separator: '.' });
      const FORMAT_ENTERO = value => currency(value, { precision: 2, symbol: '', decimal: ',', separator: '.' });
      if (val !== '') {
         let inputValue = val.toString().replace(/[^\d,.]/g, '');
         let integer = parseFloat(inputValue.replace(/\./g, '').replace(/,/g, '.'));
         return inputValue.indexOf(',') !== -1 ? FORMAT_DECIMAL(integer).format() : FORMAT_ENTERO(integer).format();
      }
   }
   handleFocus(event) {
      this.previousValue = event.target.value;
      event.target.value = '';
   }

   handleInput(event) {
      let inputValue = event.target.value.replace(/[^\d,]/g, '');
      if (inputValue.includes(',')) {
         this.decimalMode = true;
      }
      if (this.decimalMode) {
         let decimalIndex = inputValue.indexOf(',');
         if (decimalIndex !== -1) {
            let decimalPart = inputValue.substring(decimalIndex + 1);
            if (decimalPart.length > 2) {
               inputValue = inputValue.substring(0, decimalIndex + 3);
            }
         }
      }
      event.target.value = inputValue;
      this.valor = inputValue;
   }

   handleBlur(event) {
      const input = event.target;
      const inputValue = input.value.replace(/[^\d,.]/g, '');
      const formattedValue = this.formatNumber(inputValue);

      if (input.value === '') {
         input.value = this.previousValue;
         this.updateJsonValue(input.name, this.previousValue);
      } else if (input.value !== '') {
         input.value = formattedValue;
         this.valor = formattedValue;
         this.updateJsonValue(input.name, inputValue);
      }
   }

   updateJsonValue(name, value) {
      const path = name.split('-');
      const terapiaIndex = parseInt(path[1]);
      const field = path[2];
      if (path[0] === 'monoterapia') {
         veeva.calculadora.tecnologias.monoterapias.terapias[terapiaIndex][field] = parseFloat(value.replace(',', '.'));
      } else if (path[0] === 'biterapia') {
         veeva.calculadora.tecnologias.terapiasDobles.terapias[terapiaIndex][field] = parseFloat(value.replace(',', '.'));
      } else if (path[0] === 'triterapia') {
         veeva.calculadora.tecnologias.terapiasTripes.terapias[terapiaIndex][field] = parseFloat(value.replace(',', '.'));
      }
      this.updateGlobalValues();
      if (slideSeis.validateCounnt > 0) slideSeis.validateTecnnology();
   }

   updateGlobalValues() {
      function sumTerapias(terapias, field) {
         return terapias.reduce((sum, terapia) => sum + terapia[field], 0);
      }
      veeva.calculadora.tecnologias.monoterapias.bajo = sumTerapias(veeva.calculadora.tecnologias.monoterapias.terapias, 'bajo');
      veeva.calculadora.tecnologias.monoterapias.intermedio = sumTerapias(veeva.calculadora.tecnologias.monoterapias.terapias, 'intermedio');
      veeva.calculadora.tecnologias.monoterapias.alto = sumTerapias(veeva.calculadora.tecnologias.monoterapias.terapias, 'alto');

      veeva.calculadora.tecnologias.terapiasDobles.bajo = sumTerapias(veeva.calculadora.tecnologias.terapiasDobles.terapias, 'bajo');
      veeva.calculadora.tecnologias.terapiasDobles.intermedio = sumTerapias(veeva.calculadora.tecnologias.terapiasDobles.terapias, 'intermedio');
      veeva.calculadora.tecnologias.terapiasDobles.alto = sumTerapias(veeva.calculadora.tecnologias.terapiasDobles.terapias, 'alto');

      veeva.calculadora.tecnologias.terapiasTripes.bajo = sumTerapias(veeva.calculadora.tecnologias.terapiasTripes.terapias, 'bajo');
      veeva.calculadora.tecnologias.terapiasTripes.intermedio = sumTerapias(veeva.calculadora.tecnologias.terapiasTripes.terapias, 'intermedio');
      veeva.calculadora.tecnologias.terapiasTripes.alto = sumTerapias(veeva.calculadora.tecnologias.terapiasTripes.terapias, 'alto');

      veeva.calculadora.tecnologias.totalRiesgoBajo = veeva.calculadora.tecnologias.monoterapias.bajo + veeva.calculadora.tecnologias.terapiasDobles.bajo + veeva.calculadora.tecnologias.terapiasTripes.bajo;
      veeva.calculadora.tecnologias.totalRiesgoIntermedio = veeva.calculadora.tecnologias.monoterapias.intermedio + veeva.calculadora.tecnologias.terapiasDobles.intermedio + veeva.calculadora.tecnologias.terapiasTripes.intermedio;
      veeva.calculadora.tecnologias.totalRiesgoAlto = veeva.calculadora.tecnologias.monoterapias.alto + veeva.calculadora.tecnologias.terapiasDobles.alto + veeva.calculadora.tecnologias.terapiasTripes.alto;

      slideSeis.updateInputTecnologias();
   }

   connectedCallback() {
      const disabledAttribute = this.type === "input-calc" ? "disabled" : "";

      this.innerHTML =
         `<div class="${this.type}">
            <input
               class="${this.icon}"
               type="text"
               name="${this.name}"
               id="${this.name}"
               placeholder="${this.paceholder}"
               value="${this.valor !== '' ? this.formatNumber(this.valor) : ''}"
               ${disabledAttribute}
            />
            ${this.getIcon(this.icon)}
         </div>`;
      const inputElement = this.querySelector('input');
      inputElement.addEventListener('input', this.handleInput);
      inputElement.addEventListener('focus', this.handleFocus);
      inputElement.addEventListener('blur', this.handleBlur);
   }
}
window.customElements.define("custom-input", customInput);