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
import {createEventEditFormOfferTemplate} from "./view/event-edit-form-offer.js";
import {createEventEditFormDetailsDestinationTemplate} from "./view/event-edit-form-details-destination.js";
import {createEventEditFormDetailsDestinationPhotoTemplate} from "./view/photo.js";
import {createDaysTemplate} from "./view/days.js";
import {createDayTemplate} from "./view/day.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.eventStartPoint.getTime() - b.eventStartPoint.getTime());
const firstEvent = events[0];
const eventsGroups = new Map();

events.forEach((event) => {
  const dayStart = event.eventStartPoint.setHours(0, 0, 0, 0);

  if (!eventsGroups.has(dayStart)) {
    const dayEnd = event.eventStartPoint.setHours(23, 59, 59, 999);

    const daySet = events.filter((item) => {
      const eventStartTime = item.eventStartPoint.getTime();
      return eventStartTime >= dayStart && eventStartTime <= dayEnd;
    });
    eventsGroups.set(dayStart, daySet);
  }
});

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

render(eventEditFormElement, createEventEditFormHeaderTemplate(firstEvent));
render(eventEditFormElement, createEventEditFormDetailsTemplate());

const eventEditFormDetailsElement = eventEditFormElement.querySelector(`.event__details`);

if (firstEvent.offers && firstEvent.offers.length !== 0) {
  render(eventEditFormDetailsElement, createEventEditFormDetailsOfferTemplate());
  const eventAvailableOffersContainer = eventEditFormDetailsElement.querySelector(`.event__available-offers`);
  for (let i = 0; i < firstEvent.offers.length; i++) {
    render(eventAvailableOffersContainer, createEventEditFormOfferTemplate(firstEvent.offers[i]));
  }
}

render(eventEditFormDetailsElement, createEventEditFormDetailsDestinationTemplate(firstEvent.description));
const eventPhotosTape = tripEventsElement.querySelector(`.event__photos-tape`);
for (let i = 0; i < firstEvent.offers.length; i++) {
  render(eventPhotosTape, createEventEditFormDetailsDestinationPhotoTemplate(firstEvent.photos[i]));
}

const eventDaysElement = tripEventsElement.querySelector(`.trip-days`);

/*
for (let i = 0; i < eventsGroups.length; i++) {
  render(eventDaysElement, createDayTemplate(i + 1, eventsGroups[i][0].eventStartPoint.toISOString(), eventsGroups[i][0].eventStartPoint.toLocaleString(`en-US`, {month: `short`, day: `numeric`})));
  const eventListElement = eventDaysElement.querySelectorAll(`.trip-events__list`);
  for (let j = 0; j < eventsGroups[i].length; j++) {
    render(eventListElement[eventListElement.length - 1], createEventTemplate(eventsGroups[i][j]));
    const eventPreviewOffers = eventDaysElement.querySelectorAll(`.event__selected-offers`);
    const offersLength = eventsGroups[i][j].offers.length;
    const offerCount = offersLength > MAX_QUANTITY_OF_OFFERS_IN_PREVIEW ? MAX_QUANTITY_OF_OFFERS_IN_PREVIEW : offersLength;
    for (let k = 0; k < offerCount; k++) {
      render(eventPreviewOffers[eventPreviewOffers.length - 1], createEventPreviewOffer(eventsGroups[i][j].offers[k]));
    }
  }
}
*/

Array.from(eventsGroups.entries()).forEach(([dayKey, eventsGroup], index) => {
  render(eventDaysElement, createDayTemplate(eventsGroup, dayKey, index));
});
