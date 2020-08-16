export const createEventTemplate = (event) => {
  const {waypointType, waypoint, offers, eventStartPoint, eventEndPoint, price} = event;
  const MAX_QUANTITY_OF_OFFERS = 3;

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${waypointType} to ${waypoint}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventStartPoint.toISOString()}">${eventStartPoint.getHours()}:${eventStartPoint.getMinutes()}</time>
          &mdash;
          <time class="event__end-time" datetime="${eventEndPoint.toISOString()}">${eventEndPoint.getHours()}:${eventEndPoint.getMinutes()}</time>
        </p>
        <p class="event__duration">${eventEndPoint - eventStartPoint}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">20</span>
        </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
