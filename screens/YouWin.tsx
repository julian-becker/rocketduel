import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerContext } from '../contexts/Player';

import { BodyText, Header } from '../components/styled/Text';
import levels from '../lib/levels';
import Container from '../components/styled/Container';
import Button from '../components/styled/Button';
import { red, white } from '../components/styled/Colors'

const YouWin = ({ route, navigation }) => {

  const { dispatchPlayer } = useContext(PlayerContext);
  const { level } = route.params;

  const gameOver = () => {
    return level >= levels.length - 1;
  }

  const handleOnPress = () => {
    gameOver() ? dispatchPlayer({type: 'START_OVER'}) : null;
    navigation.navigate('Game');
  }

  return (
    <Container>
        <View style={styles.header}>
          <Header accessibilityID="youWinHeader">{gameOver() ? `You Win!` : `Level Complete`}</Header>
          <BodyText accessibilityId="youWinBodyText">{gameOver() ? `All Targets Destroyed.` : `On to the next wave.`}</BodyText>
        </View>
        <View style={styles.actions}>
          <Button text={gameOver() ? `New Game` : `Next Level`} textColor={white} backgroundColor={red} onClick={() => handleOnPress()}/>
        </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
      flex: 3,
      alignItems: 'center'
  },
  actions: {
      flex: 1
  }
});
export default YouWin