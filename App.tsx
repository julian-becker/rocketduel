import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// asset preload
import * as SplashScreen from 'expo-splash-screen';
import Player from './lib/Player';
import soundLibrary from './lib/soundLibrary'

import HomeScreen from './screens/Home';
import Setup from './screens/Setup';
import GameWrapper from './screens/GameWrapper';
import YouWin from './screens/YouWin';


const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const loadAssets = async () => {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
      await Player.load(soundLibrary);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true);
      await SplashScreen.hideAsync();
    }
  }

  useEffect( () => {
    loadAssets();
  }, []);

  if (!isReady) {
    return <ActivityIndicator size="large" color="#22222" />; 
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setup" component={Setup} options={{ title: 'Get Started' }}/>
        <Stack.Screen name="Game" component={GameWrapper} />
        <Stack.Screen name="YouWin" component={YouWin} options={{ title: 'You Win!' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;