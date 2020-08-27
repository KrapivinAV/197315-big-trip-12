import {createElement} from "../utils.js";

const createPassageContainerTemplate = () => {
  return `<li class="trip-events__item">
  </li>`;
};

export default class PassageContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPassageContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
