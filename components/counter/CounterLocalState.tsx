import React, { useState } from 'react';
import { Text } from 'react-native';

import { Button, ClickedText } from './styles';
import Wrapper from './Wrapper';

const CounterLocalState: React.VFC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev: number) => prev + 1);

  return (
    <Wrapper title="Local State">
      <ClickedText>Clicked {count} times</ClickedText>
      <Button onPress={increment}>
        <Text>Increment</Text>
      </Button>
    </Wrapper>
  );
};

export default CounterLocalState;
