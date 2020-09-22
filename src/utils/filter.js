import {FilterType} from "../basis-constants";

export const filter = {
  [FilterType.EVERYTHING]: (passages) => passages,
  [FilterType.FUTURE]: (passages) => passages.filter((passage) => passage.passageStartPoint.valueOf() > Date.now()),
  [FilterType.PAST]: (passages) => passages.filter((passage) => passage.passageStartPoint.valueOf() <= Date.now())
};
