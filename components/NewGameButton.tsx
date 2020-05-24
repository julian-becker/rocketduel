import React from 'react';
import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const NewGameButton = () => {
    const navigation = useNavigation();

    return (
        <Button
            title={"New Game"}
            onPress={() => navigation.navigate('Game')}
            testID="newGameButton"
        />
    )
}

export default NewGameButton;