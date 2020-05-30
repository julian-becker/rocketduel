import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import Container from '../components/styled/Container'
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
        <Container>
            <View style={styles.header}>
                <Text style={styles.title} testID="welcomeText">Welcome to Rocket Duel</Text>
            </View>
            <View style={styles.actions}>
            { permission.isDenied ? appSettingsPrompt() : <NewGameButton /> }
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 3,
        alignItems: 'center'
    },
    title: {
        fontSize: 25
    },
    actions: {
        flex: 1
    }
});

export default HomeScreen;