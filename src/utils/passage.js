export const sortByTime = (passageA, passageB) => {
  const passageADuration = passageA.passageEndPoint - passageA.passageStartPoint;
  const passageBDuration = passageB.passageEndPoint - passageB.passageStartPoint;
  return passageBDuration - passageADuration;
};

export const sortByPrice = (passageA, passageB) => {
  return passageB.price - passageA.price;
};
