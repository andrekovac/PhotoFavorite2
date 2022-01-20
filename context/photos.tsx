import React, { useContext, useEffect, useState } from 'react';

import { PhotoT } from '../domain/photos';
import useDataApi from '../hooks/useDataApi';

type PhotosContextT = {
  fetchedData: ReadonlyArray<PhotoT>;
  isLoading: boolean;
  isError: boolean;
  fetchPhotos: (_url: string) => void;
  photos: PhotoT[];
  toggleFavorite: (_id: string) => void;
};

/**
 * Context with default values
 */
export const PhotosContext = React.createContext<PhotosContextT>({
  fetchedData: [],
  isLoading: false,
  isError: false,
  fetchPhotos: (_url) => null,
  photos: [],
  toggleFavorite: (_id) => null,
});

/**
 * Photos context provider higher-order-component
 */
export const PhotosContextProvider: React.FC = ({ children }) => {
  const defaultPage = 9;

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    [],
    `https://picsum.photos/v2/list?page=${defaultPage}&limit=100`
  );
  const [photos, setPhotos] = useState<Array<PhotoT>>([]);

  useEffect(() => {
    setPhotos(data.map((photo) => ({ ...photo, isFavorite: false })));
  }, [data]);

  const contextValue = {
    fetchedData: data,
    isLoading: isLoading,
    isError: isError,
    fetchPhotos: doFetch,
    photos: photos,
    toggleFavorite: (id: string) => {
      setPhotos((prevPhotos) => {
        if (prevPhotos.length > 0) {
          return prevPhotos.map((photo) =>
            photo.id === id
              ? { ...photo, isFavorite: !photo.isFavorite }
              : photo
          );
        }
        return [];
      });
    },
  };

  return (
    <PhotosContext.Provider value={contextValue}>
      {children}
    </PhotosContext.Provider>
  );
};

/**
 * Photos context consumer hook
 */
export const usePhotosContext = () => {
  const photosState = useContext(PhotosContext);
  return photosState;
};
