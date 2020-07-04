import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImpactContext } from '../contexts/Impact';
import { GameContext } from '../contexts/Game';
import { PlayerContext } from '../contexts/Player';
import { BodyText, Header } from '../components/styled/Text';
import levels from '../lib/levels';
import Container from '../components/styled/Container';
import Button from '../components/styled/Button';
import { red, white } from '../components/styled/Colors'
import { initTargets } from '../hooks/useTarget';

const YouWin = () => {
  const { dispatchImpact } = useContext(ImpactContext);
  const { game, dispatchGame } = useContext(GameContext);

  const gameOver = () => {
    return game.level >= levels.length - 1;
  }

  const handleOnPress = () => {
    dispatchImpact({type: 'CLEAR_IMPACTS'});
    if (gameOver()) {
      dispatchGame({type: 'RESTART_GAME'});
    } else {
      dispatchGame({type: 'NEXT_LEVEL'});
    };
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