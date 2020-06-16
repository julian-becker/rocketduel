import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Azimuth from '../components/Azimuth';
import Elevation from '../components/Elevation';
import ManualThrust from '../components/ManualThrust';
import FireButton from '../components/FireButton';

// Top to bottom: Manual inputs, fire button
const EmulatorGameControls = () => {

  return (
    <KeyboardAvoidingView style={styles.wrap}>
      <View style={styles.manualControls}>
        <Azimuth />
        <Elevation />
        <ManualThrust />
      </View>
      <View style={styles.fireButtonWrap}>
        <FireButton />
      </View>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  manualControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
  },
  fireButtonWrap: {
    flex: 1,
    justifyContent: 'flex-start'
  }
});

export default EmulatorGameControls;