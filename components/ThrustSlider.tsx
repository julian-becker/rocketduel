import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';

const ThrustSlider = () => {

  const { player } = useContext(PlayerContext);
  const { azimuth, elevation } = player;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { thrust } = projectile;

  const handleThrustChange = async () => {
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger('selection', options);
  }

  // slider supports 2 values passed as an array
  const setThrust = async (values) => {
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger('selection', options);
    dispatchProjectile({type: 'UPDATE_THRUST', value: values[0]});
  }

  return (
    <View style={styles.thrust}>
      <View>
        <BodyText>{`Azimuth: ${azimuth}°`}</BodyText>
        <BodyText>{`Elevation: ${elevation}°`}</BodyText>
      </View>
      <View style={styles.sliderWrap}>
        <MultiSlider
          vertical
          enabledTwo={false}
          sliderLength={200}
          min={0}
          max={100}
          step={1}
          values={[thrust]}
          onValuesChange={setThrust}
        />
      </View>
      <BodyText>Thrust: {thrust}</BodyText>
    </View>
  )
}

const styles = StyleSheet.create({
  thrust: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sliderWrap: {
    margin: 5
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