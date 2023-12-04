import Page from '../../classes/Page.js'
import {gsap} from "gsap";

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        wrapper: '.about__wrapper',
        navigation: document.querySelector('.navigation'),
      },
      meta: {
        title: "About",
      }
    })
  }

  create() {
    super.create();

    // INIT
    this.initAnimation()
    this.addEventListeners()
  }

  initAnimation() {

  }

  addEventListeners() {

  }

}
