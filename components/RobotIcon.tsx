/*
//  Represents the target's icon in the map view
//
//
*/

import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { TargetContext } from '../contexts/Target';
import { INITIAL_HEALTH } from '../lib/gameMechanics';
import { black, green, red } from './styled/Colors';

const silverbot = require('../assets/silverbot.png');

const RobotIcon = () => {

  const { target } = useContext(TargetContext);
  const { coords, distance, health, isDestroyed } = target;
  const remainingHealth = INITIAL_HEALTH - health
  return ( 
    <View>
      <Progress.Bar 
      progress={remainingHealth / 100}
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