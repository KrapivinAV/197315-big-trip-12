import AbstractView from "./abstract.js";

const createPassageContainerTemplate = () => {
  return `<li class="trip-events__item">
  </li>`;
};

export default class PassageContainer extends AbstractView {
  getTemplate() {
    return createPassageContainerTemplate();
  }
}
