import {createElement} from "../utils.js";

const createPassageEditFormDetailsDestinationTemplate = (description) => {
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      </div>
    </div>
  </section>`;
};

export default class PassageEditFormDetailsDestination {
  constructor(description) {
    this.description = description;

    this._element = null;
  }

  getTemplate() {
    return createPassageEditFormDetailsDestinationTemplate(this.description);
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