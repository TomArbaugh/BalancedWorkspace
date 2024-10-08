import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import ticketReducer from "./ticket"
import customerReducer from "./customer";
import applyMacroReducer from "./macro";
import messageReducer from "./message";

const rootReducer = combineReducers({
  session: sessionReducer,
  ticket: ticketReducer,
  customer: customerReducer,
  applyMacro: applyMacroReducer,
  message: messageReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
