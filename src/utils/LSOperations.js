export const addToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
};

export const addSTokenToLink = (link) => {
  const token = getFromLS("accessTokenStudent");
  return token ? `${link}?token=${token}` : link;
};

export const addTTokenToLink = (link) => {
  const token = getFromLS("accessTokenTeacher");
  return token ? `${link}?token=${token}` : link;
};
