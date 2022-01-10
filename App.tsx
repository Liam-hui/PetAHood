import React from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';
import '@/translate/i18n';

// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from '@/hooks/useCachedResources';
import useColorScheme from '@/hooks/useColorScheme';
import Navigation from '@/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } 
  else return (
    <Provider store={store}>
      <Navigation colorScheme={colorScheme} />
      {/* <StatusBar /> */}
    </Provider>
  );
}
