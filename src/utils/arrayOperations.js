export const formatArrayToObj = (arr) =>
  arr.map((str) => ({ _id: str, name: str }));
