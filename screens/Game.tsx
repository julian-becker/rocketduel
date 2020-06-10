import React, { useEffect, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
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
          <Container>
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1, flexDirection: 'column'}}>
              {/* map view */}
              <MapPanel />
              {/* controls view */}
              <View style={{flex: 1, flexDirection: 'column'}}>
              { isEmulatorSync() ?
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 5}}>
                  <View style={styles.stats}>
                    <Azimuth />
                    <Elevation />
                    <ManualThrust />
                  </View>
                </View>
                : null }
                <View style={{flex: 1, flexDirection: 'row' }}>
                  {/* launcher side */}
                  <View style={styles.launcherSide}>
                    <View style={styles.launcher}>
                      <BodyText>Launcher goes here</BodyText>
                    </View>
                    <FireButton />
                  </View>
                  {/* controls view */}
                  { isEmulatorSync() ?
                    null
                  : 
                    <ThrustSlider />
                  }
                </View>
              </View>
            </KeyboardAvoidingView>
          </Container>
        </ImpactProvider>
      </ProjectileProvider>
    </TargetProvider>
  );
}


const styles = StyleSheet.create({
  interior: {
    flex: 1,
    flexDirection: 'row',
    margin: 3
  },
  launcherSide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  launcher: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statsSide: {
    flex: 1,
    flexDirection: 'column',
    margin: 3
  },
  map: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  playerLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  thrust: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  thrustSlider: {
    width: '100%',
    flex: 1,
    transform: [ { rotate: "-90deg" } ],
  },
  input: {
    height: 30,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  header: {
    flex: 1
  },
  title: {
    fontSize: 25
  },
  main: {
    flex: 5
  },
  actions: {
    flex: 1
  },
  bold: {
    fontWeight: "bold"
  },
  dataEntry: {
    fontWeight: "100"
  }
});

export default GameScreen;
