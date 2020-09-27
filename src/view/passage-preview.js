import {basisConstants, typeTranslations} from "../basis-constants.js";
import {formatDate, formatPassageDuration} from "../utils/passage.js";
import PassagePreviewOfferView from "./passage-preview-offer.js";
import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";

import he from "he";

const {arrivals} = basisConstants;
const MAX_QUANTITY_OF_OFFERS_IN_PREVIEW = 3;

const createPassagePreviewTemplate = (passage) => {
  const {waypointType, waypoint, passageStartPoint, passageEndPoint, price} = passage;
  const typeMark = waypointType.toLowerCase() === `check-in` ? `checkIn` : waypointType.toLowerCase();
  const routePlaceholderPart = arrivals.some((item) => item.toLowerCase() === waypointType.toLowerCase()) ? `in` : `to`;

  return `<div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${typeTranslations[typeMark]} ${routePlaceholderPart} ${he.encode(waypoint)}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${passageStartPoint.toISOString()}">${formatDate(passageStartPoint, `hh:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${passageEndPoint.toISOString()}">${formatDate(passageEndPoint, `hh:mm`)}</time>
      </p>
      <p class="event__duration">${formatPassageDuration(new Date(passageEndPoint - passageStartPoint))}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class PassagePreview extends AbstractView {
  constructor(passage) {
    super();

    this.passage = passage;

    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
  }

  getTemplate() {
    return createPassagePreviewTemplate(this.passage);
  }

  addOffers() {
    const offersList = this.getElement().querySelector(`.event__selected-offers`);

    this.passage.offers.slice().splice(0, MAX_QUANTITY_OF_OFFERS_IN_PREVIEW).forEach((offer) => {
      const currentOffer = new PassagePreviewOfferView(offer);
      render(offersList, currentOffer);
    });
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  setRollUpClickHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollUpClickHandler);
  }
}
