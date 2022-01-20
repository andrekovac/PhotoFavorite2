import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PhotoT } from '../domain/photos';
import {
  toggleFavorite,
  FavoriteActionT,
} from '../store/actionCreators/photos';
import { StoreT } from '../store/reducer';

/**
 * Fetches favorites from internal photos state
 *
 * This hook encapsulates the state management library from the screens and components which use it.
 * Hence, the underlying state management mechanism may be swapped.
 *
 * It's declarative API provides the data and a setter.
 * There's no more burden on the side of the developer to call state-management library related functions.
 */
const useFavoritesRedux = () => {
  const dispatch = useDispatch<Dispatch<FavoriteActionT>>();

  const favorites = useSelector<StoreT, ReadonlyArray<PhotoT>>((state) =>
    state.photos.data.filter((photo) => photo.isFavorite)
  );

  const setToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  // const assertion `as const` is narrowing the array type to a tuple type
  return [favorites, setToggleFavorite] as const;
};

export default useFavoritesRedux;
