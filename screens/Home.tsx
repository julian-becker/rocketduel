import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/styled/Container'
import Button from '../components/styled/Button';
import LocationDenied from '../components/LocationDenied';
import usePermissions from '../hooks/usePermissions';
import { red, white } from '../components/styled/Colors'

const HomeScreen = () => {
  const permission = usePermissions('LOCATION');
  const navigation = useNavigation();

  const handleOnPress = () => {
    permission.isGranted ? navigation.navigate('Game') : navigation.navigate('Setup');
  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title} testID="welcomeText">Welcome to Rocket Duel</Text>
      </View>
      <View style={styles.body}>
        { permission.isDenied ? <LocationDenied /> : null }
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