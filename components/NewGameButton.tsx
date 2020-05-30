import React from 'react';
import { ButtonText } from './styled/Text';
import Button from './styled/Button';
import { red, white } from './styled/Colors';

import { useNavigation } from '@react-navigation/native';

const NewGameButton = () => {
    const navigation = useNavigation();

    return (
        <Button
            backgroundColor={red}
            onPress={() => navigation.navigate('Game')}
            accessibilityID="newGameButton"
        ><ButtonText bold align='center' color={white}>New Game</ButtonText></Button>
    )
}

export default NewGameButton;