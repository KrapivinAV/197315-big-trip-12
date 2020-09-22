import {generatePassage} from "./mock/passage.js";
import {offersTypeSet} from "./mock/offers.js";
import {destinationTypeSet} from "./mock/destinations.js";
import {render, RenderPosition} from "./utils/render.js";
// import TripInfoContainerView from "./view/trip-info-container.js";
import MainNavView from "./view/main-nav.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";

const PASSAGE_COUNT = 20;

const passages = new Array(PASSAGE_COUNT).fill().map(generatePassage);

const tripMainElement = document.querySelector(`.trip-main`);

// const tripInfoContainerElement = new TripInfoContainerView(passages);
// tripInfoContainerElement.addParts();

// render(tripMainElement, tripInfoContainerElement, RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый

render(tripControlsFirstHeaderElement, new MainNavView(), RenderPosition.AFTER);

const passagesModel = new PassagesModel();
passagesModel.setPassages(passages);

const offersModel = new OffersModel();
offersModel.setOffers(offersTypeSet);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinationTypeSet);

const filterModel = new FilterModel();

const tripPassagesElement = document.querySelector(`.trip-events`);

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, passagesModel);
const trip = new TripPresenter(tripPassagesElement, passagesModel, offersModel, destinationsModel, filterModel);

filterPresenter.init();
trip.init();
