import {basisConstants, typeTranslations, WaypointType, FormType, BLANK_PASSAGE, FIRST_ITEM, MIN_PRICE} from "../basis-constants.js";
import SmartView from "./smart.js";

import he from "he";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createPassageEditFormHeaderTemplate = (waypointType, waypoint, price, isFavorite, formType, destinationTypeSet, isDisabled, isSaving, isDeleting, currentWaypointType) => {
  const {arrivals} = basisConstants;
  let routePlaceholderPart = ``;
  let checkedStatus = ``;
  let typeMark = null;
  const deleteStatus = isDeleting ? `deleting...` : `delete`;

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
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${currentWaypointType === WaypointType.TAXI ? `checked` : ``}>
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${currentWaypointType === WaypointType.BUS ? `checked` : ``}>
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${currentWaypointType === WaypointType.TRAIN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${currentWaypointType === WaypointType.SHIP ? `checked` : ``}>
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${currentWaypointType === WaypointType.TRANSPORT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${currentWaypointType === WaypointType.DRIVE ? `checked` : ``}>
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${currentWaypointType === WaypointType.FLIGHT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${currentWaypointType === WaypointType.CHECK_IN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${currentWaypointType === WaypointType.SIGHTSEEING ? `checked` : ``}>
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${currentWaypointType === WaypointType.RESTAURANT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${typeTranslations[typeMark]} ${routePlaceholderPart}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(waypoint)}" list="destination-list-1" required ${isDisabled ? `disabled` : ``}>
      <datalist id="destination-list-1">
        ${destinationTypeSet.map((item) => `<option value="${item.name}"></option>`).join(``)}}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? `disabled` : ``}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? `disabled` : ``}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" required ${isDisabled ? `disabled` : ``}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `saving...` : `save`}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${formType === `EDIT_PASSAGE` ? deleteStatus : `Cancel`}</button>

    ${formType === `EDIT_PASSAGE` ?
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedStatus} ${isDisabled ? `disabled` : ``}>
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

const createPassageEditFormDetailsTemplate = (waypointType, waypoint, offers, offersTypes, destinationTypes, isDisabled) => {
  let typeOffers = null;

  if (waypointType !== ``) {
    typeOffers = offersTypes.filter((item) => item.name.toLowerCase() === waypointType.toLowerCase())[FIRST_ITEM].offerSet;
  }

  let currentDescription = null;
  let currentPhotos = null;

  if (waypoint !== ``) {
    currentDescription = destinationTypes.filter((item) => item.name.toLowerCase() === waypoint.toLowerCase())[FIRST_ITEM].description;
    currentPhotos = destinationTypes.filter((item) => item.name.toLowerCase() === waypoint.toLowerCase())[FIRST_ITEM].pictures;
  }

  return `<section class="event__details">
    ${(typeOffers && typeOffers.length !== 0) ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${typeOffers.map((item) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${item.title}" type="checkbox" name="${item.title}" ${offers.some((offer) => offer.title.toLowerCase() === item.title.toLowerCase()) ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label class="event__offer-label" for="${item.title}" data-waypoint-type="${waypointType}">
            <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
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

const createPassageEditFormTemplate = (data, offersTypeSet, destinationTypeSet, formType, currentWaypointType) => {
  const {waypointType, waypoint, price, isFavorite, offers, isDisabled, isSaving, isDeleting} = data;

  const headerTemplate = createPassageEditFormHeaderTemplate(waypointType, waypoint, price, isFavorite, formType, destinationTypeSet, isDisabled, isSaving, isDeleting, currentWaypointType);
  const detailTemplate = createPassageEditFormDetailsTemplate(waypointType, waypoint, offers, offersTypeSet, destinationTypeSet);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    ${headerTemplate}
    ${detailTemplate}
  </form>`;
};

export default class PassageEditForm extends SmartView {
  constructor(offersSet, destinationsSet, formType, passage = BLANK_PASSAGE) {
    super();

    this._passage = passage;
    this._offersSet = offersSet;
    this._destinationsSet = destinationsSet;
    this._formType = formType;
    this._data = PassageEditForm.parsePassageToData(passage);
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._currentWaypointType = formType === FormType.EDIT_PASSAGE ? this._data.waypointType : WaypointType.BUS;

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
    return createPassageEditFormTemplate(this._data, this._offersSet, this._destinationsSet, this._formType, this._currentWaypointType);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`input[id=event-start-time-1]`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          [`time_24hr`]: true,
          defaultDate: this._data.passageStartPoint,
          onChange: this._startDateChangeHandler
        }
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`input[id=event-end-time-1]`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          [`time_24hr`]: true,
          defaultDate: this._data.passageEndPoint,
          onChange: this._endDateChangeHandler
        }
    );

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
    .addEventListener(`change`, this._priceInputHandler);

    if (this.getElement().querySelector(`.event__offer-checkbox`)) {
      const availableOffers = Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`));

      availableOffers.forEach((item) => {
        item.addEventListener(`change`, this._availableOffersHandler);
      });
    }
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    if (this._data.waypointType === ``) {
      this._data.waypointType = `bus`;
    }

    if (this.getElement().checkValidity()) {
      const destination = this._destinationsSet.filter((item) => item.name === this._data.waypoint)[FIRST_ITEM];
      this._callback.formSubmit(PassageEditForm.parseDataToPassage(this._data, destination));
    }
  }

  _startDateChangeHandler([userDate]) {
    const isValid = this._data.passageEndPoint > userDate;
    this._data.passageEndPoint = isValid ? this._data.passageEndPoint : userDate;

    this.updateData({
      passageStartPoint: userDate
    });
  }

  _endDateChangeHandler([userDate]) {
    const isValid = this._data.passageStartPoint < userDate;
    this._data.passageStartPoint = isValid ? this._data.passageStartPoint : userDate;

    this.updateData({
      passageEndPoint: userDate
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    const isValid = +evt.target.value === parseInt(evt.target.value, 10) && +evt.target.value >= MIN_PRICE;
    const massage = !isValid ? `Введите целое положительное число.` : ``;

    evt.target.setCustomValidity(massage);
    this.getElement().reportValidity();

    if (!isValid) {
      return;
    }

    this.updateData({
      price: evt.target.value
    }, true);
  }

  _availableOffersHandler(evt) {
    evt.preventDefault();
    const currentOffersSet = Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox:checked`));
    const typeOffers = this._offersSet.filter((item) => item.name.toLowerCase() === this._data.waypointType.toLowerCase())[FIRST_ITEM].offerSet;

    this._data.offers = [];

    currentOffersSet.forEach((element) => {
      const currentOffer = typeOffers.filter((item) => item.title === element.name)[FIRST_ITEM];
      this._data.offers.push(currentOffer);
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
    this._currentWaypointType = evt.target.value;
    this._data.offers = [];
    this.updateData({
      waypointType: evt.target.value
    });
  }

  _waypointChangeHandler(evt) {
    evt.preventDefault();
    const isExist = this._destinationsSet.some((item) => item.name === evt.target.value);
    const massage = !isExist ? `Данный пункт назначения недоступен.` : ``;

    evt.target.setCustomValidity(massage);
    this.getElement().reportValidity();

    if (!isExist) {
      return;
    }

    this.updateData({
      waypoint: evt.target.value
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PassageEditForm.parseDataToPassage(this._data));
  }

  static parsePassageToData(passage) {
    return Object.assign(
        {},
        passage,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToPassage(data, destination) {
    data = Object.assign(
        {},
        data,
        {
          destination
        }
    );

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
