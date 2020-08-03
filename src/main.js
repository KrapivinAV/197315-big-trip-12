import {createTripInfoContainerTemplate} from "./view/trip-info-container.js";
import {createTripInfoMainTemplate} from "./view/trip-info-main.js";
import {createTripInfoCostTemplate} from "./view/trip-info-cost.js";
import {createMainNavTemplate} from "./view/main-nav.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSorterTemplate} from "./view/sorter.js";
import {createEventEditFormTemplate} from "./view/event-edit-form.js";
import {createEventEditFormHeaderTemplate} from "./view/event-edit-form-header.js";
import {createEventEditFormDetailsTemplate} from "./view/event-edit-form-details.js";
import {createEventEditFormDetailsOfferTemplate} from "./view/event-edit-form-details-offer.js";
import {createEventEditFormDetailsDestinationTemplate} from "./view/event-edit-form-details-destination.js";
import {createDaysTemplate} from "./view/days.js";
import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoContainerTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripInfoMainTemplate());
render(tripInfoElement, createTripInfoCostTemplate());

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый

render(tripControlsFirstHeaderElement, createMainNavTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createSorterTemplate());
render(tripEventsElement, createEventEditFormTemplate());
render(tripEventsElement, createDaysTemplate());

const eventEditFormElement = tripEventsElement.querySelector(`.event--edit`);

render(eventEditFormElement, createEventEditFormHeaderTemplate());
render(eventEditFormElement, createEventEditFormDetailsTemplate());

const eventEditFormDetailsElement = eventEditFormElement.querySelector(`.event__details`);

render(eventEditFormDetailsElement, createEventEditFormDetailsOfferTemplate());
render(eventEditFormDetailsElement, createEventEditFormDetailsDestinationTemplate());

const eventDaysElement = tripEventsElement.querySelector(`.trip-days`);

render(eventDaysElement, createDayTemplate());

const eventDayElement = eventDaysElement.querySelector(`.day`);
const eventListElement = eventDayElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(eventListElement, createEventTemplate());
}
