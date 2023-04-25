export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const takeFirstNCharacters = (str, n) => {
  return str.slice(0, n);
};
