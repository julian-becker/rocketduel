import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText, Header } from '../components/styled/Text';
import Container from '../components/styled/Container'
import NewGameButton from '../components/NewGameButton';

const YouWin = () => {
  return (
    <Container>
        <View style={styles.header}>
            <Header accessibilityID="youWinHeader">You Win!</Header>
            <BodyText accessibilityId="youWinBodyText">The target was destroyed.</BodyText>
        </View>
        <View style={styles.actions}>
        <NewGameButton />
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