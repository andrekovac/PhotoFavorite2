import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, StoreT } from '../../store/slices';
import { increment as incrementAction } from '../../store/slices/counter';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithRedux: React.VFC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const increment = () => dispatch(incrementAction());

  const count = useSelector<StoreT, number>((state) => state.count);

  return (
    <Wrapper title="Redux">
      <ClickedText>Clicked {count} times</ClickedText>
      <Button onPress={increment}>
        <Text>Increment</Text>
      </Button>
    </Wrapper>
  );
};

export default CounterWithRedux;
