import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreT } from '../../store/reducer';
import {
  CounterActionT,
  increment as incrementAction,
} from '../../store/actionCreators';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithRedux: React.VFC = () => {
  const dispatch = useDispatch<Dispatch<CounterActionT>>();

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
