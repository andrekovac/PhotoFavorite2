import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { PhotoT } from '../../domain/photos';

import {
  fetchPhotosError,
  fetchPhotosStart,
  fetchPhotosSuccess,
  initialState,
  PhotosT,
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

    const photosState: PhotosT = yield select((state) => state.photos);
    if (photosState.data === initialState.data) {
      console.log({ photosState, initialState });
      // Only fetch data if it is empty/never fetched before/not rehydrated from persisted store
      const photos = yield call(fetchPhotos, page);
      yield put(fetchPhotosSuccess(photos));
    } else {
      yield put(fetchPhotosError('No data fetch triggered'));
    }
  } catch (error) {
    yield put(fetchPhotosError(error));
  }
}

// Watcher Saga: Listens to dispatched fetchPhotosStart actions
export function* fetchSaga() {
  yield takeLatest(fetchPhotosStart.type, fetchData);
}
