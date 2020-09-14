import TripInfoContainerView from "../view/trip-info-container.js";
import MainNavView from "../view/main-nav.js";
import FilterView from "../view/filter.js";
import SorterView from "../view/sorter.js";
import DaysView from "../view/days.js";
import NoTripView from "../view/no-trip.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(tripMainContainer, tripPassagesContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripPassagesContainer = tripPassagesContainer;

    this._mainNavComponent = new MainNavView();
    this._filterComponent = new FilterView();
    this._sorterComponent = new SorterView();
    this._noTripComponent = new NoTripView();
  }

  init(currentPassagesGroups) {
    this._renderTripInfo(currentPassagesGroups);
    this._renderTripControls();
    this._renderTripList(currentPassagesGroups);
  }

  _renderTripInfo(currentPassagesGroups) {
    this._tripInfoContainerComponent = new TripInfoContainerView(currentPassagesGroups);
    this._tripInfoContainerComponent.addParts();
    render(this._tripMainContainer, this._tripInfoContainerComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripControls() {
    const tripControlsElement = this._tripMainContainer.querySelector(`.trip-controls`);
    const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`.trip-controls h2`); // найдет первый

    render(tripControlsFirstHeaderElement, this._mainNavComponent, RenderPosition.AFTER);
    render(tripControlsElement, this._filterComponent);
  }

  _renderSorter() {
    render(this._tripPassagesContainer, this._sorterComponent);
  }

  _renderDays(currentPassagesGroups) {
    this._daysComponent = new DaysView(currentPassagesGroups);
    this._daysComponent.addDays();
    render(this._tripPassagesContainer, this._daysComponent);
  }

  _renderNoTrip() {
    render(this._tripPassagesContainer, this._noTripComponent);
  }

  _renderTripList(currentPassagesGroups) {
    if (!currentPassagesGroups.size) {
      this._renderNoTrip();
      return;
    }

    this._renderSorter();
    this._renderDays(currentPassagesGroups);
  }
}
