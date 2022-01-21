import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PhotoT } from '../../domain/photos';

import {
  fetchPhotosError,
  fetchPhotosStart,
  fetchPhotosSuccess,
} from '../slices/photos';

export const fetchPhotos = async (
  page: number
): Promise<ReadonlyArray<PhotoT>> => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=100`
  );
  return response.json();
};

// Worker Saga: Will be fired when fetchPhotosStart action is dispatched
function* fetchData({
  payload,
}: ReturnType<typeof fetchPhotosStart>): SagaIterator<void> {
  try {
    const page = payload?.page ?? 9;
    const photos = yield call(fetchPhotos, page);
    yield put(fetchPhotosSuccess(photos));
  } catch (error) {
    yield put(fetchPhotosError(error));
  }
}

// Watcher Saga: Listens to dispatched fetchPhotosStart actions
export function* fetchSaga() {
  yield takeLatest(fetchPhotosStart.type, fetchData);
}
