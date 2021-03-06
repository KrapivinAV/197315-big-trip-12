import PassageContainerView from "../view/passage-container.js";
import PassagePreviewView from "../view/passage-preview.js";
import PassageEditFormView from "../view/passage-edit-form.js";
import {render, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType, FormType, Mode, State, EvtKey} from "../basis-constants.js";

export default class Passage {
  constructor(dayList, changeData, changeMode, offersSet, destinationsSet) {
    this._dayList = dayList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offersSet = offersSet;
    this._destinationsSet = destinationsSet;

    this._passageContainerComponent = null;
    this._passagePreviewComponent = null;
    this._passageEditFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(passage) {
    this._passage = passage;

    if (!this._passageContainerComponent) {
      this._passageContainerComponent = new PassageContainerView();
      render(this._dayList, this._passageContainerComponent);
    }

    const previousPassagePreviewComponent = this._passagePreviewComponent;
    const previousPassageEditFormComponent = this._passageEditFormComponent;

    this._passagePreviewComponent = new PassagePreviewView(this._passage);
    this._passagePreviewComponent.addOffers();

    this._passageEditFormComponent = new PassageEditFormView(this._offersSet, this._destinationsSet, FormType.EDIT_PASSAGE, this._passage);

    this._passagePreviewComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._passageEditFormComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._passageEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._passageEditFormComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (previousPassagePreviewComponent === null || previousPassageEditFormComponent === null) {
      render(this._passageContainerComponent, this._passagePreviewComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._passagePreviewComponent, previousPassagePreviewComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._passagePreviewComponent, previousPassageEditFormComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(previousPassagePreviewComponent);
    remove(previousPassageEditFormComponent);
  }

  destroy() {
    remove(this._passagePreviewComponent);
    remove(this._passageEditFormComponent);
    remove(this._passageContainerComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPreview();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._taskEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._passageEditFormComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._passageEditFormComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._passagePreviewComponent.shake(resetFormState);
        this._passageEditFormComponent.shake(resetFormState);
        break;
    }
  }

  _replacePreviewToForm() {
    replace(this._passageEditFormComponent, this._passagePreviewComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPreview() {
    replace(this._passagePreviewComponent, this._passageEditFormComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === EvtKey.ESCAPE || evt.key === EvtKey.ESC) {
      evt.preventDefault();
      this._passageEditFormComponent.reset(this._passage);
      this._replaceFormToPreview();
    }
  }

  _handleRollUpClick() {
    this._replacePreviewToForm();
  }

  _handleFormSubmit(update) {
    const isMinorUpdate =
      this._passage.passageStartPoint !== update.passageStartPoint ||
      this._passage.passageEndPoint !== update.passageEndPoint ||
      this._passage.price !== update.price;

    this._changeData(
        UserAction.UPDATE_PASSAGE,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
  }

  _handleDeleteClick(passage) {
    this._changeData(
        UserAction.DELETE_PASSAGE,
        UpdateType.MINOR,
        passage
    );
  }

  _handleFavoriteClick() {
    const destination = this._destinationsSet.filter((item) => item.name === this._passage.waypoint)[0];

    this._changeData(
        UserAction.UPDATE_PASSAGE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._passage,
            {
              isFavorite: !this._passage.isFavorite
            },
            {
              destination
            }
        )
    );
  }
}


