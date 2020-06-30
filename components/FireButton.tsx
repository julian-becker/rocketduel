import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { BodyText } from './styled/Text';
import { MIN_MORTAR_ELEVATION, MAX_MORTAR_ELEVATION } from '../lib/gameMechanics';
import { red, white } from './styled/Colors';
import Player from '../lib/Player';
import RocketIcon from './RocketIcon';
import HazardIcon from './HazardIcon';
import Projectile from './Projectile';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

const FireButton = () => {

  // destructure the needed info
  const { player } = useContext(PlayerContext);
 
  const { location, elevation, thrust, azimuth } = player;
  const { coords } = location;
  const { dispatchTarget } = useContext(TargetContext);
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

  const regenerateTarget = (coords: Array<number>) => {
    dispatchTarget({type: 'REGENERATE_TARGET', value: coords});
    dispatchImpact({type: 'CLEAR_IMPACTS'});
  }

  return ( 
    <View style={styles.buttons}>
      <AwesomeButton 
        height={70}
        width={70}
        borderRadius={35}
        raiseLevel={5}
        backgroundDarker={ !safeElevation(elevation) ? red : '#EA3434' }
        borderColor='#EA3434'
        borderWidth={1}
        textColor={white}
        backgroundColor={ !safeElevation(elevation) ? '#F17E7E' : red}
        disabled={!safeElevation(elevation) && !isInFlight}
        onPress={() => onPressFire()}>
        { !safeElevation(player.elevation) ? <HazardIcon /> : <RocketIcon /> }
      </AwesomeButton>
      <TouchableOpacity onPress={() => regenerateTarget(coords)} >
        <BodyText align='center' color={white}>Regenerate Target</BodyText>
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



