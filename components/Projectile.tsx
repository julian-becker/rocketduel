import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

// dummy component for managing projectile logic
const Projectile = () => {
  const navigation = useNavigation();

  // destructure the needed info
  const { player } = useContext(PlayerContext);
 
  const { location } = player;
  const { altitude, coords } = location;
  const { target, dispatchTarget } = useContext(TargetContext);
  const { health } = target;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { dispatchImpact } = useContext(ImpactContext);

  useEffect(() => {
    const { thrust, elevation, azimuth } = projectile;
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
    // Player.playSound('blastMiss'); TODO: add in when timing is implemented
    setTimeout(() => {
      dispatchProjectile({ type: 'LANDED' });
      if (damage >= health) {
        navigation.navigate('YouWin');
      }
      
    }, 1000)
  }, []);


  return (
    <View />
  )
}

export default Projectile;