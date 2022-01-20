import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { AppDispatch } from '../store/actionCreators';
import { fetchPhotos } from '../store/actionCreators/photos';
import { StoreT } from '../store/reducer';
import { PhotosT } from '../store/reducer/photos';

const usePhotosRedux = (page: number) => {
  const dispatch = useDispatch<AppDispatch<Action<PhotosT>>>();

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [page, dispatch]);

  const photos = useSelector<StoreT, PhotosT>((state) => state.photos);

  return photos;
};

export default usePhotosRedux;
