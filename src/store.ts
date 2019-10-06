import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { connectRouter } from "connected-react-router";
import { history } from "./utils/history";
import * as account from "./store/account";

const reducer = combineReducers({
  router: connectRouter(history),
  account: account.reducer,
});

export default createStore(reducer, devToolsEnhancer({}));
export type State = ReturnType<typeof reducer>;
