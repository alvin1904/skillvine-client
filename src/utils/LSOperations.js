export const addToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => {
  const value =
    typeof window !== "undefined"
      ? window.localStorage.getItem(key)
      : false;
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
