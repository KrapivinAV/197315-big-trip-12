import {remove, render} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType, RenderPosition, AUTHORIZATION, END_POINT} from "./basis-constants.js";
import MainNavView from "./view/main-nav.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";

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

const handleAddPassageClick = (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  trip.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  trip.init();
  mainNavComponent.resetMainNavStatus();
  addPassageButtonElement.removeEventListener(`click`, handleAddPassageClick);
  addPassageButtonElement.disabled = true;
  trip.createPassage();
};

const handleAddPassageClose = () => {
  addPassageButtonElement.addEventListener(`click`, handleAddPassageClick);
  addPassageButtonElement.disabled = false;
};

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, passagesModel);
const trip = new TripPresenter(tripPassagesElement, passagesModel, offersModel, destinationsModel, filterModel, handleAddPassageClose, api);

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

addPassageButtonElement.disabled = true;

render(tripControlsFirstHeaderElement, mainNavComponent, RenderPosition.AFTER);

mainNavComponent.setMainNavToDisabledMode();

filterPresenter.init();
trip.init();

Promise.all([api.getPassages(), api.getOffers(), api.getDestinations()])
  .then(([points, offers, destinations]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    passagesModel.setPassages(UpdateType.INIT, points);
    addPassageButtonElement.disabled = false;
    mainNavComponent.setMainNavToDefaultMode();

    mainNavComponent.setMainNavClickHandler(handleMainNavClick);
    addPassageButtonElement.addEventListener(`click`, handleAddPassageClick);
  })
  .catch(() => {
    offersModel.setOffers([]);
    destinationsModel.setDestinations([]);
    passagesModel.setPassages(UpdateType.INIT, []);
    addPassageButtonElement.disabled = false;
    mainNavComponent.setMainNavToDefaultMode();

    mainNavComponent.setMainNavClickHandler(handleMainNavClick);
    addPassageButtonElement.addEventListener(`click`, handleAddPassageClick);
  });
