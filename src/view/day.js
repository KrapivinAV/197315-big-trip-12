/*
export const createDayTemplate = (index, mashineDate, humanDate) => {
  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="${mashineDate}">${humanDate}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
};
*/

import {createEventTemplate} from "./event.js";

export const createDayTemplate = (eventsGroup, dayKey, index) => {
  let dayEventGroup = ``;
  eventsGroup.forEach((event) => {
    dayEventGroup += createEventTemplate(event);
  });

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="${eventsGroup[0].eventStartPoint.toISOString()}">${dayKey}</time>
    </div>

    <ul class="trip-events__list">
      ${dayEventGroup}
    </ul>
  </li>`;
};
