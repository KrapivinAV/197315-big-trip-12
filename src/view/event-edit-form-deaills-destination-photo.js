import {createElement} from "../utils.js";

const createEventEditFormDetailsDestinationPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo}" alt="Event photo">`;
};

export default class EventEditFormDetailsDestinationPhoto {
  constructor(photo) {
    this.photo = photo;

    this._element = null;
  }

  getTemplate() {
    return createEventEditFormDetailsDestinationPhotoTemplate(this.photo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
