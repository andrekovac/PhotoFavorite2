import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CounterContext } from './context/counter';
import { PhotosContextProvider } from './context/photos';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [count, setCount] = useState(0);

  const counter = {
    count: count,
    increment: () => {
      setCount((prevCount) => prevCount + 1);
    },
    decrement: () => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
    },
    reset: () => {
      setCount(0);
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PhotosContextProvider>
          <CounterContext.Provider value={counter}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </CounterContext.Provider>
        </PhotosContextProvider>
      </SafeAreaProvider>
    );
  }
}
