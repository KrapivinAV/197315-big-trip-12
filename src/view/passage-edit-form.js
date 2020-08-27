import {createElement, render} from "../utils.js";
import PassageEditFormHeaderView from "./passage-edit-form-header.js";
import PassageEditFormDetailsView from "./passage-edit-form-details.js";

const createPassageEditFormTemplate = () => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
  </form>`;
};

export default class PassageEditForm {
  constructor(item) {
    this.item = item;

    this._element = null;
  }

  getTemplate() {
    return createPassageEditFormTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  addParts() {
    const container = this.getElement();
    const passageEditFormHeader = new PassageEditFormHeaderView(this.item);
    const passageEditFormDetails = new PassageEditFormDetailsView(this.item);
    passageEditFormDetails.addParts();

    render(container, passageEditFormHeader.getElement());
    render(container, passageEditFormDetails.getElement());
  }

  removeElement() {
    this._element = null;
  }
}
