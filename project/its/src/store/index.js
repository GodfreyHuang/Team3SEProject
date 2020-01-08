import { createStore, applyMiddleware, compose } from "redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";

import reducers from "../reducers";

/**
 * Inject middle-ware to enhance redux store.
 */
function enhancer() {
  const middlewares = [ReduxThunk, ReduxPromise];
  return compose(applyMiddleware(...middlewares));
}

/**
 * Define the global store to handle all application data
 *
 * In redux app, there should be only one store in whole application.
 */
const generateStore = () => {
  const store = createStore(reducers, enhancer());
  return store;
};

const store = generateStore();
export default store;
