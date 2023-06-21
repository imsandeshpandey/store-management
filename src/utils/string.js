import { nonNaN } from './numbers';

/**
 * @param {string} date - date to be formatted
 * @returns {string} - formatted date
 * @description - add slashes to date strings
 *
 * @example
 * AddSlashesToDate("01012021") // 01/01/2021
 */
export const AddSlashesToDate = (date) => {
  const len = date.length;
  if (len === 3 && date[1] === '/') return `0${date}`;
  if (len === 3 && date[2] !== '/') return `${date.slice(0, 2)}/${date.slice(2)}`;
  if (len === 6 && date[4] === '/') return `${date.slice(0, 3)}0${date.slice(3, 6)}`;
  if (len === 6 && date[5] !== '/') return `${date.slice(0, 5)}/${date.slice(5)}`;
  return date;
};
export const toCurrency = (val) => {
  if (val?.length > 2 && val?.[val?.length - 1] === '.') {
    return val;
  } else {
    return nonNaN(val).toLocaleString('hi-IN', {
      maximumFractionDigits: 2,
    });
  }
};
export const currencyToNumber = (s) => {
  const val = String(s);
  if (val?.length > 2 && val?.[val?.length - 1] === '.') {
    return val;
  } else {
    return Number(String(s).replace(/,/g, ''));
  }
};
