import { all, fork } from 'redux-saga/effects';

import { fetchSaga } from './fetch';

// Root Saga: Spwan all watcher sagas in a non-blocking fashion
function* rootSaga() {
  yield all([
    // Add new sagas by forking them here
    fork(fetchSaga),
  ]);
}
export default rootSaga;
