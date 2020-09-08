import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import PassageEditFormHeaderView from "./passage-edit-form-header.js";
import PassageEditFormDetailsView from "./passage-edit-form-details.js";

const createPassageEditFormTemplate = () => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
  </form>`;
};

export default class PassageEditForm extends AbstractView {
  constructor(item) {
    super();

    this.item = item;
  }

  getTemplate() {
    return createPassageEditFormTemplate();
  }

  addParts() {
    const passageEditFormHeader = new PassageEditFormHeaderView(this.item);
    const passageEditFormDetails = new PassageEditFormDetailsView(this.item);
    passageEditFormDetails.addParts();

    render(this, passageEditFormHeader);
    render(this, passageEditFormDetails);
  }
}
