// Universal redirecting of user
import { Router } from 'routes';


export const redirect = (target, nextContext = {}) => {
  if (nextContext.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    nextContext.res.writeHead(303, { Location: target });
    nextContext.res.end();
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.replace(target);
  }
};

export default redirect;
