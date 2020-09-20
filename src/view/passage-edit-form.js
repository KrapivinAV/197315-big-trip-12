import {routeParameters} from "../route-parameters.js";
import {basisConstants} from "../basis-constants.js";
import SmartView from "./smart.js";

const {arrivals} = basisConstants;

const createPassageEditFormHeaderTemplate = (currentWaypointType, currentWaypoint, passageStartPoint, passageEndPoint, price, isFavorite) => {
  const routePlaceholderPart = arrivals.includes(currentWaypointType) ? `in` : `to`;
  const checkedStatus = isFavorite ? `checked` : ``;

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${currentWaypointType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${currentWaypointType} ${routePlaceholderPart}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentWaypoint}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
        <option value="Saint Petersburg"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${passageStartPoint.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`})} ${passageStartPoint.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${passageEndPoint.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`})} ${passageEndPoint.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedStatus}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`;
};

const createPassageEditFormDetailsTemplate = (currentWaypointType, offers, description, photos) => {
  const offersCategory = arrivals.includes(currentWaypointType) ? routeParameters.arrivals.slice() : routeParameters.vehicles.slice();
  const offersTypeSet = offersCategory.filter((item) => item.name === currentWaypointType)[0].offerSet;

  return `<section class="event__details">
    ${(offersTypeSet && offersTypeSet.length !== 0) ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTypeSet.map((item) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${item.title}" type="checkbox" name="${item.title}" ${offers.includes(item) ? `checked` : ``}>
          <label class="event__offer-label" for="${item.title}">
            <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.cost}</span>
          </label>
        </div>`).join(``)}
      </div>
    </section>` : ``}
    ${(description || (photos && photos.length !== 0)) ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``)}
        </div>
      </div>
    </section>` : ``}
  </section>`;
};

const createPassageEditFormTemplate = (data) => {
  const {currentWaypointType, currentWaypoint, passageStartPoint, passageEndPoint, price, isFavorite, offers, description, photos} = data;

  const headerTemplate = createPassageEditFormHeaderTemplate(currentWaypointType, currentWaypoint, passageStartPoint, passageEndPoint, price, isFavorite);
  const detailTemplate = createPassageEditFormDetailsTemplate(currentWaypointType, offers, description, photos);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    ${headerTemplate}
    ${detailTemplate}
  </form>`;
};

export default class PassageEditForm extends SmartView {
  constructor(passage) {
    super();

    this._passage = passage;
    this._data = PassageEditForm.parsePassageToData(passage);

    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._waypointTypeChangeHandler = this._waypointTypeChangeHandler.bind(this);
    this._waypointChangeHandler = this._waypointChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(passage) {
    this.updateData(
        PassageEditForm.parsePassageToData(passage)
    );
  }

  getTemplate() {
    return createPassageEditFormTemplate(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PassageEditForm.parseDataToPassage(this._data));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__type-list`)
    .addEventListener(`change`, this._waypointTypeChangeHandler);
    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`change`, this._waypointChangeHandler);
    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._priceInputHandler);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _waypointTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentWaypointType: evt.target.value
    });
  }

  _waypointChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentWaypoint: evt.target.value
    });
  }

  static parsePassageToData(passage) {
    return Object.assign(
        {},
        passage,
        {
          currentWaypointType: passage.waypointType,
          currentWaypoint: passage.waypoint
        }
    );
  }

  static parseDataToPassage(data) {
    data = Object.assign({}, data);

    data.waypointType = data.currentWaypointType;
    data.waypoint = data.currentWaypoint;

    delete data.currentWaypointType;
    delete data.currentWaypoint;

    return data;
  }
}
