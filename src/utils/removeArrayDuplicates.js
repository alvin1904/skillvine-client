export const removeArrayDuplicates = (arr) => {
  let unique = [];
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
};

export const removeArrayDuplicates2 = (arr) => {
  return [...new Set(arr)];
};
