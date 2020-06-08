import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isEmulatorSync } from 'react-native-device-info';
import Slider from '@react-native-community/slider';
import MapPanel from '../components/MapPanel';
import Azimuth from '../components/Azimuth';
import Elevation from '../components/Elevation';
import ManualThrust from '../components/ManualThrust';
import Container from '../components/styled/Container'
import { BodyText, ButtonText, Header } from '../components/styled/Text';
import Button from '../components/styled/Button';
import { blue, black, red, white } from '../components/styled/Colors';
import useCompass from '../hooks/useCompass';
import useGyroscope from '../hooks/useGyroscope';
import { useNavigation } from '@react-navigation/native';

import { initTarget, targetReducer } from '../hooks/useTarget';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';
import { IMPACT_RADIUS, MAX_MORTAR_ELEVATION, MIN_MORTAR_ELEVATION, calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { AlertType, DropDownHolder } from '../components/DropDownHolder';

import { TouchableOpacity } from 'react-native-gesture-handler';

const GameScreen = (props) => {
  const navigation = useNavigation();
  // start getting compass data
  const { player, dispatchPlayer } = props;
  useCompass(dispatchPlayer);
  useGyroscope(dispatchPlayer);
  useEffect(() => {
    const onClose = (data) => {
      data.type === 'success' ? navigation.navigate('YouWin') : null
    }
    DropDownHolder.setOnClose(onClose)
    return function cleanup() {
      DropDownHolder.setOnClose(() => undefined);
    }
  });
  const { location, elevation, azimuth } = player;
  const { coords, altitude } = location;
  const [ target, dispatchTarget ] = useReducer(targetReducer, coords, initTarget);
  const [ projectile, dispatch ] = useReducer(projectileReducer, initialProjectileState);
  const { thrust } = projectile;

  const setThrust = async (thrust) => {
    const options = {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger('selection', options);
    dispatch({type: 'UPDATE_THRUST', value: thrust});
  }

  const onPressFire = () => {
    dispatch({type: 'FIRE'});
    const impact = calculateImpact({
      originCoords: coords,
      targetCoords: target.coords,
      velocity: convertThrust(Number(thrust)),
      elevation: Number(elevation),
      azimuth: azimuth,
      height: Number(altitude)
    });

    const damage = calculateDamage(impact.proximity);
    const distance = Math.round(impact.distance);
    const proximity = Math.round(impact.proximity);
    const time = Math.round(impact.time);
    dispatchTarget({type: 'UPDATE_HEALTH', value: damage});
    const isAHit = impact.proximity <= IMPACT_RADIUS;
    const isAKill = damage >= target.health;
    let alertType:AlertType = 'error';
    if (isAHit) {
      alertType = 'info';
    }
    if (isAKill) {
      alertType = 'success';
    }
    const alertTitle = isAHit ? 'Hit!!!' : 'Miss';
    const alertMessage = `Shot traveled ${distance} meters in ${time} seconds and landed ${proximity} meters from the target. `;
    const alertMissMessage = alertMessage + `It was a miss.`
    const alertHitMessage = alertMessage + `It's a hit! You did ${damage} damage. ${isAKill ? 'Target is destroyed!' : ''}`;
    DropDownHolder.alert(alertType, alertTitle, isAHit ? alertHitMessage : alertMissMessage)
  }

  const onChangeInput = (value, parameter = 'azimuth') => {
    const num = Number(value);
    const minRange = parameter === 'elevation' ? MIN_MORTAR_ELEVATION : 0;
    const maxRange = parameter === 'elevation' ? MAX_MORTAR_ELEVATION : 360;
    // hacky validation - check that value is valid before dispatch
    if (Number.isInteger(num) && minRange <= num && num <= maxRange) {
      dispatch({type: `UPDATE_${parameter.toUpperCase()}`, value: num});
    }
  }

  const regenerateTarget = (coords: Array<number>) => {
    dispatchTarget({type: 'REGENERATE_TARGET', value: coords});
  }

  const targetPanel = () => {
    if (target && target.coords) {
      return (
        <MapPanel player={player} target={target} pitch={elevation}/>
      )
    } else {
      return <ActivityIndicator />
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1, flexDirection: 'column'}}>
        {/* map view */}
        <MapPanel style={{flex: 1}} player={player} target={target} />
        {/* controls view */}
        <View style={{flex: 1, flexDirection: 'column'}}>
        { isEmulatorSync() ?
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 5}}>
            <View style={styles.stats}>
              <Azimuth
                onChangeText={(text: string) => dispatchPlayer({type: 'UPDATE_AZIMUTH', value: Number(text)})}
              />
              <Elevation
                value={elevation}
                onChangeText={(text: string) => dispatchPlayer({type: 'UPDATE_ELEVATION', value: Number(text)})}
              />
              <ManualThrust
                value={thrust}
                onChangeText={(text: string) => dispatchPlayer({type: 'UPDATE_THRUST', value: Number(text)})}
              />
            </View>
          </View>
          : null }
          <View style={{flex: 5, flexDirection: 'row' }}>
            {/* launcher side */}
            <View style={styles.launcherSide}>
              <View style={styles.launcher}>
                <BodyText>Launcher goes here</BodyText>
              </View>
              <View style={styles.buttons}>
                <Button bold text='Fire' textColor={white} backgroundColor={red} onClick={() => onPressFire()}/>
                <TouchableOpacity onPress={() => regenerateTarget(coords)} >
                  <BodyText align='center' color={blue}>New Target</BodyText>
                </TouchableOpacity>
              </View>
            </View>
            {/* controls view */}
            { isEmulatorSync() ?
              null
            : 
              <View style={styles.thrust}>
                <BodyText>{`Azimuth: ${azimuth} Elevation: ${elevation}`}</BodyText>
                <Slider
                  style={styles.thrustSlider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={projectile.thrust}
                  onValueChange={setThrust}
                />
                <BodyText>Thrust: {projectile.thrust}</BodyText>
              </View>
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
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
