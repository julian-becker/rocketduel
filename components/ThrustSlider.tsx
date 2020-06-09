import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import VerticalSlider from 'rn-vertical-slider';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';
import { silver } from '../components/styled/Colors';

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

  const setThrust = (thrust) => {
    dispatchProjectile({type: 'UPDATE_THRUST', value: thrust});
  }

  return (
    <View style={styles.thrust}>
      <BodyText>{`Azimuth: ${azimuth}°`}</BodyText>
      <BodyText>{`Elevation: ${elevation}°`}</BodyText>
      <View style={styles.sliderWrap}>
        <VerticalSlider
          width={16}
          height={200}
          showBackgroundShadow={true}
          min={0}
          max={100}
          step={1}
          value={thrust}
          borderRadius={1}
          minimumTrackTintColor={silver.metallic}
          maximumTrackTintColor={silver.darkGunmetal}
          onChange={(value: number) => {
            handleThrustChange()
          }}
          onComplete={(value: number) => {
            setThrust(value);
          }}
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