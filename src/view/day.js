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
