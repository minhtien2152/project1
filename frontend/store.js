import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const middleware = [thunkMiddleware];

const initStore = () => {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export const wrapper = createWrapper(initStore);
