import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import appReducer from './reducers'
import { verifyAuth } from "./actions/";

function Store() {
  const store = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware)
  );
  store.dispatch(verifyAuth());
  return store;
}

export default Store;