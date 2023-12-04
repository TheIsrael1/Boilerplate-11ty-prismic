import Component from "../classes/Component.js";
import {gsap} from "gsap";
import each from "lodash/each";

/**
 * Navigation
 * @constructor
 * @super Component
 * @param {object} template - The template.
 * @return {object} Itself.
 */
export default class Navigation extends Component {

  constructor({template}) {
    super({
      element: '.navigation',
      elements: {
        links: ".links",
        test: ".test"
      }
    });
    this.template = template;
  }

  create() {
    super.create();
    this.addEventListeners();
  }

  addEventListeners() {

  }

  onChange(template) {

  }
}
