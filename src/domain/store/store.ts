import { applyMiddleware, compose, createStore } from 'redux';

const middleware = [];

const composeEnhancers =
  (typeof window !== 'undefined' &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore({}, composeEnhancers(applyMiddleware(...middleware)));

export default store;
