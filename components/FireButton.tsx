import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AwesomeButton from 'react-native-really-awesome-button';
import { BodyText } from './styled/Text';
import { MIN_MORTAR_ELEVATION, MAX_MORTAR_ELEVATION, calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { red, white } from './styled/Colors';
import RocketIcon from './RocketIcon';
import HazardIcon from './HazardIcon';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

const FireButton = () => {
  const navigation = useNavigation();

  // destructure the needed info
  const { player } = useContext(PlayerContext);
 
  const { azimuth, elevation, location } = player;
  const { altitude, coords } = location
  const { target, dispatchTarget } = useContext(TargetContext);
  const { health } = target;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { dispatchImpact } = useContext(ImpactContext);
  const { thrust } = projectile;

  const safeElevation = (elevation: number) => {
    return (MIN_MORTAR_ELEVATION <= elevation && elevation <= MAX_MORTAR_ELEVATION);
  }

  const onPressFire = () => {

    dispatchProjectile({type: 'FIRE'});
    const impact = calculateImpact({
      originCoords: coords,
      targetCoords: target.coords,
      velocity: convertThrust(Number(thrust)),
      elevation: Number(elevation),
      azimuth: azimuth,
      height: Number(altitude)
    });
    console.log(`proximity: ${impact.proximity}`);
    const damage = calculateDamage(impact.proximity);
    dispatchTarget({ type: 'UPDATE_HEALTH', value: damage });
    dispatchImpact({type: 'ADD_IMPACT', value: impact });
    if (damage >= health) {
      setTimeout(() => {
        navigation.navigate('YouWin');
      }, 1000)
    }
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
        disabled={!safeElevation(elevation)}
        onPress={() => onPressFire()}>
        { !safeElevation(elevation) ? <HazardIcon /> : <RocketIcon /> }
      </AwesomeButton>
      <TouchableOpacity onPress={() => regenerateTarget(coords)} >
        <BodyText align='center' color={white}>Regenerate Target</BodyText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center'
  },
});

export default FireButton;



