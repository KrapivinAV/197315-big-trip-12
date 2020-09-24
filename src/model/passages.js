import Observer from "../utils/observer.js";

export default class Passages extends Observer {
  constructor() {
    super();
    this._passages = [];
  }

  setPassages(passages) {
    this._passages = passages.slice();
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
}
