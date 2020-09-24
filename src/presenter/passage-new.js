import PassageEditFormView from "../view/passage-edit-form.js";
import {generateId} from "../mock/passage.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../basis-constants";

export default class PassageNew {
  constructor(tripPassagesContainer, changeData, offersSet, destinationsSet) {
    this._tripPassagesContainer = tripPassagesContainer;
    this._changeData = changeData;
    this._offersSet = offersSet;
    this._destinationsSet = destinationsSet;

    this._passageEditFormComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._passageEditFormComponent !== null) {
      return;
    }

    this._passageEditFormComponent = new PassageEditFormView(this._offersSet, this._destinationsSet);
    this._passageEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._passageEditFormComponent.setDeleteClickHandler(this._handleCancelClick);

    render(this._tripPassagesContainer, this._passageEditFormComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._passageEditFormComponent === null) {
      return;
    }

    remove(this._passageEditFormComponent);
    this._passageEditFormComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(passage) {
    this._changeData(
        UserAction.ADD_PASSAGE,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, passage)
    );
    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
