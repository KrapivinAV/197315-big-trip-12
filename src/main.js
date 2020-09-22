import {generatePassage} from "./mock/passage.js";
import {offersTypeSet} from "./mock/offers.js";
import {destinationTypeSet} from "./mock/destinations.js";
import TripPresenter from "./presenter/trip.js";
import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

const PASSAGE_COUNT = 20;

const passages = new Array(PASSAGE_COUNT).fill().map(generatePassage).sort((a, b) => a.passageStartPoint.getTime() - b.passageStartPoint.getTime());

const passagesModel = new PassagesModel();
passagesModel.setPassages(passages);

const offersModel = new OffersModel();
offersModel.setOffers(offersTypeSet);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinationTypeSet);

const tripMainElement = document.querySelector(`.trip-main`);
const tripPassagesElement = document.querySelector(`.trip-events`);
const trip = new TripPresenter(tripMainElement, tripPassagesElement, passagesModel, offersModel, destinationsModel);

trip.init();
