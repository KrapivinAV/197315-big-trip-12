import AbstractView from "./abstract.js";

const createPassageEditFormOfferTemplate = (offer) => {
  const {title, cost} = offer;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${title}" type="checkbox" name="${title}">
    <label class="event__offer-label" for="${title}">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </label>
  </div>`;
};

export default class PassageEditFormOffer extends AbstractView {
  constructor(offer) {
    super();

    this.offer = offer;
  }

  getTemplate() {
    return createPassageEditFormOfferTemplate(this.offer);
  }
}
