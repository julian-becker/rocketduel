import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BodyText, Header } from '../components/styled/Text';
import Container from '../components/styled/Container'
import Button from '../components/styled/Button';
import { red, white } from '../components/styled/Colors'

const YouWin = () => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate('Game');
  }
  return (
    <Container>
        <View style={styles.header}>
          <Header accessibilityID="youWinHeader">You Win!</Header>
          <BodyText accessibilityId="youWinBodyText">The target was destroyed.</BodyText>
        </View>
        <View style={styles.actions}>
          <Button text='New Game' textColor={white} backgroundColor={red} onClick={() => handleOnPress()}/>
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