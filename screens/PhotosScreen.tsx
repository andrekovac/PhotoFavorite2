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
  padding: 0 10px;
`;

export default PhotosScreen;
