class Modal extends HTMLElement {
    constructor() {
      super();
    }
    get visible() {
        return this.hasAttribute("visible");
      }
    
    set visible(value) {
        if (value) {
            this.setAttribute("visible", "");
        } else {
            this.removeAttribute("visible");
        }
    }

    connectedCallback() {
      this._render();
      this._attachEventHandlers();
    }

    _attachEventHandlers() {
        const cancelButton = this.shadowRoot.querySelector(".cancel");
        cancelButton.addEventListener('click', e => {
          this.removeAttribute("visible");
        });
      }

    static get observedAttributes() {
        return ["visible"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "visible" && this.shadowRoot) {
          if (newValue === null) {
            this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
          } else {
            this.shadowRoot.querySelector(".wrapper").classList.add("visible");
          }
        }
      }
  
    _render() {
      const modalClass = this.visible ? "wrapper visible" : "wrapper";
      const container = document.createElement("div");
      container.innerHTML = `
        <style>
            .wrapper {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            visibility: hidden;
            transform: scale(1.1);
            transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
            z-index: 1;
            border-radius: 0.30rem;
            }
            .visible {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
            }
            .modal {
            font-family: Helvetica;
            font-size: 14px;
            padding: 20px 20px 10px 20px;
            background-color: #bdbdbd;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 3px;
            min-width: 300px;
            }
            .title {
            font-size: 18px;
            }
            .button-container {
            text-align: right;
            }
            button {
            min-width: 80px;
            background-color: #848e97;
            border-color: #848e97;
            border-style: solid;
            border-radius: 2px;
            padding: 3px;
            color:white;
            cursor: pointer;
            }
            button:hover {
            background-color: #6c757d;
            border-color: #6c757d;
            }
        </style>
        <div class='${modalClass}'>
        <div class='modal'>
            <span class='title'>Continente</span>
            <div class='content'>
            No pude mostrar Continente
            </div>
            <div class='button-container'>
            <button class='cancel'>Cancel</button>
            </div>
        </div>
        </div>
      `;
  
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(container);
    }
  }
  window.customElements.define("app-modal", Modal);






