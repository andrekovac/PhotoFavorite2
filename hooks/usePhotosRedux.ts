import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreT } from '../store/slices';
import {
  FetchPhotosSuccessAction,
  fetchPhotosThunk,
  PhotosT,
} from '../store/slices/photos';

const usePhotosRedux = (page: number) => {
  const dispatch = useDispatch<AppDispatch<FetchPhotosSuccessAction>>();

  useEffect(() => {
    dispatch(fetchPhotosThunk(page));
  }, [page, dispatch]);

  const photos = useSelector<StoreT, PhotosT>((state) => state.photos);

  return photos;
};

export default usePhotosRedux;
