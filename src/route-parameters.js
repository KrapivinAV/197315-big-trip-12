import {basisConstants} from "./basis-constants.js";

const {arrivals, vehicles, descriptionText} = basisConstants;
const QUANTITY_OF_OFFERS_BY_TYPE = 5;

const Set = function (name, index) {
  this.title = `${name}Offer №${index}`;
  this.cost = index * 10;
};

const RouteTypeSet = function (name) {
  this.name = name;
  this.offerSet = new Array(QUANTITY_OF_OFFERS_BY_TYPE).fill(name).map((item, index) => new Set(item, index));
};

const routeTypesSet = function (typeGroup) {
  return new Array(typeGroup.length).fill().map((name, index) => typeGroup[index]).map((name) => new RouteTypeSet(name));
};

const generateDescriptionPool = function (text) {
  if (text.endsWith(`.`)) {
    text = text.slice(0, text.length - 2); // нет смысла заводить константу...
  }
  if (text.endsWith(`. `)) {
    text = text.slice(0, text.length - 3); // нет смысла заводить константу...
  }
  return text.split(`. `);
};

export const routeParameters = {
  arrivals: routeTypesSet(arrivals),
  vehicles: routeTypesSet(vehicles),
  places: [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`],
  descriptionPool: generateDescriptionPool(descriptionText),
  msInOneDay: 86400000,
  maxDaysGap: 7,
  maxPhotoQuantity: 5,
  maxPrice: 1000
};
