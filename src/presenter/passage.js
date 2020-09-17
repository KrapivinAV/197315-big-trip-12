import PassageContainerView from "./passage-container.js";
import PassagePreviewView from "./passage-preview.js";
import PassageEditFormView from "./passage-edit-form.js";
import {render, replace} from "../utils/render.js";


export default class Passage {
  constructor(dayList) {
    this._dayList = dayList;

    this._passageContainerComponent = null;
    this._passagePreviewComponent = null;
    this._passageEditFormComponent = null;

    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(passage) {
    this._passageContainerComponent = new PassageContainerView();
    render(this._dayList, this._passageContainerComponent);

    this._passagePreviewComponent = new PassagePreviewView(passage);
    this._passagePreviewComponent.addOffers();

    this._passageEditFormComponent = new PassageEditFormView(passage);
    this._passageEditFormComponent.addParts();

    this._passagePreviewComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._passageEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._passageContainerComponent, this._passagePreviewComponent);
  }

  _EscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(this._passagePreviewComponent, this._passageEditFormComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  }

  this._passagePreviewComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, ()=>{
    replace(this._passageEditFormComponent, this._passagePreviewComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  })

  this._passageEditFormComponent.getElement().addEventListener(`submit`, (evt)=>{
    evt.preventDefault();
    replace(this._passagePreviewComponent, this._passageEditFormComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  })
}
