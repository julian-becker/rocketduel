import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { generateImpact } from '../actions/impact';
import { damageTargets } from '../actions/targets';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

// dummy component for managing projectile logic
const Projectile = ({ projectile }) => {
  // destructure the needed info
  const { id, isInFlight } = projectile;
  const { game, dispatchGame } = useContext(GameContext);
  const { player, targets } = game
  const { location } = player;
  const { dispatchProjectile } = useContext(ProjectileContext);
  const { dispatchImpact } = useContext(ImpactContext);

  useEffect(() => {
    if(isInFlight) {
      setTimeout(() => {
        dispatchProjectile({type: 'READY_TO_FIRE'})
      }, 1000)
    }
 
    return clearTimeout();
  }, [isInFlight]);

  useEffect(() => {
    if(isInFlight) {
      setTimeout(() => {
        dispatchProjectile({ type: 'LAND_PROJECTILE', value: id });
        const impact = generateImpact({origin: location, projectile: projectile});
        dispatchImpact({type: 'ADD_IMPACT', value: impact });
        const { damagedTargets, remainingTargets } = damageTargets({impact: impact, targets: targets});
        dispatchGame({type: 'DAMAGE_TARGETS', value: damagedTargets});
        if (remainingTargets === 0) {
          setTimeout(() => {
            dispatchGame({type: 'LEVEL_OVER'});
          }, 5000)
        }
      }, 2000)
    }
 
    return clearTimeout();
  }, [isInFlight]);
  

  return (
    <View />
  )
}

export default Projectile;