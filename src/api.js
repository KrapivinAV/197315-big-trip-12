import PassagesModel from "./model/passages.js";
import OffersModel from "./model/offers.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPassages() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((passages) => passages.map(PassagesModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON)
      .then((offers) => offers.map(OffersModel.adaptToClient));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  updatePassage(passage) {
    return this._load({
      url: `points/${passage.id}`,
      method: Method.PUT,
      body: JSON.stringify(PassagesModel.adaptToServer(passage)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(PassagesModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  addPassage(passage) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(PassagesModel.adaptToServer(passage)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(PassagesModel.adaptToClient);
  }

  deletePassage(passage) {
    return this._load({
      url: `points/${passage.id}`,
      method: Method.DELETE
    });
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
