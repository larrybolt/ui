import { ImmerReducer, createActionCreators, createReducerFunction } from "immer-reducer";
import { Epic } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { mergeMap, map } from "rxjs/operators";
import Account from "../models/account";
// import { getAll } from "../api";

export interface State {
  readonly accounts: Account[];
  readonly requesting: boolean;
}

const initialState: State = {
  accounts: [{ id: "1", name: "first account", balance: 0, currency: "EUR" }],
  requesting: false,
};

class AccountReducer extends ImmerReducer<State> {
  request() {
    this.draftState.requesting = true;
  }

  loaded(accounts: Account[]) {
    this.draftState.accounts = accounts;
  }

  add(account: Account) {
    this.draftState.accounts.push(account);
  }

  delete(id: string) {
    this.draftState.accounts = this.draftState.accounts.filter(account => account.id !== id);
  }
}

export const actions = createActionCreators(AccountReducer);
export const reducer = createReducerFunction(AccountReducer, initialState);

export const requestAccountsEpic: Epic<typeof actions.request> = action$ =>
  action$
    .ofType(actions.request.type)
    .pipe(
      mergeMap(() => ajax.getJSON(`http://localhost:3000/accounts`).pipe(map(response => actions.loaded(response)))),
    );
