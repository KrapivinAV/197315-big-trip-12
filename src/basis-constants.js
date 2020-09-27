export const basisConstants = {
  arrivals: [`Check-in`, `Sightseeing`, `Restaurant`],
  vehicles: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
};

export const EvtKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export const SortType = {
  DEFAULT: `default`,
  PRICE_SORT: `price-sort`,
  TIME_SORT: `time-sort`
};

export const typeTranslations = {
  null: `Bus to`,
  taxi: `Taxi`,
  bus: `Bus`,
  train: `Train`,
  ship: `Ship`,
  transport: `Transport`,
  flight: `Flight`,
  drive: `Drive`,
  checkIn: `Check-in`,
  sightseeing: `Sightseeing`,
  restaurant: `Restaurant`
};

export const UserAction = {
  UPDATE_PASSAGE: `UPDATE_PASSAGE`,
  ADD_PASSAGE: `ADD_PASSAGE`,
  DELETE_PASSAGE: `DELETE_PASSAGE`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const FormType = {
  CREATE_PASSAGE: `CREATE_PASSAGE`,
  EDIT_PASSAGE: `EDIT_PASSAGE`
};

export const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};

export const typeIcons = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛`,
  'restaurant': `🍴`
};

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`,
  AFTER: `after`
};

export const BLANK_PASSAGE = {
  isFavorite: false,
  offers: [],
  passageEndPoint: new Date(),
  passageStartPoint: new Date(),
  price: ``,
  waypoint: ``,
  waypointType: ``
};

export const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export const BLANK_DAY = 0;
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const SORTER_MODE = 1;
export const FILTER_DISABLE_VALUE = 0;
export const FIRST_ITEM = 0;
export const MIN_PRICE = 0;
export const MAX_QUANTITY_OF_OFFERS_IN_PREVIEW = 3;
export const BAR_HEIGHT = 55;
export const AUTHORIZATION = `Basic h47d7dh42ka06kv`;
export const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
