import React from 'react';
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import usePermissions from '../hooks/usePermissions';
import { useNavigation } from '@react-navigation/native';
import { BodyText, Header } from '../components/styled/Text';
import Container from '../components/styled/Container'
import LocationDenied from '../components/LocationDenied';
import Button from '../components/styled/Button';
import { blue,red, white } from '../components/styled/Colors'

const Setup = () => {
  const permission = usePermissions('LOCATION');
  const navigation = useNavigation();
  const handleNewGamePress = () => {
    navigation.navigate('Game');
  }

  const openPrivacyPolicy = async () => {
    await Linking.openURL('https://mekablitz.com/privacypolicy');
  }

  const permissionHeader = () => {
    return (
      <View style={{flex: 3}}>
        <View style={styles.header}>
          <Header accessibilityID="getStartedHeader">Let's Get Started</Header>
        </View>
        <View style={styles.body}>
          <BodyText accessibilityId="getStartedBodyText">Rocket Duel will need access to your device's location to play the game. Don't worry, we don't store this information anywhere and we won't use it to try and identify you or provide it to third parties. For more information, check out our privacy policy:</BodyText><TouchableOpacity onPress={() => openPrivacyPolicy()}><BodyText color={blue}>M.E.K.A. Blitz Privacy Policy</BodyText></TouchableOpacity>
        </View>
      </View>

    )
  }

  const grantedHeader = () => {
    return (
      <View style={styles.header}>
        <Header accessibilityID="grantedHeader">Great!</Header>
        <BodyText accessibilityId="grantedBodyText">Let's play Rocket Duel!</BodyText>
    </View>
    )
  }

  return (
    <Container>
        { permission.isGranted ? grantedHeader() : null}
        { permission.isUndetermined ? permissionHeader() : null }
        <View style={styles.actions}>
          { permission.isDenied ? <LocationDenied /> : null }
          { permission.isUndetermined ? <Button text={`Allow Location`} textColor={white} backgroundColor={blue} onClick={() => permission.ask()} /> : null }
          { permission.isChecking ? <ActivityIndicator size="large" color="#22222" /> : null}
          { permission.isGranted ? <Button text={`Let's Play!`} textColor={white} backgroundColor={red} onClick={() => handleNewGamePress()}/> : null}
        </View>
    </Container>
  );
}

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
  actions: {
      flex: 1
  }
});
export default Setup