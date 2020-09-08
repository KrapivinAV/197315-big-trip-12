import {routeParameters} from "../route-parameters.js";
import {getRandomInteger} from "../utils/common.js";


const {arrivals, vehicles, places, descriptionPool, msInOneDay, maxDaysGap, maxPrice, maxPhotoQuantity} = routeParameters;

let waypointTypeCategory;
let waypointTypeIndex;

const generateWaypointType = () => {
  waypointTypeCategory = getRandomInteger(0, 1);
  waypointTypeIndex = waypointTypeCategory ?
    getRandomInteger(0, vehicles.length - 1) :
    getRandomInteger(0, arrivals.length - 1);

  return waypointTypeCategory ?
    vehicles[waypointTypeIndex].name :
    arrivals[waypointTypeIndex].name;
};

const generateWaypoint = () => {
  const index = getRandomInteger(0, places.length - 1);

  return places[index];
};

const generateOfferSet = (offerSet) => {
  const index = getRandomInteger(0, offerSet.length);

  return new Set(new Array(index).fill().map(() => offerSet[getRandomInteger(0, offerSet.length - 1)]));
};

const generateOffers = (category, index) => {
  return category ?
    generateOfferSet(vehicles[index].offerSet) :
    generateOfferSet(arrivals[index].offerSet);
};

const generatePassageStartPoint = (time) => {
  return new Date(getRandomInteger(time - maxDaysGap * msInOneDay, time + maxDaysGap * msInOneDay));
};

const generatePassageEndPoint = (time, start) => {
  return new Date(getRandomInteger(start + 1, time + maxDaysGap * msInOneDay));
};

const generateDescription = () => {
  const quantity = getRandomInteger(1, descriptionPool.length);

  return new Set(new Array(quantity).fill().map(() => descriptionPool[getRandomInteger(0, descriptionPool.length - 1)]));
};

const generatePhotos = () => {
  const quantity = getRandomInteger(1, maxPhotoQuantity);

  return new Set(new Array(quantity).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`));
};

export const generatePassage = () => {
  const waypointType = generateWaypointType();
  const waypoint = generateWaypoint();
  const offers = Array.from(generateOffers(waypointTypeCategory, waypointTypeIndex));
  const currentTime = Date.now();
  const passageStartPoint = generatePassageStartPoint(currentTime);
  const passageEndPoint = generatePassageEndPoint(currentTime, passageStartPoint.getTime());
  const description = Array.from(generateDescription()).join(`. `);
  const photos = Array.from(generatePhotos());
  const price = getRandomInteger(1, maxPrice);

  return {
    waypointType,
    waypoint,
    offers,
    passageStartPoint,
    passageEndPoint,
    description,
    photos,
    price
  };
};
