import {generatePassage} from "./mock/passage.js";
import {offersTypeSet} from "./mock/offers.js";
import {destinationTypeSet} from "./mock/destinations.js";
import {remove, render, RenderPosition} from "./utils/render.js";
// import TripInfoContainerView from "./view/trip-info-container.js";
import MainNavView from "./view/main-nav.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import {MenuItem, UpdateType, FilterType} from "./basis-constants.js";

const PASSAGE_COUNT = 20;

const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
const addPassageButtonElement = document.querySelector(`.trip-main__event-add-btn`);

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

const passages = new Array(PASSAGE_COUNT).fill().map(generatePassage);

const tripMainElement = document.querySelector(`.trip-main`);

// const tripInfoContainerElement = new TripInfoContainerView(passages);
// tripInfoContainerElement.addParts();

// render(tripMainElement, tripInfoContainerElement, RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый
const mainNavComponent = new MainNavView();

render(tripControlsFirstHeaderElement, mainNavComponent, RenderPosition.AFTER);

const passagesModel = new PassagesModel();
passagesModel.setPassages(passages);

const offersModel = new OffersModel();
offersModel.setOffers(offersTypeSet);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinationTypeSet);

const filterModel = new FilterModel();

const tripPassagesElement = document.querySelector(`.trip-events`);

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, passagesModel);
const trip = new TripPresenter(tripPassagesElement, passagesModel, offersModel, destinationsModel, filterModel, deactiveteCreatePassageMode);

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

mainNavComponent.setMainNavClickHandler(handleMainNavClick);

filterPresenter.init();
trip.init();

addPassageButtonElement.addEventListener(`click`, activateCreatePassageMode);
