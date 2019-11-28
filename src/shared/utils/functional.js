// functional programming styleds functions

// FUNCTIONS COMPOSERS
// pipe
export const pipe = (...fns) => (...args) => fns.reduce(
  (res, fn) => [fn.call(null, ...res)], args
)[0];
// compose (inversed pipe)
export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// ------------------------------------------------------
// VALIDATIONS
export const isArray = variable => (variable && variable instanceof Array);

export const isDefined = value => (value !== false && typeof value !== 'undefined' && value !== null && value !== 0);

export const isFunction = variable => typeof variable === 'function';

export const isObject = variable => (isDefined(variable) && typeof variable === 'object');

export const isFloat = n => (n % 1 !== 0);

export const isFirstRender = items => (items && items.length === 0) || !isDefined(items);

export const executeIfFunction = (f, ...params) => ((f instanceof Function) ? f(...params) : f);

export const isString = str => (typeof str === 'string');
// ------------------------------------------------------
// switch case
export const switchCase = cases => defaultCase => key => executeIfFunction(
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase
);

// --------- TIMERS
// Timeout
export const timeout = (millisecons, func) => {
  const id = setTimeout(func, millisecons);
  return () => clearTimeout(id);
};
// Interval
export const interval = (millisecons, func) => {
  const id = setInterval(func, millisecons);
  return () => clearInterval(id);
};

// ---------- PARSERS
// value to number
export const numberParser = value => (Number.isNaN(Number(value)) ? value : Number(value));
// object keys to number
export const mapToNumber = object => Object.entries(object).reduce(
  (acc, current) => ({ ...acc, [current[0]]: numberParser(current[1]) }),
  {}
);

export const arrayToObject = (acc, current) => ({ ...acc, [current[0]]: numberParser(current[1]) });

export const objectFromEntries = array => array.reduce(arrayToObject, {});

// map form inputs with name and values to object
export const serialezeForm = formElement => [...formElement]
  .filter(element => (element.value && element.name))
  .map(input => [input.name, input.value])
  .reduce(arrayToObject, {});

// match media
export const match = media => window.matchMedia(media);

// string capitalizer
export const capitalizer = (string, separator = ' ') => string.split(separator).map(
  word => word.split('').map(
    (char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase())
  ).join('')
).join(' ');

//
/* eslint-disable */
export const slugify = (text) => text.toString().toLowerCase()
  .replace(/&/g, '-and-')         // Replace & with 'and'
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '');            // Trim - from start of text
  // .replace(/-+$/, '');            // Trim - from end of text
/* eslint-enable */

export const emailValidator = (email) => {
  /* eslint-disable */
  const validator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return validator.test(email);
  /* eslint-enable */
};

export const newError = error => (params = {}) => {
  const e = (error instanceof Error) ? error : new Error(error);
  Object.entries(params).forEach(([key, value]) => { e[key] = value; });
  return e;
};

export const futurize = Future => fn => (...args) => new Future(
  (rej, res) => fn(
    ...args,
    (err, result) => (err ? rej(err) : res(result))
  )
);

export const futurizeP = fn => (...args) => new Promise(
  (resolve, reject) => fn(
    ...args,
    (err, result) => (err ? reject(err) : resolve(result))
  )
);

export const getErrors = state => payload => ({
  ...state,
  loading: false,
  errors: payload.errors || payload.message || payload.error.message,
});

export const classList = (...strArray) => String(strArray.reduce((acc, current) => `${acc} ${current}`, ''));
