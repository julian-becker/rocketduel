import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync, utils } from 'expo-three';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';
import { trigToDegrees } from '../lib/gameMechanics';
import ThrustSlider from '../components/ThrustSlider';
import FireButton from '../components/FireButton';
import { white } from './styled/Colors';

// left to right: Thrust, Launcher, Fire Button
const GameControls = () => {

  return (
    <View style={styles.wrap}>
      {/* thrust slider */}
      <View style={styles.thrustWrap}>
        <ThrustSlider />
      </View>
      {/* launcher (spacer) */}
      <View style={styles.launcherWrap} />
      {/* fire button */}
      <View style={styles.fireButtonWrap}>
        <FireButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thrustWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  launcherWrap: {
    flex: 2
  },
  fireButtonWrap: {
    flex: 2,
    flexDirection: 'column',
    alignSelf: 'center'
  }
});

export default GameControls;