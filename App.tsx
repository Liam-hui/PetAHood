import React from 'react';
import { store, persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import '@/translate/i18n';

// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from '@/hooks/useCachedResources';
import useColorScheme from '@/hooks/useColorScheme';
import Navigation from '@/navigation';
import Loading from '@/components/Loading';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } 
  else return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation colorScheme={colorScheme} />
        <Loading/>
      </PersistGate>
      {/* <StatusBar /> */}
    </Provider>
  );
}
