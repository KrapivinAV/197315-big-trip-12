import {remove, render, RenderPosition} from "./utils/render.js";
import MainNavView from "./view/main-nav.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import {MenuItem, UpdateType, FilterType} from "./basis-constants.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic h47d7dh42ka06kv`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
const addPassageButtonElement = document.querySelector(`.trip-main__event-add-btn`);
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый
const tripPassagesElement = document.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);
const mainNavComponent = new MainNavView();
const passagesModel = new PassagesModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const activateCreatePassageMode = (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  trip.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  trip.init();
  mainNavComponent.resetMainNavStatus();
  addPassageButtonElement.removeEventListener(`click`, activateCreatePassageMode);
  addPassageButtonElement.disabled = true;
  trip.createPassage();
};

const deactiveteCreatePassageMode = () => {
  addPassageButtonElement.addEventListener(`click`, activateCreatePassageMode);
  addPassageButtonElement.disabled = false;
};

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, passagesModel);
const trip = new TripPresenter(tripPassagesElement, passagesModel, offersModel, destinationsModel, filterModel, deactiveteCreatePassageMode, api);

let statisticsComponent = null;

const handleMainNavClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      trip.init();
      break;
    case MenuItem.STATS:
      trip.destroy();
      statisticsComponent = new StatisticsView(passagesModel.getPassages());
      render(pageBodyContainer, statisticsComponent);
      break;
  }
};

filterPresenter.init();
trip.init();

Promise.all([api.getPassages(), api.getOffers(), api.getDestinations()])
  .then(([points, offers, destinations]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    passagesModel.setPassages(UpdateType.INIT, points);

    render(tripControlsFirstHeaderElement, mainNavComponent, RenderPosition.AFTER);

    mainNavComponent.setMainNavClickHandler(handleMainNavClick);
    addPassageButtonElement.addEventListener(`click`, activateCreatePassageMode);
  })
  .catch(() => {
    offersModel.setOffers([]);
    destinationsModel.setDestinations([]);
    passagesModel.setPassages(UpdateType.INIT, []);

    render(tripControlsFirstHeaderElement, mainNavComponent, RenderPosition.AFTER);

    mainNavComponent.setMainNavClickHandler(handleMainNavClick);
    addPassageButtonElement.addEventListener(`click`, activateCreatePassageMode);
  });
