import Page from '../../classes/Page.js'
import {gsap} from "gsap";

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: document.querySelector('.navigation'),
      },
      meta: {
        title: "Home",
      }
    })
  }

  create() {
    super.create();
    this.addEventListeners()
  }

  addEventListeners() {

  }

  removeEventListeners() {

  }

}
