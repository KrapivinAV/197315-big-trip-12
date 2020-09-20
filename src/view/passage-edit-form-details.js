import {basisConstants} from "../basis-constants.js";
import {routeParameters} from "../route-parameters.js";
import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import PassageEditFormDetailsOfferView from "./passage-edit-form-details-offer.js";
import PassageEditFormOfferView from "./passage-edit-form-offer.js";
import PassageEditFormDetailsDestinationView from "./passage-edit-form-details-destination.js";
import PassageEditFormDetailsDestinationPhotoView from "./passage-edit-form-deaills-destination-photo.js";

const {arrivals} = basisConstants;

const createPassageEditFormDetailsTemplate = () => {
  return `<section class="event__details">
  </section>`;
};

export default class PassageEditFormDetails extends AbstractView {
  constructor(passage) {
    super();

    this.passage = passage;
  }

  getTemplate() {
    return createPassageEditFormDetailsTemplate();
  }

  addParts() {
    const offersCategory = arrivals.includes(this.passage.waypointType) ? routeParameters.arrivals : routeParameters.vehicles;
    const offersTypeSet = offersCategory.filter((item) => item.name === this.passage.waypointType)[0].offerSet;

    if (offersTypeSet && offersTypeSet.length !== 0) {
      const passageEditFormDetailsOffer = new PassageEditFormDetailsOfferView();
      render(this, passageEditFormDetailsOffer);

      const passageAvailableOffersContainer = passageEditFormDetailsOffer.getElement().querySelector(`.event__available-offers`);
      offersTypeSet.forEach((offer) => {
        const checkedStatus = this.passage.offers.includes(offer) ? `checked` : ``;
        render(passageAvailableOffersContainer, new PassageEditFormOfferView(offer, checkedStatus));
      });
    }

    const passageEditFormDetailsDestinationView = new PassageEditFormDetailsDestinationView(this.passage.description);

    render(this, passageEditFormDetailsDestinationView);
    const passagePhotosTape = passageEditFormDetailsDestinationView.getElement().querySelector(`.event__photos-tape`);
    this.passage.photos.forEach((photo) => {
      render(passagePhotosTape, new PassageEditFormDetailsDestinationPhotoView(photo));
    });
  }
}
