export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str[0].toUpperCase() + str.substring(1);
};

export const trunctcate = (str, limit) => {
  if (!str || typeof str !== "string") return "";
  if (str.length <= limit) return str;
  return str.slice(0, limit) + "...";
};
