/*
//  Represents the target's icon in the map view
//
//
*/

import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { calculatePerceivedHeight } from '../../lib/helpers';
import RobotIcon from './RobotIcon';
import DestroyedIcon from './DestroyedIcon';
import { INITIAL_HEALTH } from '../../lib/gameMechanics';
import { black, green, red } from '../styled/Colors';

const Robot = (props) => {
  const { coords, distance, health, isDestroyed, type, useScale} = props;
  useEffect(() => {
    const feedbackType = isDestroyed ? 'impactHeavy' : 'impactMedium';
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger(feedbackType, options);
  }, [health])
  const remainingHealth = INITIAL_HEALTH - health

  const ROBOT_HEIGHT = 8; // meters
  const perceivedHeight = calculatePerceivedHeight(ROBOT_HEIGHT, distance);
  const height = useScale ? perceivedHeight : null
  if (isDestroyed) {
    return <DestroyedIcon type={type} height={height}/>
  } else {
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
}

export default Robot;