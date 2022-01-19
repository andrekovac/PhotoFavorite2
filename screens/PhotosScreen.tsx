import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { RootTabScreenProps } from '../types';

type PhotosScreenProps = RootTabScreenProps<'Photos'>;

const PhotosScreen: React.VFC<PhotosScreenProps> = () => {
  return (
    <Wrapper>
      <Text>Photos Screen</Text>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;

  /* children */
  justify-content: center;
  align-items: center;
`;

export default PhotosScreen;
