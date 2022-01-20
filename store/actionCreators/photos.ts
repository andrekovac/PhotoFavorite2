import {
  FAVORITE_TOGGLE,
  PHOTOS_FETCH_ERROR,
  PHOTOS_FETCH_START,
  PHOTOS_FETCH_SUCCESS,
} from '../actionTypes/photos';
import { ThunkResult } from './index';
import { PhotoT } from '../../domain/photos';

// ------
// Photos
// ------

export const fetchPhotosStart = () => {
  return {
    type: PHOTOS_FETCH_START,
  };
};

export type PhotosActionT =
  | {
      type: typeof PHOTOS_FETCH_SUCCESS;
      photos: ReadonlyArray<PhotoT>;
    }
  | {
      type: typeof PHOTOS_FETCH_START;
    }
  | {
      type: typeof PHOTOS_FETCH_ERROR;
      error: Error;
    };

export const fetchPhotosSuccess = (
  photos: ReadonlyArray<PhotoT>
): PhotosActionT => {
  return {
    type: PHOTOS_FETCH_SUCCESS,
    photos,
  };
};

export const fetchPhotosError = (error: unknown) => {
  return {
    type: PHOTOS_FETCH_ERROR,
    error,
  };
};

export const fetchPhotoList = async (
  url: string
): Promise<ReadonlyArray<PhotoT>> => {
  const response = await fetch(url);
  return response.json();
};

export const fetchPhotos = (page: number): ThunkResult => {
  return async (dispatch) => {
    dispatch(fetchPhotosStart());
    try {
      const photos = await fetchPhotoList(
        `https://picsum.photos/v2/list?page=${page}&limit=100`
      );
      dispatch(fetchPhotosSuccess(photos));
    } catch (error) {
      dispatch(fetchPhotosError(error));
    }
  };
};

// ---------
// Favorites
// ---------

export type FavoriteActionT = {
  type: typeof FAVORITE_TOGGLE;
  id: string;
};

export const toggleFavorite = (id: string): FavoriteActionT => {
  return {
    type: FAVORITE_TOGGLE,
    id,
  };
};
