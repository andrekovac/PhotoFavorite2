import { createSlice } from '@reduxjs/toolkit';

import { StoreT } from './index';
import { reset as globalReset } from './actions';

const initialState = 0;

const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => (state > 0 ? state - 1 : state),
    reset: () => 0,
  },
  extraReducers: {
    [globalReset.type]: () => {
      return initialState;
    },
  },
});

// Two actions generated from the slice
export const { increment, decrement, reset } = counterSlice.actions;

// A selector
export const counterSelector = (state: StoreT) => state.count;

// The reducer
export default counterSlice.reducer;
