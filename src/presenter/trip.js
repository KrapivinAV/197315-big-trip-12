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
    this._sorterComponent = new SorterView();
    this._noTripComponent = new NoTripView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(currentPassagesGroups, currentPassagesGroup) {
    this._passagesGroups = new Map(currentPassagesGroups);
    this._basisPassagesGroups = new Map(currentPassagesGroups);
    this._passagesGroup = new Map(currentPassagesGroup);

    this._renderTripInfo(this._passagesGroups);
    this._renderTripControls();
    this._renderTripList(this._passagesGroups);
  }

  _sortPassages(sortType) {
    switch (sortType) {
      case SortType.TIME_SORT:
        this._passagesGroup.set(0, this._passagesGroup.get(0).sort(sortByTime));
        this._passagesGroups = this._passagesGroup;
        break;
      case SortType.PRICE_SORT:
        this._passagesGroups = this._passagesGroup.set(0, this._passagesGroup.get(0).sort(sortByPrice));
        break;
      default:
        this._passagesGroups = this._basisPassagesGroups;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPassages(sortType);
    this._clearPassagesList();
    this._renderDays(this._passagesGroups);
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

  _clearPassagesList() {
    this._daysComponent.getElement().innerHTML = ``;
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
