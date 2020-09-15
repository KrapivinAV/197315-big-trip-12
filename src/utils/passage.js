export const sortByTime = (passageA, passageB) => {
  const passageADuration = passageA.passageEndPoint - passageA.passageStartPoint;
  const passageBDuration = passageB.passageEndPoint - passageB.passageStartPoint;
  return passageADuration - passageBDuration;
};

export const sortByPrice = (passageA, passageB) => {
  return passageA.price - passageB.price;
};
