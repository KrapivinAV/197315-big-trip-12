import {createElement} from "../utils.js";

const createPassagePreviewOfferTemplate = (offer) => {
  const {title, cost} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${cost}</span>
  </li>`;
};

export default class PassagePreviewOffer {
  constructor(offer) {
    this.offer = offer;

    this._element = null;
  }

  getTemplate() {
    return createPassagePreviewOfferTemplate(this.offer);
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

