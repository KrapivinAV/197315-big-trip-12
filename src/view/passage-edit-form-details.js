import {createElement, render} from "../utils.js";
import PassageEditFormDetailsOfferView from "./passage-edit-form-details-offer.js";
import PassageEditFormOfferView from "./passage-edit-form-offer.js";
import PassageEditFormDetailsDestinationView from "./passage-edit-form-details-destination.js";
import PassageEditFormDetailsDestinationPhotoView from "./passage-edit-form-deaills-destination-photo.js";

const createPassageEditFormDetailsTemplate = () => {
  return `<section class="event__details">
  </section>`;
};

export default class PassageEditFormDetails {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPassageEditFormDetailsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  addParts(item) {
    const passageEditFormDetailsElement = this.getElement();

    if (item.offers && item.offers.length !== 0) {
      const passageEditFormDetailsOffer = new PassageEditFormDetailsOfferView();

      render(passageEditFormDetailsElement, passageEditFormDetailsOffer.getElement());
      const passageAvailableOffersContainer = passageEditFormDetailsOffer.getElement().querySelector(`.event__available-offers`);
      item.offers.forEach((offer) => {
        render(passageAvailableOffersContainer, new PassageEditFormOfferView(offer).getElement());
      });
    }

    const passageEditFormDetailsDestinationView = new PassageEditFormDetailsDestinationView(item.description);

    render(passageEditFormDetailsElement, passageEditFormDetailsDestinationView.getElement());
    const passagePhotosTape = passageEditFormDetailsDestinationView.getElement().querySelector(`.event__photos-tape`);
    item.photos.forEach((photo) => {
      render(passagePhotosTape, new PassageEditFormDetailsDestinationPhotoView(photo).getElement());
    });
  }

  removeElement() {
    this._element = null;
  }
}
