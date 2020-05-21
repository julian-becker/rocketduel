import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './screens/Game';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} testID="welcomeText">Welcome to Rocket Duel</Text>
            </View>
            <View style={styles.actions}>
            <Button title={"New Game"} onPress={() => navigation.navigate('Game')} testID="newGameButton"/>
            </View>
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 75,
        paddingLeft: 25
    },
    header: {
        flex: 1
    },
    title: {
        fontSize: 25
    },
    actions: {
        flex: 1
    }
});

export default App;