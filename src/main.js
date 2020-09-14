import {generatePassage} from "./mock/passage.js";
import TripPresenter from "./presenter/trip.js";

const PASSAGE_COUNT = 20;

const passages = new Array(PASSAGE_COUNT).fill().map(generatePassage).sort((a, b) => a.passageStartPoint.getTime() - b.passageStartPoint.getTime());
const passagesGroups = new Map();

passages.forEach((passage) => {
  const dayStart = passage.passageStartPoint.setHours(0, 0, 0, 0);

  if (!passagesGroups.has(dayStart)) {
    const dayEnd = passage.passageStartPoint.setHours(23, 59, 59, 999);

    const daySet = passages.filter((item) => {
      const passageStartTime = item.passageStartPoint.getTime();
      return passageStartTime >= dayStart && passageStartTime <= dayEnd;
    });
    passagesGroups.set(dayStart, daySet);
  }
});

console.log(passagesGroups);

const tripMainElement = document.querySelector(`.trip-main`);
const tripPassagesElement = document.querySelector(`.trip-events`);
const trip = new TripPresenter(tripMainElement, tripPassagesElement);

trip.init(passagesGroups);
