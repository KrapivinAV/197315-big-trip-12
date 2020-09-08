import AbstractView from "./abstract.js";

const createPassageEditFormDetailsOfferTemplate = () => {
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    </div>
  </section>`;
};

export default class PassageEditFormDetailsOffer extends AbstractView {
  getTemplate() {
    return createPassageEditFormDetailsOfferTemplate();
  }
}
