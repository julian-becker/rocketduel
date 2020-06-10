import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import Setup from './screens/Setup';
import GameWrapper from './screens/GameWrapper';
import YouWin from './screens/YouWin';


const Stack = createStackNavigator();

const App = () => {

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