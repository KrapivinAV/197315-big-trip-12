import {render, replace} from "../utils/render.js";
import AbstractView from "./abstract.js";
import PassageContainerView from "./passage-container.js";
import PassagePreviewView from "./passage-preview.js";
import PassageEditFormView from "./passage-edit-form.js";

const createDayTemplate = (dayKey, index) => {

  return dayKey + index !== 1 ?
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${new Date(dayKey).toISOString()}">${new Date(dayKey).toLocaleString(`en-US`, {month: `short`, day: `numeric`})}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>` :
    `<li class="trip-days__item  day">
      <div class="day__info">
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`;
};

export default class Day extends AbstractView {
  constructor(dayKey, items, index) {
    super();

    this.dayKey = dayKey;
    this.items = items;
    this.index = index;
  }

  getTemplate() {
    return createDayTemplate(this.dayKey, this.index);
  }

  addPassages() {
    const list = this.getElement().querySelector(`.trip-events__list`);

    this.items.forEach((item) => {
      const passageContainerView = new PassageContainerView();
      render(list, passageContainerView);

      const passagePreviewView = new PassagePreviewView(item);
      passagePreviewView.addOffers();

      const passageEditFormView = new PassageEditFormView(item);
      passageEditFormView.addParts();

      render(passageContainerView, passagePreviewView);

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          replace(passagePreviewView, passageEditFormView);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      passagePreviewView.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, ()=>{
        replace(passageEditFormView, passagePreviewView);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      passageEditFormView.getElement().addEventListener(`submit`, (evt)=>{
        evt.preventDefault();
        replace(passagePreviewView, passageEditFormView);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });
  }
}
