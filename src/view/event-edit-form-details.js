import {createElement} from "../utils.js";

const createEventEditFormDetailsTemplate = () => {
  return `<section class="event__details">
  </section>`;
};

export default class EventEditFormDetails {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventEditFormDetailsTemplate();
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
