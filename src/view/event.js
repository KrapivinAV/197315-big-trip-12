import {basisConstants} from "../basis-constants.js";
import EventPreviewOfferView from "./event-preview-offer.js";
import {createElement, render} from "../utils.js";

const {arrivals} = basisConstants;
const MAX_QUANTITY_OF_OFFERS_IN_PREVIEW = 3;

const createEventTemplate = (event) => {
  const {waypointType, waypoint, eventStartPoint, eventEndPoint, price} = event;

  const routePlaceholderPart = arrivals.includes(waypointType) ? `in` : `to`;

  const generateDuration = (start, end) => {
    const difference = new Date(end - start);
    if (difference.getDate()) {
      return `${difference.getDate()}D ${difference.getHours()}H ${difference.getMinutes()}M`;
    } else if (difference.getHours()) {
      return `${difference.getHours()}H ${difference.getMinutes()}M`;
    } else {
      return `${difference.getMinutes()}M`;
    }
  };

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${waypointType} ${routePlaceholderPart} ${waypoint}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventStartPoint.toISOString()}">${eventStartPoint.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}</time>
          &mdash;
          <time class="event__end-time" datetime="${eventEndPoint.toISOString()}">${eventEndPoint.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}</time>
        </p>
        <p class="event__duration">${generateDuration(eventStartPoint, eventEndPoint)}</p>
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
    </div>
  </li>`;
};

export default class Event {
  constructor(event) {
    this.event = event;

    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this.event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  addOffers(offers) {
    const offersList = this.getElement().querySelector(`.event__selected-offers`);

    offers.splice(0, MAX_QUANTITY_OF_OFFERS_IN_PREVIEW).forEach((offer) => {
      const currentOffer = new EventPreviewOfferView(offer);
      render(offersList, currentOffer.getElement());
    });
  }

  removeElement() {
    this._element = null;
  }
}
