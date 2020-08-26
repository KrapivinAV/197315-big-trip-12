import TripInfoContainerView from "./view/trip-info-container.js";
import TripInfoMainView from "./view/trip-info-main.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import MainNavView from "./view/main-nav.js";
import FilterView from "./view/filter.js";
import SorterView from "./view/sorter.js";
import DaysView from "./view/days.js";
import DayView from "./view/day.js";
import {generatePassage} from "./mock/passage.js";
import {render, RenderPosition} from "./utils.js";

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

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, new TripInfoContainerView().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, new TripInfoMainView().getElement());
render(tripInfoElement, new TripInfoCostView().getElement());

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый

render(tripControlsFirstHeaderElement, new MainNavView().getElement(), RenderPosition.AFTER);
render(tripControlsElement, new FilterView().getElement());

const tripPassagesElement = document.querySelector(`.trip-events`);

render(tripPassagesElement, new SorterView().getElement());

render(tripPassagesElement, new DaysView().getElement());

const passageDaysElement = tripPassagesElement.querySelector(`.trip-days`);

Array.from(passagesGroups.entries()).forEach((dayGroup, index) => {
  const [dayKey, items] = dayGroup;

  const dayView = new DayView(dayKey, index + 1);

  dayView.addPassages(items);

  render(passageDaysElement, dayView.getElement());
});
