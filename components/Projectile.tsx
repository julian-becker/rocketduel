import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

// dummy component for managing projectile logic
const Projectile = () => {

  // destructure the needed info
  const { player } = useContext(PlayerContext);
 
  const { location } = player;
  const { targets, dispatchTarget } = useContext(TargetContext);
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { thrust, elevation, azimuth } = projectile;
  const { dispatchImpact } = useContext(ImpactContext);

  useEffect(() => {
    setTimeout(() => {
      dispatchProjectile({ type: 'LANDED' });
      if (targets.length > 0) {
        targets.forEach((target) => {
          const { coords, health, id } = target;
          const impact = calculateImpact({
            originCoords: location.coords,
            targetCoords: coords,
            velocity: convertThrust(Number(thrust)),
            elevation: Number(elevation),
            azimuth: azimuth,
            height: Number(location.altitude)
          });
          dispatchImpact({type: 'ADD_IMPACT', value: impact });
          console.log(`proximity: ${impact.proximity}`);
          const damage = calculateDamage(impact.proximity);
          console.log(`target ${id} took ${damage} damage and now has ${health} health`);
          // Player.playSound('blastMiss'); TODO: add in when timing is implemented
          dispatchTarget({ type: 'CAUSE_DAMAGE', value: {id: id, damage: damage }});
        })
      }
    }, 1000)
  }, []);


  return (
    <View />
  )
}

export default Projectile;