import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, StoreT } from './reducer';
import { ActionT } from './actionCreators';

const store = createStore(
  rootReducer,

  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<StoreT, ActionT>)
  )
);

export default store;
