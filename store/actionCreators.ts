import { Action } from 'redux';

import { INCREMENT } from './actionTypes';

export type CounterActionT = {
  type: typeof INCREMENT;
};

export const increment = (): Action<typeof INCREMENT> => {
  return {
    type: INCREMENT,
  };
};
