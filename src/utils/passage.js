export const sortTimeUp = (passageA, passageB) => {
  return passageA.dueDate.getTime() - passageB.dueDate.getTime();
};

export const sortPriceDown = (passageA, passageB) => {
  return passageA.price - passageB.price;
};
