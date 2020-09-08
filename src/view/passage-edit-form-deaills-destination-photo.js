import AbstractView from "./abstract.js";

const createPassageEditFormDetailsDestinationPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo}" alt="Event photo">`;
};

export default class PassageEditFormDetailsDestinationPhoto extends AbstractView {
  constructor(photo) {
    super();

    this.photo = photo;
  }

  getTemplate() {
    return createPassageEditFormDetailsDestinationPhotoTemplate(this.photo);
  }
}
