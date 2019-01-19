import fIsEqual from 'lodash/fp/isEqual';

export const simpleCache = fn => {
  const cache = {
    initialized: false,
    lastArgs: undefined,
    lastResult: undefined,
  };

  return (...args) => {
    if (cache.initialized && fIsEqual(args, cache.lastArgs)) {
      return cache.lastResult;
    }

    const result = fn(...args);

    cache.initialized = true;
    cache.lastResult = result;
    cache.lastArgs = args;

    return args;
  };
};

export default simpleCache;
