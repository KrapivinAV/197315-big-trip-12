import AbstractView from "./abstract.js";

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
  constructor(dayKey, index) {
    super();

    this.dayKey = dayKey;
    this.index = index;
  }

  getTemplate() {
    return createDayTemplate(this.dayKey, this.index);
  }
}
