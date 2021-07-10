import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { Platform, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>{/* <RootNavigator /> */}</NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
