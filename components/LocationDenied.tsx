import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from './styled/Text';
import { blue } from './styled/Colors';

const LocationDenied = () => {
    
  return (
    <View style={styles.locationDenied}>
      <BodyText>Rocket Duel needs access to your GPS so you can play the game. Open the Settings on your phone to allow them. You may need to close and re-open M.E.K.A. Blitz to proceed.</BodyText>
      <TouchableOpacity onPress={() => { Linking.openSettings()}}><BodyText color={blue}>Open Settings</BodyText></TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  locationDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationDenied;