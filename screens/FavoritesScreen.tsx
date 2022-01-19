import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { RootTabScreenProps } from '../types';

type FavoritesScreenProps = RootTabScreenProps<'Favorites'>;

const FavoritesScreen: React.VFC<FavoritesScreenProps> = () => {
  return (
    <Wrapper>
      <Text>Favorites Screen</Text>
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
