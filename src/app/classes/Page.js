import each from "lodash/each";

/**
 * Page commune à toutes les pages
 * Permet de définir les éléments de la page
 * @class Page
 * @param {HTMLElement} element // Élément du DOM correspondant à la page
 * @param {Object} elements // Éléments de référence de la page
 * @param {String} id
 */

export default class Page {
  constructor({element, elements, id}) {
    this.selector = element;
    this.selectorChildrens = {...elements}; // Récupération des éléments de référence de la page
    this.id = id;
  }

  create() {
    /**
     * Permet de définir les éléments de la page
     * Si l'élément est un HTMLElement, un NodeList ou un Array, on le définit directement
     * Sinon, on utilise querySelectorAll pour récupérer les éléments
     * Si aucun élément n'est trouvé, on définit la valeur à null
     * Si un seul élément est trouvé, on définit directement l'élément
     */

    this.element = document.querySelector(this.selector);
    this.elements = {}

    each(this.selectorChildrens, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        this.elements[key] = entry;
      }
      else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0)
        {
          this.elements[key] = null
          console.error("ERROR CREATE BY NICO - Element not found", this.elements[key], entry)
        }
        else if (this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry);
        }
      }
    })
  }
}
