import React from 'react';
import styled from 'styled-components/native';

import CounterLocalState from '../components/counter/CounterLocalState';
import CounterWithContext from '../components/counter/CounterWithContext';
import CounterWithRedux from '../components/counter/CounterWithRedux';
import { RootTabScreenProps } from '../types';

type CounterScreenProps = RootTabScreenProps<'Counter'>;

const CounterScreen: React.VFC<CounterScreenProps> = () => {
  return (
    <Container>
      <CounterLocalState />
      <CounterWithContext />
      <CounterWithRedux />
    </Container>
  );
};

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  flex: 1;
`;

export default CounterScreen;
