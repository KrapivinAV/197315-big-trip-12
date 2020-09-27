import PassageEditFormView from "../view/passage-edit-form.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, FormType} from "../basis-constants.js";

export default class PassageNew {
  constructor(tripPassagesContainer, changeData, offersSet, destinationsSet, deactiveteCreatePassageMode) {
    this._tripPassagesContainer = tripPassagesContainer;
    this._changeData = changeData;
    this._offersSet = offersSet;
    this._destinationsSet = destinationsSet;
    this._deactiveteCreatePassageMode = deactiveteCreatePassageMode;

    this._passageEditFormComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._passageEditFormComponent !== null) {
      return;
    }

    this._passageEditFormComponent = new PassageEditFormView(this._offersSet, this._destinationsSet, FormType.CREATE_PASSAGE);
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

    this._deactiveteCreatePassageMode();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._passageEditFormComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._passageEditFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._passageEditFormComponent.shake(resetFormState);
  }

  _handleFormSubmit(passage) {
    this._changeData(
        UserAction.ADD_PASSAGE,
        UpdateType.MINOR,
        passage
    );
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
