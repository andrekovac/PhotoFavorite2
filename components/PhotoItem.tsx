import React from 'react';
import styled from 'styled-components/native';
import { Alert, Pressable } from 'react-native';

import { PhotoT } from '../domain/photos';
import Icon from './Icon';
import useFavoritesRedux from '../hooks/useFavoritesRedux';

type ItemProps = PhotoT;

const PhotoItem: React.VFC<ItemProps> = ({
  id,
  author,
  download_url,
  url,
  isFavorite,
}) => {
  const [, toggleFavorite] = useFavoritesRedux();

  return (
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
          <FavoriteButton onPress={() => toggleFavorite(id)}>
            <Icon name={`heart${isFavorite ? '' : '-o'}`} />
          </FavoriteButton>
        </ItemImageWrapper>
      )}
    </Pressable>
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

const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 10px;
`;

export default PhotoItem;
