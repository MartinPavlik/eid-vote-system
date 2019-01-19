export const parseIsoDateToString = (date) => {
  const toParse = new Date(date);
  const parsed = `${toParse.getDay()}.${toParse.getMonth()}.${toParse.getFullYear()}`;
  return parsed;
};
