// SCSS
import '@styles/index.scss';

// PAGES
import Home from "./pages/home/index.js";
import Navigation from "./components/Navigation.js";
import each from "lodash/each";
import About from "./pages/about/index.js";

// LIB
import {gsap} from "gsap";


class App {

  constructor() {
    this.createContent();
    this.createPages();
    this.createNavigation();
    this.addLinkListeners();

    this.tl = gsap.timeline();
    this.isChanging = false;
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
      about: new About(),
    }
    this.page = this.pages[this.template]

    this.page.create();
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
   */
  async onChange({url, push = true}) {

    if (this.isChanging) return;
    this.isChanging = true;

    const urlObject = new URL(url);
    if (window.location.pathname === urlObject.pathname) {
      this.isChanging = false;
      return
    };


    const req = await fetch(url)

    if (req.status === 200) {

      // await this.page.hide()

      await this.pageTransitionIn();

      const html = await req.text();
      const div = document.createElement('div');
      div.innerHTML = html;

      const divContent = div.querySelector('.content');
      this.template = divContent.getAttribute('data-template');

      this.navigation.onChange(this.template);

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];
      this.page.create();


      if (push) {
        window.history.pushState(null, null, url);
      }

      await this.pageTransitionOut();

      this.addLinkListeners();
      this.isChanging = false;
    }
    else {
      console.log('error')
      this.isChanging = false;
    }
  }

  addEventListeners() {

  }

  async pageTransitionIn() {
    return new Promise((resolve) => {
      // Transition de page Ici
      resolve();
    });
  }

  async pageTransitionOut() {
    return new Promise((resolve) => {
      // Transition de page ici
      resolve()
    });
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
