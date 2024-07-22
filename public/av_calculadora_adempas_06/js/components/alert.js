class customAlert extends HTMLElement {

   constructor() {
      super();

      this.type = '';
      this.title = '';
      this.message = '';
      this.actions = [];
   }

   static get observedAttributes() {
      return ['type', 'title', 'message', 'actions'];
   }

   attributeChangedCallback(nameAttr, oldValue, newValue) {
      if (oldValue !== newValue) {
         if (nameAttr === 'actions') {
            this[nameAttr] = JSON.parse(newValue);
         } else {
            this[nameAttr] = nameAttr === 'message' ? this.parseHTML(newValue) : newValue;
         }
      }
   }

   parseHTML(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      return doc.body.innerHTML;
   }


   getIcon(iconType) {
      switch (iconType) {
         case "info":
            return `
               <svg class="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
               </svg>`;

         case "warning":
            return `
               <svg class="size-8"  fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
               </svg>`;

         default:
            return `
               <svg class="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
               </svg>`;
      }
   }

   connectedCallback() {
      const actionButtons = this.actions.map(action =>
         `<button class="background-btn-${action.color} button-${action.color}-corner-md" onclick="javascript:${action.handler}">
            <div>
               <h4>${action.name}</h4>
            </div>
         </button>`).join('');

      this.innerHTML = `
         <section class="alert-conten alert-animate-out">
            <div class="alert alert-conten-animate-out">
               <div class="alert-contain">
                  <section class="alert-body ${this.type}">
                        <div class="header-icon ">
                           ${this.getIcon(this.type)}
                        </div>
                        <div class="header-conten">
                           <h3>${this.title}</h3>
                           <article>${this.message}</article>
                        </div>
                  </section>

                  <section class="alert-footer">
                     ${actionButtons}
                  </section>
               </div>
            </div>
         </section>`;
   }
}

window.customElements.define("custom-alert", customAlert);