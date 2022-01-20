import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreT } from '../store/slices';
import {
  fetchPhotos,
  FetchPhotosSuccessAction,
  PhotosT,
} from '../store/slices/photos';

const usePhotosRedux = (page: number) => {
  const dispatch = useDispatch<AppDispatch<FetchPhotosSuccessAction>>();

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [page, dispatch]);

  const photos = useSelector<StoreT, PhotosT>((state) => state.photos);

  return photos;
};

export default usePhotosRedux;
