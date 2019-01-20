import moment from 'moment';

export const parseIsoDateToString = (date) => {
  const m = moment(date);
  // const toParse = new Date(date);
  // const parsed = `${toParse.getDay()}.${toParse.getMonth()}.${toParse.getFullYear()}`;
  return m.format('YYYY.MM.DD');
};
