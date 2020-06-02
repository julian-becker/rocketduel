import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Azimuth from '../components/Azimuth';
import Elevation from '../components/Elevation';
import Container from '../components/styled/Container'
import { BodyText, ButtonText, Header } from '../components/styled/Text';
import Button from '../components/styled/Button';
import { blue, black, red, white } from '../components/styled/Colors';
import { useNavigation } from '@react-navigation/native';

import { initTarget, targetReducer } from '../hooks/useTarget';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';
import { IMPACT_RADIUS, MAX_MORTAR_ELEVATION, MIN_MORTAR_ELEVATION, calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { AlertType, DropDownHolder } from '../components/DropDownHolder';

import { TouchableOpacity } from 'react-native-gesture-handler';

const GameScreen = (props) => {
  const navigation = useNavigation();
  const { player, dispatchPlayer } = props;
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

  const setThrust = (thrust) => {
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
      const { coords, distance, azimuth, health, isDestroyed } = target;
      return (
        <View>
          <Header>Target:</Header>
          <BodyText accessibilityID='targetCoords'>{`[${coords[0].toFixed(3)}, ${coords[1].toFixed(3)}]`}</BodyText>
          <BodyText accessibilityID='targetDistance'>{distance} meters</BodyText>
          <BodyText accessibilityID='targetBearing'>{azimuth} &deg;</BodyText>
          <BodyText color={isDestroyed ? red : black} accessibilityID='targetHealth'>{target.isDestroyed ? `Destroyed` : `Health: ${target.health}`}</BodyText>
        </View>
      )
    } else {
      return <ActivityIndicator />
    }
  }
  const locationPanel = () => {
    if (coords) {
      return (
        <View style={styles.playerLocation}>
          <Header>Your Location</Header>
          <BodyText accessibilityID='playerLatitude'>{coords[0]}</BodyText>
          <BodyText accessibilityID='playerLongitude'>{coords[1]}</BodyText>
        </View>
      )
    } else {
      return <ActivityIndicator />
    }
  }

  return (
    <Container>
      <View style={styles.interior}>
        {/* launcher half */}
        <View style={styles.launcherSide}>
          <View style={styles.launcher}>
            <BodyText>Launcher goes here</BodyText>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => onPressFire()} >
              <ButtonText bold align='center' color={white}>Fire</ButtonText>
            </Button>
            <TouchableOpacity onPress={() => regenerateTarget(coords)} >
              <BodyText align='center' color={blue}>New Target</BodyText>
            </TouchableOpacity>
          </View>
      </View>
      {/* stats half */}
      <View style={styles.statsSide}>
          <View style={styles.map}>
            {targetPanel()}
          </View>
          <View style={styles.stats}>
            {locationPanel()}
            <Azimuth
              value={azimuth}
              onChangeText={(text: string) => dispatchPlayer({type: 'UPDATE_AZIMUTH', value: Number(text)})}
            />
            <Elevation
              value={elevation}
              onChangeText={(text: string) => dispatchPlayer({type: 'UPDATE_ELEVATION', value: Number(text)})}
            />
          </View>
          <View style={styles.thrust}>
            <Slider
              style={styles.thrustSlider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={projectile.thrust}
              onSlidingComplete={setThrust}
            />
            <BodyText>Thrust: {projectile.thrust}</BodyText>
          </View>
        </View>
      </View>
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
    flexDirection: 'column'
  },
  launcher: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  statsSide: {
    flex: 1,
    flexDirection: 'column',
    margin: 3
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  stats: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  thrust: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
