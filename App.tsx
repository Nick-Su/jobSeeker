import * as React from 'react';
import { StatusBar, useColorScheme,  } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Navigation } from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>  
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaProvider>
  )
}

export default App;
