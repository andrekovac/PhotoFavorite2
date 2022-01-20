import React from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

import { PhotoT } from '../domain/photos';
import PhotoItem from './PhotoItem';

const renderItem = ({ item }: ListRenderItemInfo<PhotoT>) => (
  <PhotoItem {...item} />
);

type PhotoListProps = {
  data: readonly PhotoT[];
  isLoading?: boolean;
};

const PhotoList: React.VFC<PhotoListProps> = ({ data, isLoading }) => {
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PhotoList;
