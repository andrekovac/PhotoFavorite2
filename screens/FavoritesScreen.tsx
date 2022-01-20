import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import PhotoList from '../components/PhotoList';
import { usePhotosContext } from '../context/photos';
import { RootTabScreenProps } from '../types';

type FavoritesScreenProps = RootTabScreenProps<'Favorites'>;

const FavoritesScreen: React.VFC<FavoritesScreenProps> = () => {
  const { photos: data, isLoading } = usePhotosContext();

  const favorites = data.filter((photo) => photo.isFavorite);

  return (
    <Wrapper>
      {favorites.length > 0 ? (
        <PhotoList isLoading={isLoading} data={favorites} />
      ) : (
        <Text>No favorites yet</Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;

  /* children */
  justify-content: center;
  align-items: center;
`;

export default FavoritesScreen;
