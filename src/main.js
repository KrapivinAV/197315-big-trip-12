import TripInfoContainerView from "./view/trip-info-container.js";
import TripInfoMainView from "./view/trip-info-main.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import MainNavView from "./view/main-nav.js";
import FilterView from "./view/filter.js";
import SorterView from "./view/sorter.js";
import EventEditFormView from "./view/event-edit-form.js";
import EventEditFormHeaderView from "./view/event-edit-form-header.js";
import EventEditFormDetailsView from "./view/event-edit-form-details.js";
import EventEditFormDetailsOfferView from "./view/event-edit-form-details-offer.js";
import EventEditFormOfferView from "./view/event-edit-form-offer.js";
import EventEditFormDetailsDestinationView from "./view/event-edit-form-details-destination.js";
import EventEditFormDetailsDestinationPhotoView from "./view/photo.js";
import DaysView from "./view/days.js";
import DayView from "./view/day.js";
import EventView from "./view/event.js";
import {generateEvent} from "./mock/event.js";
import {renderNew, RenderPosition} from "./utils.js";

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

const tripMainElement = document.querySelector(`.trip-main`);

renderNew(tripMainElement, new TripInfoContainerView().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

renderNew(tripInfoElement, new TripInfoMainView().getElement());
renderNew(tripInfoElement, new TripInfoCostView().getElement());

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый

renderNew(tripControlsFirstHeaderElement, new MainNavView().getElement(), RenderPosition.AFTER);
renderNew(tripControlsElement, new FilterView().getElement());

const tripEventsElement = document.querySelector(`.trip-events`);

renderNew(tripEventsElement, new SorterView().getElement());
renderNew(tripEventsElement, new EventEditFormView().getElement());
renderNew(tripEventsElement, new DaysView().getElement());

const eventEditFormElement = tripEventsElement.querySelector(`.event--edit`);

renderNew(eventEditFormElement, new EventEditFormHeaderView(firstEvent).getElement());
renderNew(eventEditFormElement, new EventEditFormDetailsView().getElement());

const eventEditFormDetailsElement = eventEditFormElement.querySelector(`.event__details`);

if (firstEvent.offers && firstEvent.offers.length !== 0) {
  renderNew(eventEditFormDetailsElement, new EventEditFormDetailsOfferView().getElement());
  const eventAvailableOffersContainer = eventEditFormDetailsElement.querySelector(`.event__available-offers`);
  firstEvent.offers.forEach((offer) => {
    renderNew(eventAvailableOffersContainer, new EventEditFormOfferView(offer).getElement());
  });
}

renderNew(eventEditFormDetailsElement, new EventEditFormDetailsDestinationView(firstEvent.description).getElement());
const eventPhotosTape = tripEventsElement.querySelector(`.event__photos-tape`);
firstEvent.photos.forEach((photo) => {
  renderNew(eventPhotosTape, new EventEditFormDetailsDestinationPhotoView(photo).getElement());
});

const eventDaysElement = tripEventsElement.querySelector(`.trip-days`);

Array.from(eventsGroups.keys()).forEach((dayKey, index) => {
  renderNew(eventDaysElement, new DayView(dayKey, index + 1).getElement());
});

Array.from(eventDaysElement.querySelectorAll(`.trip-events__list`)).forEach((list, index) => {
  Array.from(eventsGroups.values())[index].forEach((item) => {
    renderNew(list, new EventView(item).getElement());
  });
});
