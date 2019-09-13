import { StateType, createStandardAction, ActionType, getType } from "typesafe-actions";
import { combineReducers } from "redux";
import { createSelector } from "reselect";

export const add = createStandardAction("couter/ADD")<{ amount: number }>();
export const reset = createStandardAction("couter/RESET")<{ reason: string }>();

const actions = { add, reset };

export type CounterState = {
  readonly counter: number;
  readonly counterHistory: number[];
  readonly reasons: string[];
};

export const getAmount = (state: CounterState): number => state.counter;
export const getCounterHistory = (state: CounterState): number[] => state.counterHistory;
export const getAmountAndHistory = createSelector(
  getAmount,
  getCounterHistory,
  (amount, history) => {
    return { amount, history };
  },
);

export const rootReducer = combineReducers<CounterState, CounterActions>({
  counter: (state = 0, action) => {
    switch (action.type) {
      case getType(actions.add):
        return state + action.payload.amount;

      default:
        return state;
    }
  },
  counterHistory: (state = [], action) => {
    switch (action.type) {
      case getType(actions.add):
        // TODO: this shouldn't work :/
        state.push(3);
        // end
        return [...state, action.payload.amount];

      default:
        return state;
    }
  },
  reasons: (state = [], action) => {
    switch (action.type) {
      case getType(actions.reset):
        return [...state, action.payload.reason];
      case getType(actions.add):
        return [...state, `increase to ${action.payload.amount}`];

      default:
        return state;
    }
  },
});

export type CounterActions = ActionType<typeof actions>;
export type RootState = StateType<ReturnType<typeof rootReducer>>;
