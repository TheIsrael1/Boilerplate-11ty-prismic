import Component from "../classes/Component.js";

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
        links: ".links"
      }
    });
    this.template = template;
  }

  onChange(template) {

  }

}
