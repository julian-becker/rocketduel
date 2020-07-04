/*
//  Represents an impact in the map view
//
//
*/

import React, { useEffect, useContext, useState } from 'react';
import { Animated } from 'react-native';
import { ImpactContext } from '../contexts/Impact';

const Crater = (props) => {
  const [fadeValue, setFadeValue] = useState(new Animated.Value(1));
  const { dispatchImpact } = useContext(ImpactContext);
  const { craterIcon, id } = props;
  useEffect(() => {
    const duration = 5000
    Animated.timing(fadeValue, { 
        toValue: 0, 
        duration: duration
    }).start()
    setTimeout(() => {
      dispatchImpact({type: 'REMOVE_IMPACT', value: id});
    }, duration)
  }, [fadeValue])
  const CraterIcon = craterIcon;

  return (
    <Animated.View style={{opacity: fadeValue}}>
      <CraterIcon height={16} />
    </Animated.View>
  )
}

export default Crater;