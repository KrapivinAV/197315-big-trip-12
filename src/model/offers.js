import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offer) {
    const adaptedOffer = Object.assign(
        {},
        offer,
        {
          name: offer.type,
          offerSet: offer.offers
        }
    );

    delete adaptedOffer.type;
    delete adaptedOffer.offers;

    return adaptedOffer;
  }
}


