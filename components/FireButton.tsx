import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AlertType, DropDownHolder } from '../components/DropDownHolder';
import Button from '../components/styled/Button';
import { BodyText } from './styled/Text';
import { IMPACT_RADIUS, calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { blue, red, white } from './styled/Colors';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ProjectileContext } from '../contexts/Projectile';

const FireButton = () => {

  // destructure the needed info
  const { player } = useContext(PlayerContext);
 
  const { azimuth, elevation, location } = player;
  const { altitude, coords } = location
  const { target, dispatchTarget } = useContext(TargetContext);
  const { health } = target;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
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
    const distance = Math.round(impact.distance);
    const proximity = Math.round(impact.proximity);
    const time = Math.round(impact.time);
    dispatchTarget({type: 'UPDATE_HEALTH', value: damage});
    const isAHit = impact.proximity <= IMPACT_RADIUS;
    const isAKill = damage >= health;
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

  const regenerateTarget = (coords: Array<number>) => {
    dispatchTarget({type: 'REGENERATE_TARGET', value: coords});
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



