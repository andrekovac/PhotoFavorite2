import React from 'react';
import styled from 'styled-components/native';

import { RootTabScreenProps } from '../types';
import PhotoList from '../components/PhotoList';

type PhotosScreenProps = RootTabScreenProps<'Photos'>;

const PhotosScreen: React.VFC<PhotosScreenProps> = () => {
  return (
    <Wrapper>
      <PhotoList />
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
