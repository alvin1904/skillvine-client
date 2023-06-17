export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const takeFirstNCharacters = (str, n = 10) => {
  return str? str.slice(0, n): str;
};

export const shortenName = (str, n = 10) => {
  return str? str.slice(0, n)+"...": str;
};
