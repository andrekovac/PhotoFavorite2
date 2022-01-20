import {
  createSelector,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import { AppDispatch, StoreT } from '.';
import { PhotoT } from '../../domain/photos';

export type PhotosDataT = ReadonlyArray<PhotoT>;
export type PhotosT = {
  data: PhotosDataT;
  error?: Error;
  isLoading: boolean;
};
export type FetchPhotosSuccessAction = PayloadAction<PhotosDataT>;
export type ToggleFavoritesAction = PayloadAction<string>;
export type PhotosThunkDispatch = ThunkDispatch<
  StoreT,
  undefined,
  FetchPhotosSuccessAction | PayloadAction<Error | undefined>
>;

const initialState: PhotosT = {
  data: [],
  error: undefined,
  isLoading: false,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    fetchPhotosSuccess: (state, { payload }: FetchPhotosSuccessAction) => {
      state.data = payload.map((photo) => ({
        ...photo,
        isFavorite: false,
      }));
      state.isLoading = false;
    },
    fetchPhotosStart: (state) => {
      state.isLoading = true;
    },
    fetchPhotosError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    toggleFavorite: (state, { payload }: ToggleFavoritesAction) => {
      state.data = state.data.map((photo) =>
        photo.id === payload
          ? { ...photo, isFavorite: !photo.isFavorite }
          : photo
      );
    },
  },
});

// Two actions generated from the slice
export const {
  fetchPhotosSuccess,
  toggleFavorite,
  fetchPhotosStart,
  fetchPhotosError,
} = photosSlice.actions;

const fetchData = async (page: number): Promise<PhotosDataT> => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=100`
  );
  return response.json();
};

/**
 * Redux Thunk: A Redux action which is not a plain JavaScript object,
 * but an asynchronous function which get dispatch as first argument
 * and optionally a getState function to retrieve the current state.
 */
export const fetchPhotos = (page: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchPhotosStart());
      const photos = await fetchData(page);
      dispatch(fetchPhotosSuccess(photos));
    } catch (error) {
      console.error('Error fetching photos', error);
      dispatch(fetchPhotosError(error));
    }
  };
};

// Photos selector
export const photosSelector = (state: StoreT): PhotosT => state.photos;

// Favorites selector which uses reselect (where selector composition is supported)
export const favoritesSelector = createSelector([photosSelector], (photos) => {
  return photos.data.filter((photo) => photo.isFavorite);
});

// The reducer
export default photosSlice.reducer;