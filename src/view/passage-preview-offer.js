import AbstractView from "./abstract.js";

const createPassagePreviewOfferTemplate = (offer) => {
  const {title, price} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`;
};

export default class PassagePreviewOffer extends AbstractView {
  constructor(offer) {
    super();

    this.offer = offer;
  }

  getTemplate() {
    return createPassagePreviewOfferTemplate(this.offer);
  }
}

