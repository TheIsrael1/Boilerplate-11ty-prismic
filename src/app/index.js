// SCSS
import '@styles/index.scss';

// PAGES
import Home from "./pages/home/index.js";
import Navigation from "./components/Navigation.js";
import each from "lodash/each";


class App {

  constructor() {
    this.createContent();
    this.createPages();
    this.createNavigation();
  }

  /**
   * Définition du contenue de la page courant
   * Définition du template de la page courant
   * @returns {void}
   */
  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  /**
   * Création des pages
   * @returns {void}
   */
  createPages() {
    this.pages = {
      // e.g. home: new Home()
      home: new Home(),
    }
    this.page = this.pages[this.template]
  }


  /**
   * Création de la navigation
   * @returns {void}
   */
  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    });
  }


  /**
   * Changement de page
   * @param url {string}
   * @param push {boolean} - true si on veut ajouter l'url dans l'historique
   * @return {Promise<void>}
   */
  async onChange({ url, push = true }) {
    url = url.replace(window.location.origin, '');

    const page = this.pages[url];

    // await this.transition.show({
    //   color: page.element.getAttribute('data-color'),
    // });

    if (push) {
      window.history.pushState({}, '', url);
    }

    this.template = window.location.pathname;


    this.navigation.onChange(this.template);

    this.page = page;
    this.page.show();

  }

  addEventListeners() {

  }



  /**
   * Pour chaque lien
   * - Si le lien est local, on empêche le comportement par défaut du navigateur
   * - Si le lien est local et qu'il ne contient pas d'ancre, on appelle la méthode onChange
   * - Si le lien n'est pas local, on ajoute l'attribut target="_blank" pour ouvrir le lien dans un nouvel onglet
   */
  addLinkListeners() {
    const links = document.querySelectorAll('a');

    each(links, link => {
      const isLocal = link.href.indexOf(window.location.origin) > -1;
      const isAnchor = link.href.indexOf('#') > -1;

      const isNotEmail = link.href.indexOf('mailto') === -1;
      const isNotPhone = link.href.indexOf('tel') === -1;

      if (isLocal) {
        link.onclick = event => {
          event.preventDefault();

          if (!isAnchor) {
            this.onChange({
              url: link.href,
            });
          }
        };
      } else if (isNotEmail && isNotPhone) {
        link.rel = 'noopener';
        link.target = '_blank';
      }
    });
  }

}

new App();
