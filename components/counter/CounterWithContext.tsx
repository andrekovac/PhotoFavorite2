import React, { useContext } from 'react';
import { Text } from 'react-native';
import { CounterContext, CounterContextT } from '../../context/counter';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterWithContext: React.VFC = () => {
  const { count, increment } = useContext<CounterContextT>(CounterContext);

  return (
    <Wrapper title="Context">
      <ClickedText>Clicked {count} times</ClickedText>
      <Button onPress={increment}>
        <Text>Increment</Text>
      </Button>
    </Wrapper>
  );
};

export default CounterWithContext;
