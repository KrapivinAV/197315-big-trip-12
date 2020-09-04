import {render} from "../utils/render.js";
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
    if (this.item.offers && this.item.offers.length !== 0) {
      const passageEditFormDetailsOffer = new PassageEditFormDetailsOfferView();

      render(this, passageEditFormDetailsOffer);
      const passageAvailableOffersContainer = passageEditFormDetailsOffer.getElement().querySelector(`.event__available-offers`);
      this.item.offers.forEach((offer) => {
        render(passageAvailableOffersContainer, new PassageEditFormOfferView(offer));
      });
    }

    const passageEditFormDetailsDestinationView = new PassageEditFormDetailsDestinationView(this.item.description);

    render(this, passageEditFormDetailsDestinationView);
    const passagePhotosTape = passageEditFormDetailsDestinationView.getElement().querySelector(`.event__photos-tape`);
    this.item.photos.forEach((photo) => {
      render(passagePhotosTape, new PassageEditFormDetailsDestinationPhotoView(photo));
    });
  }
}
