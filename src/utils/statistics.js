import moment from "moment";

export const generateMoneyByTypes = (passages, arrivals, vehicles) => {
  const types = arrivals.concat(vehicles);

  const selectedTypes = [];
  const summaryPrices = [];

  types.forEach((item) => {
    const currentTypePassages = passages.filter((passage) => passage.waypointType.toLowerCase() === item.toLowerCase());

    if (currentTypePassages.length !== 0) {
      selectedTypes.push(item);
      summaryPrices.push(currentTypePassages.map((passage) => passage.price).reduce((accumulator, currentValue) => accumulator + currentValue));
    }
  });

  return {
    labels: selectedTypes,
    values: summaryPrices
  };
};

export const generateQuantityByTypes = (passages, vehicles) => {
  const selectedTypes = [];
  const quantity = [];

  vehicles.forEach((item) => {
    const currentTypePassages = passages.filter((passage) => passage.waypointType.toLowerCase() === item.toLowerCase());

    if (currentTypePassages.length !== 0) {
      selectedTypes.push(item);
      quantity.push(currentTypePassages.length);
    }
  });

  return {
    labels: selectedTypes,
    values: quantity
  };
};

export const generateSpendTimeByTypes = (passages, arrivals, vehicles) => {
  const types = arrivals.concat(vehicles);

  const selectedTypes = [];
  const summaryTimes = [];

  types.forEach((item) => {
    const currentTypePassages = passages.filter((passage) => passage.waypointType.toLowerCase() === item.toLowerCase());

    if (currentTypePassages.length !== 0) {
      selectedTypes.push(item);
      summaryTimes.push(formatSpendTime(new Date(currentTypePassages.map((passage) => passage.passageEndPoint - passage.passageStartPoint).reduce((accumulator, currentValue) => accumulator + currentValue))));
    }
  });

  return {
    labels: selectedTypes,
    values: summaryTimes
  };
};

export const formatSpendTime = (duration) => {
  return moment.duration(duration).days();
};
