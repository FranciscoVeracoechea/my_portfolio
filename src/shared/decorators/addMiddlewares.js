export default (...middlewares) => function decorator(target, name, descriptor) {
  const original = descriptor?.value;
  if (typeof original === 'function') {
    descriptor.value = function fn(...args) {
      const result = original.apply(this, args);
      return [...result, ...middlewares.map(m => m())];
    };
  }
  return descriptor;
};
