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

export const formatPassageDuration = (duration) => {
  const pointDurDay = moment.duration(duration).days();
  const pointDurHour = moment.duration(duration).hours();
  const pointDurMin = moment.duration(duration).minutes();

  const days = pointDurDay > 0 ? `${pointDurDay}D` : ``;
  const hours = pointDurHour > 0 ? `${pointDurHour}H` : ``;
  const minutes = pointDurMin > 0 ? `${pointDurMin}M` : `00M`;

  return `${days} ${hours} ${minutes}`;
};
