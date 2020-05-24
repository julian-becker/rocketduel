import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

import NewGameButton from '../components/NewGameButton';
import usePermissions from '../hooks/usePermissions';

const appSettingsPrompt = () => {
    return (
        <Text>Rocket Duel needs access to your GPS so you can play the game. Open the <Button title="Settings" onPress={() => { Linking.openSettings();}}>Settings</Button> on your phone to allow them.</Text>
    )
}

const HomeScreen = () => {
    const permission = usePermissions('LOCATION');
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} testID="welcomeText">Welcome to Rocket Duel</Text>
            </View>
            <View style={styles.actions}>
            { permission.isDenied ? appSettingsPrompt() : <NewGameButton /> }
            </View>
        </View>
    );
};

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

export default HomeScreen;