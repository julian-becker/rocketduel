import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { BodyText } from './styled/Text';

const LocationDenied = () => {
    
  return (
    <View>
      <BodyText>Rocket Duel needs access to your GPS so you can play the game. Open the </BodyText>
      <TouchableOpacity onPress={() => { Linking.openSettings()}}><BodyText>Settings</BodyText></TouchableOpacity>
      <BodyText> on your phone to allow them.</BodyText>
    </View>

  )
}

export default LocationDenied;