import AbstractView from "./abstract.js";
import {MenuItem} from "../basis-constants.js";

const createMainNavTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">Stats</a>
  </nav>`;
};

export default class MainNav extends AbstractView {
  constructor() {
    super();

    this._tableItem = this.getElement().querySelector(`a[id=${MenuItem.TABLE}]`);
    this._statsItem = this.getElement().querySelector(`a[id=${MenuItem.STATS}]`);

    this._mainNavClickHandler = this._mainNavClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate();
  }

  setMainNavClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._mainNavClickHandler);
  }

  resetMainNavStatus() {
    this._tableItem.classList.add(`trip-tabs__btn--active`);
    this._statsItem.classList.remove(`trip-tabs__btn--active`);
  }

  setMainNavToDefaultMode() {
    this._tableItem.classList.remove(`trip-tabs__btn--disabled`);
    this._statsItem.classList.remove(`trip-tabs__btn--disabled`);
  }

  setMainNavToDisabledMode() {
    this._tableItem.classList.add(`trip-tabs__btn--disabled`);
    this._statsItem.classList.add(`trip-tabs__btn--disabled`);
  }

  _mainNavClickHandler(evt) {
    evt.preventDefault();

    if (evt.target === this._tableItem && !evt.target.classList.contains(`.trip-tabs__btn--active`)) {
      this.resetMainNavStatus();
    }

    if (evt.target === this._statsItem && !evt.target.classList.contains(`.trip-tabs__btn--active`)) {
      this._statsItem.classList.add(`trip-tabs__btn--active`);
      this._tableItem.classList.remove(`trip-tabs__btn--active`);
    }

    this._callback.menuClick(evt.target.id);
  }
}
