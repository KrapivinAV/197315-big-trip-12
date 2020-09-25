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

    this._mainNavClickHandler = this._mainNavClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate();
  }

  _mainNavClickHandler(evt) {
    evt.preventDefault();
    const tableItem = this.getElement().querySelector(`a[id=${MenuItem.TABLE}]`);
    const statsItem = this.getElement().querySelector(`a[id=${MenuItem.STATS}]`);

    if (evt.target === tableItem && !evt.target.classList.contains(`.trip-tabs__btn--active`)) {
      tableItem.classList.add(`trip-tabs__btn--active`);
      statsItem.classList.remove(`trip-tabs__btn--active`);
    }

    if (evt.target === statsItem && !evt.target.classList.contains(`.trip-tabs__btn--active`)) {
      statsItem.classList.add(`trip-tabs__btn--active`);
      tableItem.classList.remove(`trip-tabs__btn--active`);
    }

    this._callback.menuClick(evt.target.dataset.mainNavItem);
  }

  setMainNavClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._mainNavClickHandler);
  }

  // setMenuItem(menuItem) {
  //   const item = this.getElement().querySelector(`[value=${menuItem}]`);

  //   if (item !== null) {
  //     item.checked = true;
  //   }
  // }
}
