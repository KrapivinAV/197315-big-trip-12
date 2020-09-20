import PassageContainerView from "../view/passage-container.js";
import PassagePreviewView from "../view/passage-preview.js";
import PassageEditFormView from "../view/passage-edit-form.js";
import {render, replace, remove} from "../utils/render.js";


export default class Passage {
  constructor(dayList, changeData) {
    this._dayList = dayList;
    this._changeData = changeData;

    this._passageContainerComponent = null;
    this._passagePreviewComponent = null;
    this._passageEditFormComponent = null;

    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(passage) {
    this._passage = passage;

    if (!this._passageContainerComponent) {
      this._passageContainerComponent = new PassageContainerView();
      render(this._dayList, this._passageContainerComponent);
    }

    const previousPassagePreviewComponent = this._passagePreviewComponent;
    const previousPassageEditFormComponent = this._passageEditFormComponent;

    this._passagePreviewComponent = new PassagePreviewView(passage);
    this._passagePreviewComponent.addOffers();

    this._passageEditFormComponent = new PassageEditFormView(passage);
    this._passageEditFormComponent.addParts();

    this._passagePreviewComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._passageEditFormComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._passageEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (previousPassagePreviewComponent === null || previousPassageEditFormComponent === null) {
      render(this._passageContainerComponent, this._passagePreviewComponent);
      return;
    }

    if (this._passageContainerComponent.getElement().contains(previousPassagePreviewComponent.getElement())) {
      replace(this._passagePreviewComponent, previousPassagePreviewComponent);
    }

    if (this._passageContainerComponent.getElement().contains(previousPassageEditFormComponent.getElement())) {
      replace(this._passageEditFormComponent, previousPassageEditFormComponent);
    }

    remove(previousPassagePreviewComponent);
    remove(previousPassageEditFormComponent);
  }

  destroy() {
    remove(this._passagePreviewComponent);
    remove(this._passageEditFormComponent);
    remove(this._passageContainerComponent);
  }

  _replacePreviewToForm() {
    replace(this._passageEditFormComponent, this._passagePreviewComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPreview() {
    replace(this._passagePreviewComponent, this._passageEditFormComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(this._passagePreviewComponent, this._passageEditFormComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleRollUpClick() {
    this._replacePreviewToForm();
  }

  _handleFormSubmit(passage) {
    this._changeData(passage);
    this._replaceFormToPreview();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._passage,
            {
              isFavorite: !this._passage.isFavorite
            }
        )
    );
  }
}

