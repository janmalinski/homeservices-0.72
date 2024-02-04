import React, { useCallback, useEffect, useState } from 'react';
import { ColorSchemeName, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootNavigator } from './navigation/RootNavigator';
import { store } from './store';
import './locale/i18nConfig';
import { get, save } from './utils/StorageMMKV';
import { ThemeContext } from '@src/context/ThemeContext';

const App = () => {
  const [theme, setTheme] = useState<ColorSchemeName | null>(null);
  const defaultTheme = useColorScheme();

  const setAppTheme = useCallback(async() => {
    const IS_FIRST = await get('IS_FIRST');
    if(IS_FIRST === null){
      save('Theme', defaultTheme);
      save('IsDefault', true);
      save('IS_FIRST', true);
      // setTheme(defaultTheme)
    }
  }, []);

  useEffect(() => {
    setTheme(defaultTheme)
  }, [defaultTheme]);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.flexContainer}>
          <SafeAreaProvider>
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
            <RootNavigator /> 
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </ThemeContext.Provider>
  );
};

const styles = {
  flexContainer: {
    flex: 1 
  }
}; 

export default App;
