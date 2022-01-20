import { createSlice } from '@reduxjs/toolkit';

import { StoreT } from './index';

const initialState = 0;

const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => state + 1,
  },
});

// Two actions generated from the slice
export const { increment } = counterSlice.actions;

// A selector
export const counterSelector = (state: StoreT) => state.count;

// The reducer
export default counterSlice.reducer;
