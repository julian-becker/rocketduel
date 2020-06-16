import React, { useEffect, useContext } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { PanoramaView } from '@lightbase/react-native-panorama-view';
import TopHalf from '../components/TopHalf';
import BottomHalf from '../components/BottomHalf';
import MapPanel from '../components/MapPanel';
import Azimuth from '../components/Azimuth';
import Elevation from '../components/Elevation';
import ManualThrust from '../components/ManualThrust';
import ThrustSlider from '../components/ThrustSlider';
import Container from '../components/styled/Container';
import { BodyText } from '../components/styled/Text';
import FireButton from '../components/FireButton';

import useCompass from '../hooks/useCompass';
import useGyroscope from '../hooks/useGyroscope';
import { useNavigation } from '@react-navigation/native';

import { PlayerContext } from '../contexts/Player';
import { TargetProvider } from '../contexts/Target';
import { ProjectileProvider } from '../contexts/Projectile';
import { ImpactProvider } from '../contexts/Impact';


const GameScreen = () => {
  const navigation = useNavigation();
  // start getting compass data
  const { player, dispatchPlayer } = useContext(PlayerContext);
  useCompass(dispatchPlayer);
  useGyroscope(dispatchPlayer);

  const { location, elevation, azimuth } = player;
  const { coords, altitude } = location;

  return (
    <TargetProvider coords={coords}>
      <ProjectileProvider>
        <ImpactProvider>
          <PanoramaView
            style={styles.panorama}
            dimensions={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width }}
            inputType="mono"
            enableTouchTracking={false}
            imageUrl="https://thumbs.dreamstime.com/b/full-degree-seamless-panorama-equirectangular-spherical-equidistant-projection-panorama-view-meadow-beautiful-day-full-138921130.jpg">
              <TopHalf />
              <BottomHalf />
          </PanoramaView>
        </ImpactProvider>
      </ProjectileProvider>
    </TargetProvider>
  );
}


const styles = StyleSheet.create({
  panorama: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default GameScreen;
