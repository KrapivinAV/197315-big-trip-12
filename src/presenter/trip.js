import SorterView from "../view/sorter.js";
import DaysView from "../view/days.js";
import DayView from "../view/day.js";
import LoadingView from "../view/loading.js";
import NoTripView from "../view/no-trip.js";
import PassagePresenter, {State as PassagePresenterViewState} from "./passage.js";
import PassageNewPresenter from "./passage-new.js";
import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByDate, sortByTime, sortByPrice} from "../utils/passage.js";
import {SortType, UpdateType, UserAction} from "../basis-constants.js";

export default class Trip {
  constructor(tripPassagesContainer, passagesModel, offersModel, destinationsModel, filterModel, deactiveteCreatePassageMode, api) {
    this._tripPassagesContainer = tripPassagesContainer;
    this._passagesModel = passagesModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._deactiveteCreatePassageMode = deactiveteCreatePassageMode;
    this._currentSortType = SortType.DEFAULT;
    this._passagePresenters = {};
    this._dayComponents = [];
    this._isLoading = true;
    this._api = api;

    this._noTripComponent = new NoTripView();
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._sorterComponent = null;
    this._daysComponent = null;
    this._dayComponent = null;

    this._passageNewPresenter = null;
  }

  init() {
    this._displayPassagesGroups = new Map();

    this._passagesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._render();
  }

  destroy() {
    this._clearTripList(true);

    remove(this._sorterComponent);

    this._passagesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPassage() {
    this._passageNewPresenter.init();
  }

  _getPassages() {
    const filterType = this._filterModel.getFilter();
    const passages = this._passagesModel.getPassages().slice();
    const filtredPassages = filter[filterType](passages);

    this._displayPassagesGroups.clear();
    switch (this._currentSortType) {
      case SortType.TIME_SORT:
        return this._displayPassagesGroups.set(0, filtredPassages.sort(sortByTime));
      case SortType.PRICE_SORT:
        return this._displayPassagesGroups.set(0, filtredPassages.sort(sortByPrice));
    }

    return this._generateDisplayPassagesGroups(filtredPassages.sort(sortByDate));
  }

  _generateDisplayPassagesGroups(passages) {
    const displayPassagesGroups = new Map();

    passages.forEach((passage) => {
      const dayStart = new Date(passage.passageStartPoint).setHours(0, 0, 0, 0);

      if (!displayPassagesGroups.has(dayStart)) {
        const dayEnd = new Date(passage.passageStartPoint).setHours(23, 59, 59, 999);

        const daySet = passages.filter((item) => {
          const passageStartTime = item.passageStartPoint.getTime();
          return passageStartTime >= dayStart && passageStartTime <= dayEnd;
        });
        displayPassagesGroups.set(dayStart, daySet);
      }
    });

    return displayPassagesGroups;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._render();
  }

  _renderSorter() {
    if (this._sorterComponent !== null) {
      remove(this._sorterComponent);
      this._sorterComponent = null;
    }

    this._sorterComponent = new SorterView(this._currentSortType);
    render(this._tripPassagesContainer, this._sorterComponent);
    this._sorterComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderLoading() {
    render(this._tripPassagesContainer, this._loadingComponent);
  }

  _renderNoTrip() {
    render(this._tripPassagesContainer, this._noTripComponent);
  }

  _renderDaysConteiner() {
    if (!this._daysComponent) {
      this._daysComponent = new DaysView();
      render(this._tripPassagesContainer, this._daysComponent);
      this._passageNewPresenter = new PassageNewPresenter(this._daysComponent, this._handleViewAction, this._offersModel.getOffers(), this._destinationsModel.getDestinations(), this._deactiveteCreatePassageMode);
    }
  }

  _renderDays(currentPassagesGroups) {
    Array.from(currentPassagesGroups.entries()).forEach((dayGroup, index) => {
      const [dayKey, items] = dayGroup;

      this._dayComponent = new DayView(dayKey, index + 1);
      this._addPassages(items);

      this._dayComponents.push(this._dayComponent);

      render(this._daysComponent, this._dayComponent);
    });
  }

  _addPassages(items) {
    items.forEach((item) => this._renderPassage(item));
  }

  _renderPassage(item) {
    const dayList = this._dayComponent.getElement().querySelector(`.trip-events__list`);
    const passagePresenter = new PassagePresenter(dayList, this._handleViewAction, this._handleModeChange, this._offersModel.getOffers(), this._destinationsModel.getDestinations());
    passagePresenter.init(item);
    this._passagePresenters[item.id] = passagePresenter;
  }

  _handleModeChange() {
    this._passageNewPresenter.destroy();
    Object
      .values(this._passagePresenters)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_PASSAGE:
        this._passagePresenters[update.id].setViewState(PassagePresenterViewState.SAVING);
        this._api.updatePassage(update)
          .then((response) => {
            this._passagesModel.updatePassage(updateType, response);
          })
          .catch(() => {
            this._passagePresenters[update.id].setViewState(PassagePresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_PASSAGE:
        this._passageNewPresenter.setSaving();
        this._api.addPassage(update)
          .then((response) => {
            this._passagesModel.addPassage(updateType, response);
          })
          .catch(() => {
            this._passageNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_PASSAGE:
        this._passagePresenters[update.id].setViewState(PassagePresenterViewState.DELETING);
        this._api.deletePassage(update)
          .then(() => {
            this._passagesModel.deletePassage(updateType, update);
          })
          .catch(() => {
            this._passagePresenters[update.id].setViewState(PassagePresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._passagePresenters[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._render();
        break;
      case UpdateType.MAJOR:
        this._render(true);
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTripList();
        break;
    }
  }

  _renderTripList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._passagesModel.getPassages().length) {
      remove(this._sorterComponent);
      this._sorterComponent = null;
      remove(this._daysComponent);
      this._daysComponent = null;
      this._renderNoTrip();
      return;
    }

    this._renderSorter();
    this._renderDaysConteiner();
    this._renderDays(this._getPassages());
  }

  _clearTripList(resetSortType) {
    if (this._passageNewPresenter) {
      this._passageNewPresenter.destroy();
    }

    Object
      .values(this._passagePresenters)
      .forEach((presenter) => presenter.destroy());
    this._passagePresenters = {};

    if (this._daysComponent) {
      this._dayComponents.forEach((item) => {
        remove(item);
        item = null;
      });

      this._dayComponents = [];

      remove(this._daysComponent);
      this._daysComponent = null;
    }

    remove(this._noTripComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _render(resetSortType = false) {
    this._clearTripList(resetSortType);
    this._renderTripList();
  }
}
