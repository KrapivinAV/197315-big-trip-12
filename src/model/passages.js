import Observer from "../utils/observer.js";

export default class Passages extends Observer {
  constructor() {
    super();
    this._passages = [];
  }

  setPassages(updateType, passages) {
    this._passages = passages.slice();

    this._notify(updateType);
  }

  getPassages() {
    return this._passages;
  }

  updatePassage(updateType, update) {
    const index = this._passages.findIndex((passage) => passage.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting passage`);
    }

    this._passages = [
      ...this._passages.slice(0, index),
      update,
      ...this._passages.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPassage(updateType, update) {
    this._passages = [
      update,
      ...this._passages
    ];

    this._notify(updateType, update);
  }

  deletePassage(updateType, update) {
    const index = this._passages.findIndex((passage) => passage.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting passage`);
    }

    this._passages = [
      ...this._passages.slice(0, index),
      ...this._passages.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(passage) {
    const adaptedPassage = Object.assign(
        {},
        passage,
        {
          waypointType: passage.type,
          waypoint: passage.destination.name,
          passageStartPoint: new Date(passage.date_from),
          passageEndPoint: new Date(passage.date_to),
          description: passage.destination.description,
          photos: passage.destination.pictures,
          price: passage.base_price,
          isFavorite: passage.is_favorite
        }
    );

    delete adaptedPassage.type;
    delete adaptedPassage.destination;
    delete adaptedPassage.date_from;
    delete adaptedPassage.date_to;
    delete adaptedPassage.base_price;
    delete adaptedPassage.is_favorite;

    return adaptedPassage;
  }

  static adaptToServer(passage) {
    const adaptedPassage = Object.assign(
        {},
        passage,
        {
          "type": passage.waypointType,
          "date_from": passage.passageStartPoint,
          "date_to": passage.passageEndPoint,
          "base_price": +passage.price,
          "is_favorite": passage.isFavorite
        }
    );

    delete adaptedPassage.waypointType;
    delete adaptedPassage.waypoint;
    delete adaptedPassage.description;
    delete adaptedPassage.photos;
    delete adaptedPassage.passageStartPoint;
    delete adaptedPassage.passageEndPoint;
    delete adaptedPassage.price;
    delete adaptedPassage.isFavorite;

    return adaptedPassage;
  }
}
