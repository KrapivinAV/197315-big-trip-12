import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import DayView from "./day.js";

const createDaysTemplate = () => {
  return `<ul class="trip-days">
  </ul>`;
};

export default class Days extends AbstractView {
  constructor(passagesGroups) {
    super();

    this.passagesGroups = passagesGroups;
  }

  getTemplate() {
    return createDaysTemplate();
  }

  addDays() {
    Array.from(this.passagesGroups.entries()).forEach((dayGroup, index) => {
      const [dayKey, items] = dayGroup;

      const dayView = new DayView(dayKey, items, index + 1);
      dayView.addPassages();

      render(this, dayView);
    });
  }
}
