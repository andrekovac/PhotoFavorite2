import {
  Action,
  AnyAction,
  combineReducers,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import CounterReducer from './counter';
import PhotosReducer from './photos';

const rootReducer = combineReducers({
  count: CounterReducer,
  photos: PhotosReducer,
});

export type StoreT = ReturnType<typeof rootReducer>;

// `AppDispatch` includes pure actions as well as thunks
export type AppDispatch<A extends Action = AnyAction> = ThunkDispatch<
  StoreT,
  unknown,
  A
>;

export default rootReducer;
