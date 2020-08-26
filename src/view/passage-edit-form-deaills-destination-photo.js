import {createElement} from "../utils.js";

const createPassageEditFormDetailsDestinationPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo}" alt="Event photo">`;
};

export default class PassageEditFormDetailsDestinationPhoto {
  constructor(photo) {
    this.photo = photo;

    this._element = null;
  }

  getTemplate() {
    return createPassageEditFormDetailsDestinationPhotoTemplate(this.photo);
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
