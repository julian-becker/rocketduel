import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { BodyText } from './styled/Text';
import { MIN_MORTAR_ELEVATION, MAX_MORTAR_ELEVATION } from '../lib/gameMechanics';
import { initTargets } from '../actions/targets';
import { red, white } from './styled/Colors';
import Player from '../lib/Player';
import RocketIcon from './RocketIcon';
import HazardIcon from './HazardIcon';
import Projectile from './Projectile';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

const FireButton = () => {

  // destructure the needed info
  const { game, dispatchGame } = useContext(GameContext);
  const { player, level } = game;
  const { location, elevation, thrust, azimuth } = player;
  const { coords } = location;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { isInFlight } = projectile;
  const { dispatchImpact } = useContext(ImpactContext);

  const safeElevation = (elevation: number) => {
    return (MIN_MORTAR_ELEVATION <= elevation && elevation <= MAX_MORTAR_ELEVATION);
  }

  const onPressFire = () => {
    Player.playSound('fireButton');
    dispatchProjectile({type: 'FIRE', value: { elevation: elevation, thrust: thrust, azimuth: azimuth}});
    Player.playSound('rocketLaunch');
  }

  const regenerateTargets = (coords: Array<number>) => {
    const newTargets = initTargets({ level: level, coords: coords});
    dispatchGame({type: 'CREATE_TARGETS', value: newTargets});
    dispatchImpact({type: 'CLEAR_IMPACTS'});
  }

  const safeToFire = () => {
    return (safeElevation(elevation) && !isInFlight)
  }

  return ( 
    <View style={styles.buttons}>
      <AwesomeButton 
        height={70}
        width={70}
        borderRadius={35}
        raiseLevel={5}
        backgroundDarker={ safeToFire() ? '#EA3434' : red }
        borderColor='#EA3434'
        borderWidth={1}
        textColor={white}
        backgroundColor={ safeToFire() ? red : '#F17E7E' }
        disabled={!safeToFire()}
        onPress={() => onPressFire()}>
        { safeToFire() ? <RocketIcon /> : <HazardIcon /> }
      </AwesomeButton>
      <TouchableOpacity onPress={() => regenerateTargets(coords)} >
        <BodyText align='center' color={white}>Regenerate Targets</BodyText>
      </TouchableOpacity>
      { projectile.isInFlight ? <Projectile /> : null }
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center'
  },
});

export default FireButton;



