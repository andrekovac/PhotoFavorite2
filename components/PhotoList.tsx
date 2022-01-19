import React from 'react';
import styled from 'styled-components/native';
import { FlatList, ListRenderItemInfo } from 'react-native';

type ItemT = {
  id: string;
  title: string;
};

type ItemProps = Pick<ItemT, 'title'>;

const Item: React.VFC<ItemProps> = ({ title }) => (
  <ItemWrapper>
    <ItemText>{title}</ItemText>
  </ItemWrapper>
);

const placeholderList = Array(100)
  .fill(0)
  .map((_, i) => ({ id: String(i + 1), title: `Title ${i + 1}` }));

const renderItem = ({ item }: ListRenderItemInfo<ItemT>) => (
  <Item title={item.title} />
);

const PhotoList: React.VFC = () => {
  return (
    <FlatList
      data={placeholderList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const ItemWrapper = styled.View`
  height: 300px;
  width: 300px;
  background-color: #3f87f5;
  margin: 5px 0;

  /* children */
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.Text`
  color: white;
  font-size: 22px;
`;

export default PhotoList;
