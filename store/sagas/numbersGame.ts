import { SagaIterator } from 'redux-saga';
import { call, delay, put, race, select, take } from 'redux-saga/effects';

import { StoreT } from '../slices';
import { increment, decrement, reset } from '../slices/counter';

// ------------
// Numbers game
// ------------

function* countTill20(): SagaIterator<void> {
  let localCount: number = yield select((state: StoreT) => state.count);

  while (localCount < 20) {
    yield put(increment());
    localCount = localCount + 1;
    yield delay(1000);
  }
}

// Watcher and Worker Saga in one
export function* numbersSaga() {
  // instead of while(true), takeEvery or takeLatest can be used
  while (true) {
    yield take(reset.type);

    // A race between the `countTill20` generator function and a decrement type
    const { cancel, task } = yield race({
      task: call(countTill20),
      cancel: take(decrement.type),
    });

    if (cancel) {
      yield call(console.log, 'Automatic count cancelled!');
    }
    if (task) {
      yield call(console.log, 'Automatic count finished');
    }
  }
}
