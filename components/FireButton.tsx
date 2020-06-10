import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/styled/Button';
import { BodyText } from './styled/Text';
import { calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { blue, red, white } from './styled/Colors';
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
      <Button bold text='Fire' textColor={white} backgroundColor={red} onClick={() => onPressFire()}/>
      <TouchableOpacity onPress={() => regenerateTarget(coords)} >
        <BodyText align='center' color={blue}>New Target</BodyText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default FireButton;



