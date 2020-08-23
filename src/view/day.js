import {createElement} from "../utils.js";

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

  removeElement() {
    this._element = null;
  }
}
