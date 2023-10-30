import Page from '../../classes/Page.js'
export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: document.querySelector('.navigation'),
      }
    })
  }
}
