import {createElement} from "../utils.js";

const createPassageEditFormDetailsOfferTemplate = () => {
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    </div>
  </section>`;
};

export default class PassageEditFormDetailsOffer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPassageEditFormDetailsOfferTemplate();
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
