import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import PassageEditFormHeaderView from "./passage-edit-form-header.js";
import PassageEditFormDetailsView from "./passage-edit-form-details.js";

const createPassageEditFormTemplate = () => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
  </form>`;
};

export default class PassageEditForm extends AbstractView {
  constructor(passage) {
    super();

    this.passage = passage;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createPassageEditFormTemplate();
  }

  addParts() {
    const passageEditFormHeader = new PassageEditFormHeaderView(this.passage);
    const passageEditFormDetails = new PassageEditFormDetailsView(this.passage);
    passageEditFormDetails.addParts();

    render(this, passageEditFormHeader);
    render(this, passageEditFormDetails);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this.passage);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }
}
