import {basisConstants, typeTranslations} from "../basis-constants.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_PASSAGE = {
  isFavorite: false,
  offers: [],
  passageEndPoint: new Date(),
  passageStartPoint: new Date(),
  price: ``,
  waypoint: ``,
  waypointType: ``
};

const {arrivals} = basisConstants;
let availableOffersCheckedStatus = {};

const createPassageEditFormHeaderTemplate = (waypointType, waypoint, price, isFavorite) => {
  let routePlaceholderPart = ``;
  let checkedStatus = ``;
  let typeMark = null;

  if (waypointType !== ``) {
    routePlaceholderPart = arrivals.some((item) => item.toLowerCase() === waypointType.toLowerCase()) ? `in` : `to`;
    checkedStatus = isFavorite ? `checked` : ``;
    typeMark = waypointType.toLowerCase() === `check-in` ? `checkIn` : waypointType.toLowerCase();
  }

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${waypointType !== `` ? waypointType : `bus`}.png" alt="Event type icon">
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
        ${typeTranslations[typeMark]} ${routePlaceholderPart}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint}" list="destination-list-1">
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
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${waypointType !== `` ? `Delete` : `Cancel`}</button>

    ${waypointType !== `` ?
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedStatus}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>` :
    ``}

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`;
};

const createPassageEditFormDetailsTemplate = (waypointType, waypoint, offers, offersTypes, destinationTypes) => {
  let typeOffers = null;

  if (waypointType !== ``) {
    typeOffers = offersTypes.filter((item) => item.name.toLowerCase() === waypointType.toLowerCase())[0].offerSet;
  }

  let currentDescription = null;
  let currentPhotos = null;

  if (waypoint !== ``) {
    currentDescription = destinationTypes.filter((item) => item.name.toLowerCase() === waypoint.toLowerCase())[0].description;
    currentPhotos = destinationTypes.filter((item) => item.name.toLowerCase() === waypoint.toLowerCase())[0].pictures;
  }

  return `<section class="event__details">
    ${(typeOffers && typeOffers.length !== 0) ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${typeOffers.map((item) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${item.title}" type="checkbox" name="${item.title}" ${offers.some((offer) => offer.title.toLowerCase() === item.title.toLowerCase()) ? `checked` : ``}>
          <label class="event__offer-label" for="${item.title}" data-waypoint-type="${waypointType}">
            <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.cost}</span>
          </label>
        </div>`).join(``)}
      </div>
    </section>` : ``}
    ${(currentDescription || (currentPhotos && currentPhotos.length !== 0)) ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDescription}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${currentPhotos.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``)}
        </div>
      </div>
    </section>` : ``}
  </section>`;
};

const createPassageEditFormTemplate = (data, offersTypeSet, destinationTypeSet) => {
  const {waypointType, waypoint, price, isFavorite, offers} = data;

  const headerTemplate = createPassageEditFormHeaderTemplate(waypointType, waypoint, price, isFavorite);
  const detailTemplate = createPassageEditFormDetailsTemplate(waypointType, waypoint, offers, offersTypeSet, destinationTypeSet);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    ${headerTemplate}
    ${detailTemplate}
  </form>`;
};

export default class PassageEditForm extends SmartView {
  constructor(offersSet, destinationsSet, passage = BLANK_PASSAGE) {
    super();

    this._passage = passage;
    this._offersSet = offersSet;
    this._destinationsSet = destinationsSet;
    this._data = PassageEditForm.parsePassageToData(passage);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._waypointTypeChangeHandler = this._waypointTypeChangeHandler.bind(this);
    this._waypointChangeHandler = this._waypointChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._availableOffersHandler = this._availableOffersHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(passage) {
    this.updateData(
        PassageEditForm.parsePassageToData(passage)
    );
  }

  getTemplate() {
    return createPassageEditFormTemplate(this._data, this._offersSet, this._destinationsSet);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PassageEditForm.parseDataToPassage(this._data, this._offersSet));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setStartDatepicker() {
    this._setDatepicker(this._startDatepicker, `input[id=event-start-time-1]`, this._data.passageStartPoint, this._startDateChangeHandler);
  }

  _setEndDatepicker() {
    this._setDatepicker(this._endDatepicker, `input[id=event-end-time-1]`, this._data.passageEndPoint, this._endDateChangeHandler);
  }

  _setDatepicker(datepicker, elementSelector, basisDate, callback) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }

    datepicker = flatpickr(
        this.getElement().querySelector(elementSelector),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          [`time_24hr`]: true,
          defaultDate: basisDate,
          onChange: callback
        }
    );
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      passageStartPoint: userDate
    }, true);
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      passageEndPoint: userDate
    }, true);
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

    const availableOffersContainer = this.getElement().querySelector(`.event__available-offers`);

    if (availableOffersContainer) {
      availableOffersContainer.addEventListener(`click`, this._availableOffersHandler);
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _availableOffersHandler(evt) {
    evt.preventDefault();
    const currentTarget = evt.target.tagName === `SPAN` ? evt.target.parentElement : evt.target;
    const typeOffers = this._offersSet.filter((item) => item.name.toLowerCase() === currentTarget.dataset.waypointType.toLowerCase())[0].offerSet;
    typeOffers.forEach((item) => {
      availableOffersCheckedStatus[item.title] = this._data.offers.some((offer) => offer.title.toLowerCase() === item.title.toLowerCase());
      return item;
    });

    availableOffersCheckedStatus[currentTarget.getAttribute(`for`)] = !availableOffersCheckedStatus[currentTarget.getAttribute(`for`)];
    this.updateData({
      availableOffersCheckedStatus
    });
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
      waypointType: evt.target.value
    });
  }

  _waypointChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      waypoint: evt.target.value
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PassageEditForm.parseDataToPassage(this._data, this._offersSet));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parsePassageToData(passage) {
    return Object.assign(
        {},
        passage,
        {
          availableOffersCheckedStatus
        }
    );
  }

  static parseDataToPassage(data, basisOffersSet) {
    data.offers = [];
    const typeOffers = basisOffersSet.filter((item) => item.name.toLowerCase() === data.waypointType.toLowerCase())[0].offerSet;
    typeOffers.forEach((item) => {
      if (availableOffersCheckedStatus[item.title]) {
        data.offers.push(item);
      }
      return item;
    });

    data = Object.assign({}, data);

    availableOffersCheckedStatus = {};

    return data;
  }
}
