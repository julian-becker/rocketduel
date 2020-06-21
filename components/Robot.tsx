/*
//  Represents the target's icon in the map view
//
//
*/

import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { TargetContext } from '../contexts/Target';
import { calculatePerceivedHeight } from '../lib/helpers';
import RobotIcon from './RobotIcon';
import { INITIAL_HEALTH } from '../lib/gameMechanics';
import { black, green, red } from './styled/Colors';

const Robot = (props) => {

  const { target } = useContext(TargetContext);
  const { coords, distance, health, isDestroyed } = target;
  const remainingHealth = INITIAL_HEALTH - health

  const ROBOT_HEIGHT = 8; // meters
  const perceivedHeight = calculatePerceivedHeight(ROBOT_HEIGHT, distance);
  console.log(props.useScale);
  return ( 
    <View>
      <Progress.Bar 
      progress={remainingHealth / 100}
      color={red}
      unfilledColor={green.lime}
      borderColor={black}
      borderRadius={0}
      width={40}/>
      <RobotIcon height={props.useScale ? perceivedHeight : null}/>
    </View>
  )
}

export default Robot;