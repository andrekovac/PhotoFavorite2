import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';

type ItemT = {
  id: string;
  author: string;
  download_url: string;
  title: string;
};

type ItemProps = Pick<ItemT, 'author' | 'download_url'>;

const Item: React.VFC<ItemProps> = ({ author, download_url }) => (
  <ItemImageWrapper>
    <ItemImage source={{ uri: download_url }} />
    <ItemText>by {author.toUpperCase()}</ItemText>
  </ItemImageWrapper>
);

const renderItem = ({
  item: { author, download_url },
}: ListRenderItemInfo<ItemT>) => <Item {...{ author, download_url }} />;

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

const ItemImageWrapper = styled.View`
  margin: 10px 0;
  border: 5px solid #1d1d28;
  background-color: #1d1d28;
`;

export default PhotoList;
