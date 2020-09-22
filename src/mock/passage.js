import {routeParameters} from "../route-parameters.js";
import {getRandomInteger} from "../utils/common.js";

const {arrivals, vehicles, places, descriptionPool, msInOneDay, maxDaysGap, maxPrice, maxPhotoQuantity} = routeParameters;

let waypointTypeCategory;
let waypointTypeIndex;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  const quantity = getRandomInteger(0, descriptionPool.length);

  return new Set(new Array(quantity).fill().map(() => descriptionPool[getRandomInteger(0, descriptionPool.length - 1)]));
};

const generatePhotos = () => {
  const quantity = getRandomInteger(0, maxPhotoQuantity);

  const photoSet = new Array(quantity);

  for (let i = 0; i < quantity; i++) {
    const photo = {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Описание Фото №${i}`
    };
    photoSet.push(photo);
  }

  return photoSet;
};

const generateDestinationSet = () => {
  const destinationSet = [];

  places.forEach((place) => {
    const destinationItem = {};

    destinationItem.name = place;
    destinationItem.description = Array.from(generateDescription()).join(`. `);
    destinationItem.pictures = generatePhotos();

    destinationSet.push(destinationItem);
  });

  return destinationSet;
};

const destinationSet = generateDestinationSet();

export const destinationTypes = destinationSet.slice();

export const generatePassage = () => {
  const waypointType = generateWaypointType();
  const waypoint = generateWaypoint();
  const offers = Array.from(generateOffers(waypointTypeCategory, waypointTypeIndex));
  const currentTime = Date.now();
  const passageStartPoint = generatePassageStartPoint(currentTime);
  const passageEndPoint = generatePassageEndPoint(currentTime, passageStartPoint.getTime());
  const description = destinationSet.filter((item) => item.name === waypoint)[0].description;
  const photos = destinationSet.filter((item) => item.name === waypoint)[0].pictures;
  const price = getRandomInteger(1, maxPrice);

  return {
    id: generateId(),
    waypointType,
    waypoint,
    offers,
    passageStartPoint,
    passageEndPoint,
    description,
    photos,
    price,
    isFavorite: false
  };
};
