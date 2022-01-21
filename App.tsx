import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CounterContext } from './context/counter';
import { PhotosContextProvider } from './context/photos';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store, { persistor } from './store';

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PhotosContextProvider>
              <CounterContext.Provider value={counter}>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </CounterContext.Provider>
            </PhotosContextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
