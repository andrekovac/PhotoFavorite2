import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreT } from '../store/slices';
import {
  fetchPhotosStart,
  FetchPhotosStartAction,
  PhotosT,
} from '../store/slices/photos';

/**
 * In a redux-saga we initiate a fetch with the 'start' action.
 * The rest of the logic then happens inside of sagas.
 */
const usePhotosReduxSaga = (page: number) => {
  const dispatch = useDispatch<AppDispatch<FetchPhotosStartAction>>();

  useEffect(() => {
    dispatch(fetchPhotosStart({ page }));
  }, [page, dispatch]);

  const photos = useSelector<StoreT, PhotosT>((state) => state.photos);

  return photos;
};

export default usePhotosReduxSaga;
