import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension";
import { connectRouter } from "connected-react-router";
import { history } from "./utils/history";
import * as account from "./store/account";

const reducer = combineReducers({
  router: connectRouter(history),
  account: account.reducer,
});

// const composeEnhancers = composeWithDevTools({});
// const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
// export default store;
export default createStore(reducer, devToolsEnhancer({}));
export type State = ReturnType<typeof reducer>;
