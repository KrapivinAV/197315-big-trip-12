import {render} from "../utils.js";
import AbstractView from "./abstract.js";
import PassageEditFormDetailsOfferView from "./passage-edit-form-details-offer.js";
import PassageEditFormOfferView from "./passage-edit-form-offer.js";
import PassageEditFormDetailsDestinationView from "./passage-edit-form-details-destination.js";
import PassageEditFormDetailsDestinationPhotoView from "./passage-edit-form-deaills-destination-photo.js";

const createPassageEditFormDetailsTemplate = () => {
  return `<section class="event__details">
  </section>`;
};

export default class PassageEditFormDetails extends AbstractView {
  constructor(item) {
    super();

    this.item = item;
  }

  getTemplate() {
    return createPassageEditFormDetailsTemplate();
  }

  addParts() {
    const passageEditFormDetailsElement = this.getElement();

    if (this.item.offers && this.item.offers.length !== 0) {
      const passageEditFormDetailsOffer = new PassageEditFormDetailsOfferView();

      render(passageEditFormDetailsElement, passageEditFormDetailsOffer.getElement());
      const passageAvailableOffersContainer = passageEditFormDetailsOffer.getElement().querySelector(`.event__available-offers`);
      this.item.offers.forEach((offer) => {
        render(passageAvailableOffersContainer, new PassageEditFormOfferView(offer).getElement());
      });
    }

    const passageEditFormDetailsDestinationView = new PassageEditFormDetailsDestinationView(this.item.description);

    render(passageEditFormDetailsElement, passageEditFormDetailsDestinationView.getElement());
    const passagePhotosTape = passageEditFormDetailsDestinationView.getElement().querySelector(`.event__photos-tape`);
    this.item.photos.forEach((photo) => {
      render(passagePhotosTape, new PassageEditFormDetailsDestinationPhotoView(photo).getElement());
    });
  }
}
