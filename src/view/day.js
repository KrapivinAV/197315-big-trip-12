import {createElement, render} from "../utils.js";
import PassageView from "./passage.js";
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
  constructor(dayKey, index) {
    this.dayKey = dayKey;
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

  addPassages(items) {
    const list = this.getElement().querySelector(`.trip-events__list`);

    items.forEach((item) => {
      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          passageViewElement.replaceChild(passageInnerViewElement, passageEditFormViewElement);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      const passageView = new PassageView(item);
      passageView.addOffers(item.offers);

      const passageEditFormView = new PassageEditFormView(item);
      passageEditFormView.addParts(item);

      const passageViewElement = passageView.getElement();
      const passageEditFormViewElement = passageEditFormView.getElement();

      render(list, passageViewElement);

      const passageInnerViewElement = passageViewElement.querySelector(`.event`);

      passageViewElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, ()=>{
        passageViewElement.replaceChild(passageEditFormViewElement, passageInnerViewElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      passageEditFormViewElement.addEventListener(`submit`, (evt)=>{
        evt.preventDefault();
        passageViewElement.replaceChild(passageInnerViewElement, passageEditFormViewElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });
  }

  removeElement() {
    this._element = null;
  }
}
