import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PhotoT } from '../../domain/photos';

import {
  fetchPhotosError,
  fetchPhotosStart,
  fetchPhotosSuccess,
} from '../slices/photos';

export const fetchPhotos = async (): Promise<ReadonlyArray<PhotoT>> => {
  const response = await fetch(
    'https://picsum.photos/v2/list?page=9&limit=100'
  );
  return response.json();
};

// Worker Saga: Will be fired when fetchPhotosStart action is dispatched
function* fetchData(): SagaIterator<void> {
  try {
    const photos = yield call(fetchPhotos);
    yield put(fetchPhotosSuccess(photos));
  } catch (error) {
    yield put(fetchPhotosError(error));
  }
}

// Watcher Saga: Listens to dispatched fetchPhotosStart actions
export function* fetchSaga() {
  yield takeLatest(fetchPhotosStart.type, fetchData);
}
