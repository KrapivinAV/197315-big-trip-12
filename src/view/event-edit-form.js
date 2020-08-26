import {createElement, render} from "../utils.js";
import EventEditFormHeaderView from "./event-edit-form-header.js";
import EventEditFormDetailsView from "./event-edit-form-details.js";

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

  addParts(item) {
    const container = this.getElement();
    const eventEditFormHeader = new EventEditFormHeaderView(item);
    const eventEditFormDetails = new EventEditFormDetailsView(item);

    render(container, eventEditFormHeader.getElement());
    render(container, eventEditFormDetails.getElement());
  }

  removeElement() {
    this._element = null;
  }
}
