import { pathOr } from 'ramda';
import cookies from 'lib/cookie';

export const TOKEN_COOKIES_KEY = 'eid-peititon';

let token = null;

export const getToken = (nextContext = {}) => {
  // On server take cookies from request, in browser from document...
  if (!nextContext.req) {
    token = cookies.getItem(TOKEN_COOKIES_KEY);
  } else {
    token = pathOr(null, ['req', 'cookies', TOKEN_COOKIES_KEY], nextContext);
  }

  return token;
};

export const setToken = (newToken) => {
  token = newToken;
  cookies.setItem(
    TOKEN_COOKIES_KEY,
    newToken,
    Infinity,
  );
};

export const removeToken = () => {
  token = null;
  cookies.removeItem(
    TOKEN_COOKIES_KEY,
  );
};

