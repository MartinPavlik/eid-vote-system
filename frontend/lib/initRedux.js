import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable */

let reduxStore = null;
const runningSagas = {};
// TODO - refactor
const asyncReducers = {};
let currentReducers = null;

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const logMiddleware = ({ getState }) => next => action => {
  const prevState = getState();
  const nextState = next(action);
  console.info('action::', action, prevState, nextState)
  return nextState;
}

function create(asyncReds, initialState = {}) {
  currentReducers = {
    ...reducers,
    ...asyncReds,
  };
  return createStore(
    combineReducers(currentReducers),
    initialState, // Hydrate the store with server-side data
    compose(
      applyMiddleware(thunk, sagaMiddleware, logMiddleware), // Add additional middleware here
      devtools,
    ),
  );
}

// TODO - super ugly
export function runSaga (key, saga) {
  // returns task descriptor, https://redux-saga.js.org/docs/api/
  return sagaMiddleware.run(saga);
}

// TODO - super ugly
export function injectAsyncReducer(key, asyncReducer) {
  console.info('Injecting reducer: ', key, asyncReducer, asyncReducers);
  if (asyncReducers[key]) {
    console.info('Reducer is already injected: ', key) // eslint-disable-line
    return;
  }
  asyncReducers[key] = asyncReducer;
  currentReducers = {
    ...currentReducers,
    [key]: asyncReducer,
  };
  if(!reduxStore) { return console.error('No store') }
  reduxStore.replaceReducer(combineReducers(currentReducers));
}

export function removeAsyncReducer(key) {
  console.info('Removing reducer: ', key)
  // TODO
  delete currentReducers[key];
  delete asyncReducers[key];
  reduxStore.replaceReducer(combineReducers(currentReducers));
}


export default function initRedux(initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(asyncReducers, initialState);
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(asyncReducers, initialState);
  }

  return reduxStore;
}
