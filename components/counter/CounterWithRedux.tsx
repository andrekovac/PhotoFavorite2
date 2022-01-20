import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, StoreT } from '../../store/slices';
import {
  increment as incrementAction,
  decrement as decrementAction,
  reset as resetAction,
} from '../../store/slices/counter';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithRedux: React.VFC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const increment = () => dispatch(incrementAction());
  const decrement = () => dispatch(decrementAction());
  const reset = () => dispatch(resetAction());

  const count = useSelector<StoreT, number>((state) => state.count);

  return (
    <Wrapper title="Redux">
      <ClickedText>Clicked {count} times</ClickedText>
      <Button onPress={increment}>
        <Text>Increment</Text>
      </Button>
      <Button onPress={decrement}>
        <Text>Decrement</Text>
      </Button>
      <Button onPress={reset}>
        <Text>Reset</Text>
      </Button>
    </Wrapper>
  );
};

export default CounterWithRedux;
