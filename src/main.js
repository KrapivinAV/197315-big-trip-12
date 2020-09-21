import {generatePassage} from "./mock/passage.js";
import TripPresenter from "./presenter/trip.js";
import PassagesModel from "./model/passages.js";

const PASSAGE_COUNT = 20;

const passages = new Array(PASSAGE_COUNT).fill().map(generatePassage).sort((a, b) => a.passageStartPoint.getTime() - b.passageStartPoint.getTime());

const passagesModel = new PassagesModel();
passagesModel.setPassages(passages);

const tripMainElement = document.querySelector(`.trip-main`);
const tripPassagesElement = document.querySelector(`.trip-events`);
const trip = new TripPresenter(tripMainElement, tripPassagesElement, passagesModel);

trip.init();
