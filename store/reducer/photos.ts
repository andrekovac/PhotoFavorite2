import { PhotoT } from '../../domain/photos';
import { PhotosActionT, FavoriteActionT } from '../actionCreators/photos';
import {
  PHOTOS_FETCH_START,
  PHOTOS_FETCH_ERROR,
  PHOTOS_FETCH_SUCCESS,
  FAVORITE_TOGGLE,
} from '../actionTypes/photos';

export type PhotosT = {
  data: ReadonlyArray<PhotoT>;
  error?: Error;
  isLoading?: boolean;
};

const defaultState: PhotosT = {
  data: [],
  error: undefined,
  isLoading: undefined,
};

const photosReducer = (
  state = defaultState,
  action: PhotosActionT | FavoriteActionT
) => {
  // Shallow copy of current state to create a new reference to this slice of the state
  const newState = {
    ...state,
  };

  switch (action.type) {
    case PHOTOS_FETCH_START:
      newState.isLoading = true;
      newState.error = undefined;
      break;
    case PHOTOS_FETCH_SUCCESS:
      newState.data = action.photos.map((photo) => ({
        ...photo,
        isFavorite: false,
      }));
      newState.error = undefined;
      newState.isLoading = false;
      break;
    case PHOTOS_FETCH_ERROR:
      newState.error = action.error;
      newState.isLoading = false;
      newState.data = [];
      break;
    case FAVORITE_TOGGLE:
      newState.data = state.data.map((photo) =>
        photo.id === action.id
          ? { ...photo, isFavorite: !photo.isFavorite }
          : photo
      );
      break;
  }
  return newState;
};

export default photosReducer;
