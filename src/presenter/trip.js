import TripInfoContainerView from "../view/trip-info-container.js";
import MainNavView from "../view/main-nav.js";
import FilterView from "../view/filter.js";
import SorterView from "../view/sorter.js";
import DaysView from "../view/days.js";
import DayView from "../view/day.js";
import NoTripView from "../view/no-trip.js";
import PassagePresenter from "./passage.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByTime, sortByPrice} from "../utils/passage.js";
import {SortType} from "../basis-constants.js";

export default class Trip {
  constructor(tripMainContainer, tripPassagesContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripPassagesContainer = tripPassagesContainer;
    this._currentSortType = SortType.DEFAULT;
    this._passagePresenters = {};

    this._mainNavComponent = new MainNavView();
    this._filterComponent = new FilterView();
    this._noTripComponent = new NoTripView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._sorterComponent = null;
    this._daysComponent = null;
    this._dayComponent = null;
  }

  init(currentPassages) {
    this._sourcePassages = currentPassages.slice();
    this._displayPassagesGroups = new Map();

    this._renderTripInfo(this._generateDisplayPassagesGroups(this._sourcePassages));
    this._renderTripControls();
    this._render();
  }

  _generateDisplayPassagesGroups(passages) {
    const displayPassagesGroups = new Map();

    passages.forEach((passage) => {
      const dayStart = passage.passageStartPoint.setHours(0, 0, 0, 0);

      if (!displayPassagesGroups.has(dayStart)) {
        const dayEnd = passage.passageStartPoint.setHours(23, 59, 59, 999);

        const daySet = passages.filter((item) => {
          const passageStartTime = item.passageStartPoint.getTime();
          return passageStartTime >= dayStart && passageStartTime <= dayEnd;
        });
        displayPassagesGroups.set(dayStart, daySet);
      }
    });

    return displayPassagesGroups;
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

  _sortPassages(sortType) {
    const currentPassages = this._sourcePassages.slice();
    this._displayPassagesGroups.clear();
    switch (sortType) {
      case SortType.TIME_SORT:
        this._displayPassagesGroups.set(0, currentPassages.sort(sortByTime));
        break;
      case SortType.PRICE_SORT:
        this._displayPassagesGroups.set(0, currentPassages.sort(sortByPrice));
        break;
      default:
        this._displayPassagesGroups = this._generateDisplayPassagesGroups(this._sourcePassages);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._render();
  }

  _renderSorter() {
    if (!this._sorterComponent) {
      this._sorterComponent = new SorterView();
      render(this._tripPassagesContainer, this._sorterComponent);
      this._sorterComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderNoTrip() {
    render(this._tripPassagesContainer, this._noTripComponent);
  }

  _renderDaysConteiner() {
    if (!this._daysComponent) {
      this._daysComponent = new DaysView();
      render(this._tripPassagesContainer, this._daysComponent);
    }
  }

  _renderDays(currentPassagesGroups) {
    Array.from(currentPassagesGroups.entries()).forEach((dayGroup, index) => {
      const [dayKey, items] = dayGroup;

      this._dayComponent = new DayView(dayKey, index + 1);
      this._addPassages(items);

      render(this._daysComponent, this._dayComponent);
    });
  }

  _addPassages(items) {
    items.forEach((item) => this._renderPassage(item));
  }

  _renderPassage(item) {
    const dayList = this._dayComponent.getElement().querySelector(`.trip-events__list`);
    const passagePresenter = new PassagePresenter(dayList);
    passagePresenter.init(item);
    this._passagePresenters[item.id] = passagePresenter;
  }

  _renderTripList(currentPassagesGroups) {
    if (!this._sourcePassages.length) {
      remove(this._sorterComponent);
      this._sorterComponent = null;
      remove(this._daysComponent);
      this._daysComponent = null;
      this._renderNoTrip();
      return;
    }

    this._renderSorter();
    this._renderDaysConteiner();
    this._renderDays(currentPassagesGroups);
  }

  _clearTripList() {
    Object
      .values(this._passagePresenters)
      .forEach((presenter) => presenter.destroy());
    this._passagePresenters = {};

    if (this._daysComponent) {
      Array.from(this._daysComponent.getElement().querySelectorAll(`.trip-days__item`)).forEach((item) => item.remove());
    }
  }

  _render() {
    this._sortPassages(this._currentSortType);
    this._clearTripList();
    this._renderTripList(this._displayPassagesGroups);
  }
}

