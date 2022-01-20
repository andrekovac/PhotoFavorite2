import React from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

import usePhotos from '../hooks/usePhotos';
import { PhotoT } from '../domain/photos';

type ItemProps = Pick<PhotoT, 'author' | 'download_url' | 'url'>;

const Item: React.VFC<ItemProps> = ({ author, download_url, url }) => (
  <Pressable
    onPress={() => {
      Alert.alert('Artist', author, [{ text: 'OK' }], { cancelable: false });
    }}
    onLongPress={() => {
      Alert.alert('Url', url, [{ text: 'OK' }], { cancelable: false });
    }}
  >
    {({ pressed }) => (
      <ItemImageWrapper pressed={pressed}>
        <ItemImage source={{ uri: download_url }} />
        <ItemText>by {author.toUpperCase()}</ItemText>
      </ItemImageWrapper>
    )}
  </Pressable>
);

const renderItem = ({
  item: { author, download_url, url },
}: ListRenderItemInfo<PhotoT>) => <Item {...{ author, download_url, url }} />;

type PhotoListProps = {
  page: number;
};

const PhotoList: React.VFC<PhotoListProps> = ({ page }) => {
  const { data, isLoading } = usePhotos(page);

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

const ItemImage = styled.Image`
  width: 100%;
  aspect-ratio: 1.5;
`;

const ItemText = styled.Text`
  color: white;
  padding-top: 5px;
`;

type ItemImageWrapperProps = { pressed: boolean };
const ItemImageWrapper = styled.View<ItemImageWrapperProps>`
  margin: 10px 0;
  ${({ pressed }) =>
    `
      opacity: ${pressed ? 0.7 : 1};
      background-color: ${pressed ? '#3c3c52' : '#1d1d28'};
      border: 5px solid ${pressed ? '#3c3c52' : '#1d1d28'};
    `}
`;

export default PhotoList;
