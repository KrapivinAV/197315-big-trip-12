import moment from "moment";

export const sortByDate = (passageA, passageB) => {
  return passageA.passageStartPoint - passageB.passageStartPoint;
};

export const sortByTime = (passageA, passageB) => {
  const passageADuration = passageA.passageEndPoint - passageA.passageStartPoint;
  const passageBDuration = passageB.passageEndPoint - passageB.passageStartPoint;
  return passageBDuration - passageADuration;
};

export const sortByPrice = (passageA, passageB) => {
  return passageB.price - passageA.price;
};

export const formatDate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(format);
};
