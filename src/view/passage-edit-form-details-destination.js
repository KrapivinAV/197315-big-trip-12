import AbstractView from "./abstract.js";

const createPassageEditFormDetailsDestinationTemplate = (description) => {
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      </div>
    </div>
  </section>`;
};

export default class PassageEditFormDetailsDestination extends AbstractView {
  constructor(description) {
    super();

    this.description = description;
  }

  getTemplate() {
    return createPassageEditFormDetailsDestinationTemplate(this.description);
  }
}
