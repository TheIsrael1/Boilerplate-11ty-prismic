import each from "lodash/each";
import {split} from "../utils/text.js";
import {map} from "lodash/collection.js";

/**
 * Page commune à toutes les pages
 * Permet de définir les éléments de la page
 * @class Page
 * @param {HTMLElement} element // Élément du DOM correspondant à la page
 * @param {Object} elements // Éléments de référence de la page
 * @param {String} id
 */

export default class Page {
  constructor({element, elements, id, meta}) {
    this.selector = element;
    this.selectorChildrens = {
      ...elements,
    };
    this.id = id;
    this.meta = meta
  }


  create() {
    /**
     * Permet de définir les éléments de la page
     * Si l'élément est un HTMLElement, un NodeList ou un Array, on le définit directement
     * Sinon, on utilise querySelectorAll pour récupérer les éléments
     * Si aucun élément n'est trouvé, on définit la valeur à null
     * Si un seul élément est trouvé, on définit directement l'élément
     */

    document.title = this.meta.title;


    this.element = document.querySelector(this.selector);
    this.elements = {}


    each(this.selectorChildrens, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null
          console.log("!!! Element not found", entry)
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    })

    this.createAnimation()
  }

  createAnimation() {

  }
}
