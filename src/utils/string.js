import { nonNaN } from './numbers';

/**
 * @param {string} date - date to be formatted
 * @returns {string} - formatted date
 * @description - add slashes to date strings
 *
 * @example
 * AddSlashesToDate("20231013") // 2023/10/13
 */

export function AddSlashesToDate(input) {
  if (input.length === 5 && input[4] !== '/') {
    return `${input.slice(0, 4)}/${input.slice(4)}`;
  }
  if (input.length === 7 && input[6] === '/') {
    return `${input.slice(0, 5)}0${input.slice(5)}`;
  }
  if (input.length === 8 && input[7] !== '/') {
    return `${input.slice(0, 7)}/${input.slice(7)}`;
  }
  if (input.length < 11) {
    return input;
  }
}

/**
 * @param {string} val - value to be formatted
 * @returns {string} - formatted value
 * @description - add commas to numbers
 * @example
 * toCurrency("1234567") // 1,234,567
 * toCurrency("1234567.89") // 1,234,567.89
 * toCurrency("1234567.") // 1,234,567.
 */

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
