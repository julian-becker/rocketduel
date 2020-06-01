import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';

import HomeScreen from './screens/Home';
import GameWrapper from './screens/GameWrapper';
import YouWin from './screens/YouWin';

import { DropDownHolder } from './components/DropDownHolder';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameWrapper} />
        <Stack.Screen name="YouWin" component={YouWin} />
      </Stack.Navigator>
      <DropdownAlert 
        ref={(ref) => DropDownHolder.setDropDown(ref)}
        closeInterval={4000}
        onClose={(data) => DropDownHolder.invokeOnClose(data)}
      />
    </NavigationContainer>
  );
};

export default App;