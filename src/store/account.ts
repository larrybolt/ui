import { ImmerReducer, createActionCreators, createReducerFunction } from "immer-reducer";
import Account from "../models/account";

export interface State {
  readonly accounts: Account[];
}

const initialState: State = {
  accounts: [{ id: "1", name: "first account", balance: 0, currency: "EUR" }],
};

class AccountReducer extends ImmerReducer<State> {
  add(account: Account) {
    this.draftState.accounts.push(account);
  }

  delete(id: string) {
    this.draftState.accounts = this.draftState.accounts.filter(account => account.id !== id);
  }
}

export const actions = createActionCreators(AccountReducer);
export const reducer = createReducerFunction(AccountReducer, initialState);

// import { ActionType, createStandardAction, getType } from "typesafe-actions";
// export const actions = {
//   add: createStandardAction("ACCOUNT/add")<Account>(),
//   delete: createStandardAction("ACCOUNT/delete")<string>(),
// };
// export type AccountActions = ActionType<typeof actions>;
// export function reducer(state = initialState, action: AccountActions): AccountState {
//   switch (action.type) {
//     case getType(actions.add):
//       state.accounts.push(action.payload);
//       break;
//     case getType(actions.delete):
//       state.accounts.filter(account => account.id !== action.payload);
//       break;
//     default:
//   }
//   return state;
// }
