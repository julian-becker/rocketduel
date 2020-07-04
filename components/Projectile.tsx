import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { generateImpact } from '../actions/impact';
import { damageTargets } from '../actions/targets';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';
import { ImpactContext } from '../contexts/Impact';

// dummy component for managing projectile logic
const Projectile = () => {

  // destructure the needed info
  const { game, dispatchGame } = useContext(GameContext);
  const { player, targets } = game
  const { location } = player;
  const { projectile, dispatchProjectile } = useContext(ProjectileContext);
  const { dispatchImpact } = useContext(ImpactContext);

  useEffect(() => {

    setTimeout(() => {
      dispatchProjectile({ type: 'LANDED' });
      const impact = generateImpact({origin: location, projectile: projectile});
      dispatchImpact({type: 'ADD_IMPACT', value: impact });
      const { damagedTargets, remainingTargets } = damageTargets({impact: impact, targets: targets});
      dispatchGame({type: 'DAMAGE_TARGETS', value: damagedTargets});
      if (remainingTargets === 0) {
        setTimeout(() => {
          dispatchGame({type: 'LEVEL_OVER'});
        }, 5000)
      }
    }, 1000)

    return clearTimeout();
  }, [targets]);


  return (
    <View />
  )
}

export default Projectile;