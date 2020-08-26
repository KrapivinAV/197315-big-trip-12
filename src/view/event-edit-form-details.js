import {createElement, render} from "../utils.js";
import EventEditFormDetailsOfferView from "./event-edit-form-details-offer.js";
import EventEditFormOfferView from "./event-edit-form-offer.js";
import EventEditFormDetailsDestinationView from "./event-edit-form-details-destination.js";
import EventEditFormDetailsDestinationPhotoView from "./event-edit-form-deaills-destination-photo.js";

const createEventEditFormDetailsTemplate = () => {
  return `<section class="event__details">
  </section>`;
};

export default class EventEditFormDetails {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventEditFormDetailsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  addParts(item) {
    const eventEditFormDetailsElement = this.getElement();

    if (item.offers && item.offers.length !== 0) {
      const eventEditFormDetailsOffer = new EventEditFormDetailsOfferView();

      render(eventEditFormDetailsElement, eventEditFormDetailsOffer.getElement());
      const eventAvailableOffersContainer = eventEditFormDetailsOffer.getElement().querySelector(`.event__available-offers`);
      item.offers.forEach((offer) => {
        render(eventAvailableOffersContainer, new EventEditFormOfferView(offer).getElement());
      });
    }

    const eventEditFormDetailsDestinationView = new EventEditFormDetailsDestinationView(item.description);

    render(eventEditFormDetailsElement, eventEditFormDetailsDestinationView.getElement());
    const eventPhotosTape = eventEditFormDetailsDestinationView.getElement().querySelector(`.event__photos-tape`);
    item.photos.forEach((photo) => {
      render(eventPhotosTape, new EventEditFormDetailsDestinationPhotoView(photo).getElement());
    });
  }

  removeElement() {
    this._element = null;
  }
}
