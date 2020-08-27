import {createElement, render} from "../utils.js";
import PassageContainerView from "./passage-container.js";
import PassagePreviewView from "./passage-preview.js";
import PassageEditFormView from "./passage-edit-form.js";

const createDayTemplate = (dayKey, index) => {

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="${new Date(dayKey).toISOString()}">${new Date(dayKey).toLocaleString(`en-US`, {month: `short`, day: `numeric`})}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
};

export default class Day {
  constructor(dayKey, items, index) {
    this.dayKey = dayKey;
    this.items = items;
    this.index = index;

    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this.dayKey, this.index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  addPassages() {
    const list = this.getElement().querySelector(`.trip-events__list`);

    this.items.forEach((item) => {
      const passageContainerView = new PassageContainerView().getElement();
      render(list, passageContainerView);

      const passagePreviewView = new PassagePreviewView(item);
      passagePreviewView.addOffers();

      const passageEditFormView = new PassageEditFormView(item);
      passageEditFormView.addParts();

      const passagePreviewViewElement = passagePreviewView.getElement();
      const passageEditFormViewElement = passageEditFormView.getElement();

      render(passageContainerView, passagePreviewViewElement);

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          passageContainerView.replaceChild(passagePreviewViewElement, passageEditFormViewElement);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      passagePreviewViewElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, ()=>{
        passageContainerView.replaceChild(passageEditFormViewElement, passagePreviewViewElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      passageEditFormViewElement.addEventListener(`submit`, (evt)=>{
        evt.preventDefault();
        passageContainerView.replaceChild(passagePreviewViewElement, passageEditFormViewElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });
  }

  removeElement() {
    this._element = null;
  }
}
