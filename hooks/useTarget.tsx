import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import levels from '../lib/levels';
import { INITIAL_HEALTH, MAX_DISTANCE, MIN_DISTANCE, azimuthToBearing, getRandomInt } from '../lib/gameMechanics';

const DEFAULT_STATE: Array<object> = [];

const DEFAULT_ROBOT_PROPS = {
  coords: [0,0],
  azimuth: 0,
  distance: 0,
  altitude: 0,
  health: INITIAL_HEALTH,
  isDestroyed: false
}

/*
// * get the object corresponding to the player's level
// * for each key, for each value
//
*/

const initTargets = (player: object) => {
  const { location, level } = player;
  const { coords } = location;
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
}

const targetReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_TARGETS':
      const newTargets = initTargets(action.value);
      return [ ...DEFAULT_STATE, ...newTargets ];
    case 'CAUSE_DAMAGE':
      const { id, damage } = action.value;
      const newState = state.map((item) => {
        if (item.id !== id) {
          return item
        }
        const newHealth = Math.max(item.health - damage, 0)
        return {
          ...item,
          health: newHealth,
          isDestroyed: newHealth === 0
        }
      })
      return [...newState];
    default:
      return [ ...state ];
  }
}

export { DEFAULT_STATE, initTargets, targetReducer }