import {createElement, render} from "../utils.js";
import EventView from "./event.js";
import EventEditFormView from "./event-edit-form.js";

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

  addEvents(items) {
    const list = this.getElement().querySelector(`.trip-events__list`);

    items.forEach((item) => {
      const eventView = new EventView(item);
      eventView.addOffers(item.offers);

      const eventEditFormView = new EventEditFormView(item);
      eventEditFormView.addParts(item);

      const eventViewElement = eventView.getElement();

      // eventViewElement.querySelector(`.event__title`).addEventListener(`click`, (evt)=>{
      //   console.log(evt.target);
      // });

      render(list, eventViewElement);
    });
  }

  removeElement() {
    this._element = null;
  }
}
