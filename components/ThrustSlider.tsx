import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import Slider from '@react-native-community/slider';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';

const ThrustSlider = () => {

  const { player } = useContext(PlayerContext);
  const { azimuth, elevation } = player;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { thrust } = projectile;

  const setThrust = async (thrust) => {
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger('selection', options);
    dispatchProjectile({type: 'UPDATE_THRUST', value: thrust});
  }

  return (
    <View style={styles.thrust}>
      <BodyText>{`Azimuth: ${azimuth} Elevation: ${elevation}`}</BodyText>
      <Slider
        style={styles.thrustSlider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={thrust}
        onValueChange={setThrust}
      />
      <BodyText>Thrust: {thrust}</BodyText>
    </View>
  )
}

const styles = StyleSheet.create({
  thrust: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  thrustSlider: {
    width: '100%',
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: '#333333',
    transform: [ { rotate: "-90deg" } ],
  }
});
export default ThrustSlider;