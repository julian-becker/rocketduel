import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/styled/Container'
import Button from '../components/styled/Button';
import LocationDenied from '../components/LocationDenied';
import usePermissions from '../hooks/usePermissions';
import { Header, BodyText } from '../components/styled/Text';
import { red, white } from '../components/styled/Colors';

const HomeScreen = () => {
  const permission = usePermissions('LOCATION');
  const navigation = useNavigation();

  const handleOnPress = () => {
    permission.isGranted ? navigation.navigate('Game') : navigation.navigate('Setup');
  }

  const welcomeText = () => {
    return (
      <BodyText>Robots are invading Earth! We don’t know anything about motive or even what to call them, so we’ve started to just call them by what we know about them; Mechanical, Electric, Kinetic Autons. Your job is to defend your base! MEKAs will drop from the sky and start their attack. Use your mortar to launch rockets and destroy them. Don’t let them get close enough to destroy you!</BodyText>
    )
  }

  return (
    <Container>
      <View style={styles.header}>
        <Header testID="welcomeText">Welcome to Rocket Duel</Header>
      </View>
      <View style={styles.body}>
        { permission.isDenied ? <LocationDenied /> : welcomeText() }
      </View>
      <View style={styles.actions}>
        { permission.isDenied ? null : <Button text='New Game' textColor={white} backgroundColor={red} onClick={() => handleOnPress()}/> }
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center'
  },
  body: {
    flex: 2,
    justifyContent: 'center',
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