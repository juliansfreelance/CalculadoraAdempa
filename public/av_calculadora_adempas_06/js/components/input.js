class customInput extends HTMLElement {

   constructor() {
      super();
      this.name;
      this.type;
      this.icon;
   }

   static get observedAttributes(){
      return ['name', 'type', 'icon'];
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
            if (newValue === "porcentaje") {
               this.icon =
                  `<div class="porcentaje">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-percent" viewBox="0 0 16 16">
                        <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                     </svg>
                  </div>`;
            } else if (newValue === 'money') {
               this.icon =
                  `<div class="money">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                     </svg>
                  </div>`;
            } else {
               this.icon = '';
            }
            break;
      }
   }

   connectedCallback() {
      const disabledAttribute = this.type === "input-calc" ? "disabled" : "";
      this.innerHTML =
         `<div class="${this.type}">
            <input type="number" name="${this.name}" id="${this.name}" ${disabledAttribute }/>
            ${this.icon}
         <div/>`;
   }
}
window.customElements.define("custom-input", customInput);