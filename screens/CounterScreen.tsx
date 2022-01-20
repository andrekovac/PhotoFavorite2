import React from 'react';
import styled from 'styled-components/native';

import CounterLocalState from '../components/counter/CounterLocalState';
import CounterWithContext from '../components/counter/CounterWithContext';
import { RootTabScreenProps } from '../types';

type CounterScreenProps = RootTabScreenProps<'Counter'>;

const CounterScreen: React.VFC<CounterScreenProps> = () => {
  return (
    <Container>
      <CounterLocalState />
      <CounterWithContext />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default CounterScreen;
