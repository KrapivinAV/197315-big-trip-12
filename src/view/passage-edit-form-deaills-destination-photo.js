import AbstractView from "./abstract.js";

const createPassageEditFormDetailsDestinationPhotoTemplate = (photo) => {
  const {src, description} = photo;
  return `<img class="event__photo" src="${src}" alt="${description}">`;
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
