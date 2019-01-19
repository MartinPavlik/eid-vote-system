const OPTIMISTIC_ID_PREFIX = 'OPTIMISTIC_RESPONSE#_';

export const createOptimisticId = () => {
  return `${OPTIMISTIC_ID_PREFIX}${Math.random()}`;
};

export const isOptimistic = (item) => {
  if (typeof item._id !== 'string') {
    return false;
  }

  return item._id.indexOf(OPTIMISTIC_ID_PREFIX) === 0;
};
