import React from 'react';
import { Text } from 'react-native';
import useCounterRedux from '../../hooks/useCounterRedux';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithRedux: React.VFC = () => {
  const { count, increment, decrement, reset } = useCounterRedux();

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
