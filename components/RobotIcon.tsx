/*
//  Represents the player's icon in the map view
//
//
*/

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { BodyText, Header } from './styled/Text';
import { INITIAL_HEALTH } from '../lib/gameMechanics';
import { black, green, red } from './styled/Colors';

const silverbot = require('../assets/silverbot.png');

const RobotIcon = (props) => {

  return ( 
    <View>
      <Progress.Bar 
      progress={INITIAL_HEALTH - props.health}
      color={red}
      unfilledColor={green.lime}
      borderColor={black}
      borderRadius={0}
      width={40}/>
      <Image style={styles.silverbot} source={silverbot} />
    </View>
    
  )
}

const styles = StyleSheet.create({
  silverbot: {
    backgroundColor: 'transparent',
    height: 50,
    width: 25
  }
});

export default RobotIcon;