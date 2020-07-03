/*
//  Represents the target's icon in the map view
//
//
*/

import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { calculatePerceivedHeight } from '../../lib/helpers';
import RobotIcon from './RobotIcon';
import { INITIAL_HEALTH } from '../../lib/gameMechanics';
import { black, green, red } from '../styled/Colors';

const Robot = (props) => {
  const { coords, distance, health, isDestroyed, type, useScale} = props;
  const remainingHealth = INITIAL_HEALTH - health

  const ROBOT_HEIGHT = 8; // meters
  const perceivedHeight = calculatePerceivedHeight(ROBOT_HEIGHT, distance);
  return ( 
    <View>
      <Progress.Bar 
      progress={remainingHealth / 100}
      color={red}
      unfilledColor={green.lime}
      borderColor={black}
      borderRadius={0}
      width={40}/>
      <RobotIcon type={type} height={useScale ? perceivedHeight : null}/>
    </View>
  )
}

export default Robot;