import { combineReducers } from 'redux';

import { CounterActionT } from './actionCreators';
import { INCREMENT } from './actionTypes';

const defaultState = 0;

const counterReducer = (state = defaultState, action: CounterActionT) => {
  switch (action.type) {
    case INCREMENT:
      state = state + 1;
      break;
  }
  return state;
};

export const rootReducer = combineReducers({
  count: counterReducer,
  // add other reducers here
});

export type StoreT = NonNullable<Parameters<typeof rootReducer>[0]>;
