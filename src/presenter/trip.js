import TripInfoContainerView from "../view/trip-info-container.js";
import MainNavView from "../view/main-nav.js";
import FilterView from "../view/filter.js";
import SorterView from "../view/sorter.js";
import DaysView from "../view/days.js";
import NoTripView from "../view/no-trip.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortByTime, sortByPrice} from "../utils/passage.js";
import {SortType} from "../basis-constants.js";

export default class Trip {
  constructor(tripMainContainer, tripPassagesContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripPassagesContainer = tripPassagesContainer;
    this._currentSortType = SortType.DEFAULT;

    this._mainNavComponent = new MainNavView();
    this._filterComponent = new FilterView();
    this._noTripComponent = new NoTripView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(currentPassages) {
    this._sourcePassages = currentPassages.slice();
    this._sourcePassagesGroups = new Map();
    this._displayPassagesGroups = new Map();

    this._generateSourcePassagesGroups(this._sourcePassages);
    this._renderTripInfo(this._sourcePassagesGroups);
    this._renderTripControls();
    this._render();
  }

  _generateSourcePassagesGroups(passages) {
    passages.forEach((passage) => {
      const dayStart = passage.passageStartPoint.setHours(0, 0, 0, 0);

      if (!this._sourcePassagesGroups.has(dayStart)) {
        const dayEnd = passage.passageStartPoint.setHours(23, 59, 59, 999);

        const daySet = passages.filter((item) => {
          const passageStartTime = item.passageStartPoint.getTime();
          return passageStartTime >= dayStart && passageStartTime <= dayEnd;
        });
        this._sourcePassagesGroups.set(dayStart, daySet);
      }
    });
  }

  _sortPassages(sortType) {
    this._displayPassagesGroups.clear();
    switch (sortType) {
      case SortType.TIME_SORT:
        this._displayPassagesGroups.set(0, this._sourcePassages.sort(sortByTime));
        break;
      case SortType.PRICE_SORT:
        this._displayPassagesGroups.set(0, this._sourcePassages.sort(sortByPrice));
        break;
      default:
        this._displayPassagesGroups = new Map(this._sourcePassagesGroups);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._render();
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
    this._sorterComponent = new SorterView(this._currentSortType);
    render(this._tripPassagesContainer, this._sorterComponent);
    this._sorterComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

    if (this._sorterComponent) {
      this._sorterComponent.getElement().remove();
    }

    if (this._daysComponent) {
      this._daysComponent.getElement().remove();
    }

    this._renderSorter();
    this._renderDays(currentPassagesGroups);
  }

  _render() {
    this._sortPassages(this._currentSortType);
    this._renderTripList(this._displayPassagesGroups);
  }
}

