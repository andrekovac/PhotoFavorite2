import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

type ItemT = {
  id: string;
  author: string;
  download_url: string;
  url: string;
};

type ItemProps = Pick<ItemT, 'author' | 'download_url' | 'url'>;

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
}: ListRenderItemInfo<ItemT>) => <Item {...{ author, download_url, url }} />;

const PhotoList: React.VFC = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<ItemT[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://picsum.photos/v2/list?page=9&limit=100'
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
