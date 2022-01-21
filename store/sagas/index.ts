import { all, fork } from 'redux-saga/effects';

import { fetchSaga } from './fetch';
import { numbersSaga } from './numbersGame';

// Root Saga: Spwan all watcher sagas in a non-blocking fashion
function* rootSaga() {
  yield all([
    // Add new sagas by forking them here
    fork(fetchSaga),
    fork(numbersSaga),
  ]);
}
export default rootSaga;
