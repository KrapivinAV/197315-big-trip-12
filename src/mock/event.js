import {routeParameters} from "../constants.js";
import {getRandomInteger} from "../utils.js";

let waypointTypeCategory;
let waypointTypeIndex;

const generateWaypointType = () => {
  waypointTypeCategory = getRandomInteger(0, 1);
  waypointTypeIndex = waypointTypeCategory ?
    getRandomInteger(0, routeParameters.vehicles.length - 1) :
    getRandomInteger(0, routeParameters.arrivals.length - 1);

  return waypointTypeCategory ?
    `${routeParameters.vehicles[waypointTypeIndex].name} to` :
    `${routeParameters.arrivals[waypointTypeIndex].name} in`;
};

const generateWaypoint = () => {
  const index = getRandomInteger(0, routeParameters.places.length - 1);

  return routeParameters.places[index];
};

const generateOfferSet = (offerSet) => {
  const index = getRandomInteger(0, offerSet.length - 1);

  return new Array(index).fill(() => {

  });
};

const generateOffers = (category, index) => {
  return category ?
    generateOfferSet(routeParameters.vehicles[index].offerSet) :
    generateOfferSet(routeParameters.arrivals[index].offerSet);
};

const generateDate = () => {
  // Когда в руках молоток, любая проблема - гвоздь.
  // Вот и для генерации случайного булевого значения
  // можно использовать "функцию из интернета".
  // Ноль - ложь, один - истина. Для верности приводим
  // к булевому типу с помощью Boolean
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  // По заданию дедлайн у задачи устанавливается без учёта времеми,
  // но объект даты без времени завести нельзя,
  // поэтому будем считать срок у всех задач -
  // это 23:59:59 установленной даты
  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const waypointType = generateWaypointType();
  const waypoint = generateWaypoint();
  const offers = generateOffers(waypointTypeCategory, waypointTypeIndex);

  return {
    waypointType,
    waypoint,
    offers,
    color: getRandomColor(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
