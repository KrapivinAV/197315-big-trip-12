import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import TripInfoMainView from "./trip-info-main.js";
import TripInfoCostView from "./trip-info-cost.js";

const createTripInfoContainerTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class TripInfoContainer extends AbstractView {
  constructor(passagesGroups) {
    super();

    this._passagesGroups = passagesGroups;

    this._tripInfoMainComponent = new TripInfoMainView(this._passagesGroups);
    this._tripInfoCostComponent = new TripInfoCostView(this._passagesGroups);
  }

  getTemplate() {
    return createTripInfoContainerTemplate();
  }

  addParts() {
    render(this, this._tripInfoMainComponent);
    render(this, this._tripInfoCostComponent);
  }
}
