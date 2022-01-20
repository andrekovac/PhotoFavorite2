import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreT } from '../../store/reducer';
import {
  CounterActionT,
  increment as incrementAction,
  decrement as decrementAction,
  reset as resetAction,
} from '../../store/actionCreators/counter';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithRedux: React.VFC = () => {
  const dispatch = useDispatch<Dispatch<CounterActionT>>();

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
