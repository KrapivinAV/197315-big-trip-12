import {createElement} from "../utils.js";

const createEventEditFormTemplate = () => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
  </form>`;
};

export default class EventEditForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventEditFormTemplate();
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
