const arrivals = [`Check`, `Sightseeing`, `Restaurant`];
const vehicles = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const QUANTITY_OF_OFFERS_BY_TYPE = 10;

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
  places: [`Amsterdam`, `Chamonix`, `Geneva`, `Berlin`, `Paris`],
  descriptionPool: generateDescriptionPool(descriptionText),
  msInOneDay: 86400000,
  maxDaysGap: 7,
  maxPhotoQuantity: 10,
  maxPrice: 1000
};
