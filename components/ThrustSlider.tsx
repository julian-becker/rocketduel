import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ProjectileContext } from '../contexts/Projectile';
import { silver } from './styled/Colors';
import SliderKnob from './SliderKnob';

const ThrustSlider = () => {

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
      <View style={styles.sliderWrap}>
        <MultiSlider
          vertical
          enabledTwo={false}
          sliderLength={220}
          min={0}
          max={100}
          step={1}
          values={[thrust]}
          onValuesChange={setThrust}
          selectedStyle={{
            backgroundColor: silver.metallic,
          }}
          unselectedStyle={{
            backgroundColor: silver.darkGunmetal,
          }}
          trackStyle={{height: 8}}
          markerOffsetY={4}
          containerStyle={styles.sliderControl}
          customMarker={SliderKnob}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  thrust: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderWrap: {
    paddingBottom: 10
  },
  sliderControl: {
    flex: 1,
    alignSelf: 'center'
  }
});
export default ThrustSlider;