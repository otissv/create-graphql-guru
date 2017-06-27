export const capitalize = str => {
  const firstCharUpperCase = str.charAt(0).toUpperCase();
  return `${firstCharUpperCase}${str.substr(1, str.length - 1).toLowerCase()}`;
};
