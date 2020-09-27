import FilterView from "../view/filter.js";
import {render, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../basis-constants.js";

export default class Filter {
  constructor(filterContainer, filterModel, passagesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._passagesModel = passagesModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._passagesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const passages = this._passagesModel.getPassages();

    return [
      {
        type: FilterType.EVERYTHING,
        name: `EVERYTHING`,
        count: filter[FilterType.EVERYTHING](passages).length
      },
      {
        type: FilterType.FUTURE,
        name: `FUTURE`,
        count: filter[FilterType.FUTURE](passages).length
      },
      {
        type: FilterType.PAST,
        name: `PAST`,
        count: filter[FilterType.PAST](passages).length
      }
    ];
  }
}
