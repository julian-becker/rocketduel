import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import levels from '../lib/levels';
import { INITIAL_HEALTH, MAX_DISTANCE, MIN_DISTANCE, azimuthToBearing, calculateDamage, calculateImpact, convertThrust, getImpactProximity, getRandomInt } from '../lib/gameMechanics';
const DEFAULT_ROBOT_PROPS = {
  coords: [0,0],
  azimuth: 0,
  distance: 0,
  altitude: 0,
  health: INITIAL_HEALTH,
  isDestroyed: false
};

const initTargets = ({level, coords}) => {
  let robots:Array<object> = [];
  const targetLevel = levels[level];
  const enemies = targetLevel.enemies;
  Object.keys(enemies).forEach((type) => {
    [...Array(enemies[type])].forEach((_, i) => {
      const distance = getRandomInt(MIN_DISTANCE, MAX_DISTANCE);
      const azimuth = getRandomInt(0, 360);
    
      const origin = turf.point(coords);
      // turf expects bearing in range ( -180, 180 )
      const targetLocation = turf.destination(origin, distance, azimuthToBearing(azimuth), {units: 'meters'});
      const targetCoords = targetLocation.geometry && targetLocation.geometry.coordinates;

      robots.push({
        ...DEFAULT_ROBOT_PROPS,
        id: uuidv4(),
        type: type,
        distance: Math.round(distance), 
        azimuth: azimuth, 
        coords: targetCoords
      })
    });
  });
  return robots;
};

// returns the updated targets with damage, and the number of remaining targets
const damageTargets = ({ impact, targets}) => {
  let damagedTargets: Array<object> = [];
  let remainingTargets = targets.length;
  targets.forEach((target: object) => {
    const { coords, health, id } = target;
    const proximity = getImpactProximity(impact.impactCoords, coords);
    console.log(`proximity: ${proximity}`);
    const damage = calculateDamage(proximity);
    const newHealth = Math.max(health - damage, 0)
    console.log(`target ${id} took ${damage} damage and now has ${newHealth} health`);
    const destroyed = newHealth === 0;
    destroyed ? remainingTargets-- : null;
    // Player.playSound('blastMiss'); TODO: add in when timing is implemented
    damagedTargets.push({
      ...target,
      health: newHealth,
      isDestroyed: destroyed
    })
  })
  return { damagedTargets: damagedTargets, remainingTargets: remainingTargets };
}

export { damageTargets, initTargets }