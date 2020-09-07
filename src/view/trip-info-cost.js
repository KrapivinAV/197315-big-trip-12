import AbstractView from "./abstract.js";

const createTripInfoCostTemplate = (cost) => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripInfoCost extends AbstractView {
  constructor(passagesGroups) {
    super();

    this.passagesGroups = passagesGroups;
  }

  getTemplate() {
    const cost = this.passagesGroups.size * 100;
    return createTripInfoCostTemplate(cost);
  }
}
