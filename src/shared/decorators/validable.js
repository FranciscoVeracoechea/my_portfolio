// middleware
import validationResult from '../../server/middlewares/validationResult';
// utils
import { isArray } from '../utils/functional';


const {
  getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols,
  defineProperty,
} = Object;


function validableMethod(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function fn(...args) {
      const result = original.apply(this, args);
      console.info(`Result: ${result}`);
      return isArray(result)
        ? [...result, validationResult()]
        : result;
    };
  }
  return descriptor;
}

const getOwnKeys = getOwnPropertySymbols
  ? function fn(object) {
    return getOwnPropertyNames(object)
      .concat(getOwnPropertySymbols(object));
  }
  : getOwnPropertyNames;

function getOwnPropertyDescriptors(obj) {
  const descs = {};

  getOwnKeys(obj).forEach(
    (key) => { descs[key] = getOwnPropertyDescriptor(obj, key); }
  );

  return descs;
}

function validableClass(klass) {
  const descs = getOwnPropertyDescriptors(klass.prototype);
  const keys = getOwnKeys(descs);

  keys.forEach((key) => {
    const desc = descs[key];
    if (typeof desc.value === 'function' || key !== 'constructor') {
      defineProperty(klass.prototype, key, validableMethod(klass.prototype, key, desc));
    }
  });
}

export default (...args) => (
  args.length === 1
    ? validableClass(...args)
    : validableMethod(...args)
);
