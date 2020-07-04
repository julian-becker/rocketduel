/*
// 
//  Represents the target's icon in the map view
//
*/

import React, { useEffect } from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { calculatePerceivedHeight } from '../../lib/helpers';
import RobotIcon from './RobotIcon';
import DestroyedIcon from './DestroyedIcon';

const Robot = (props) => {
  const { distance, health, isDestroyed, type, useScale} = props;
  useEffect(() => {
    const feedbackType = isDestroyed ? 'impactHeavy' : 'impactMedium';
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger(feedbackType, options);
  }, [health])

  const ROBOT_HEIGHT = 8; // meters
  const perceivedHeight = calculatePerceivedHeight(ROBOT_HEIGHT, distance);
  const height = useScale ? perceivedHeight : null
  if (isDestroyed) {
    return <DestroyedIcon type={type} height={height}/>
  } else {
    return (
      <RobotIcon type={type} height={useScale ? perceivedHeight : null}/>
    )
  }
}

export default Robot;