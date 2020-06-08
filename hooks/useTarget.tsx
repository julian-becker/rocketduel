import * as turf from '@turf/turf';
import { INITIAL_HEALTH, MAX_DISTANCE, MIN_DISTANCE, azimuthToBearing, getRandomInt } from '../lib/gameMechanics';

const DEFAULT_STATE = {
  coords: [0,0],
  azimuth: 0,
  distance: 0,
  altitude: 0,
  health: INITIAL_HEALTH,
  isDestroyed: false
}

const initTarget = (coords: Array<number>) => {
  const distance = getRandomInt(MIN_DISTANCE, MAX_DISTANCE);
  const azimuth = getRandomInt(0, 360);

  const origin = turf.point(coords);
  // turf expects bearing in range ( -180, 180 )
  const targetLocation = turf.destination(origin, distance, azimuthToBearing(azimuth), {units: 'meters'});
  const targetCoords = targetLocation.geometry && targetLocation.geometry.coordinates;
  
  // QA - check distance between origin and target coords
  const targetDistance = turf.distance(origin, turf.point(targetCoords), {units: 'meters'});
  
  // return the calculated data on the target. 
  const output = {...DEFAULT_STATE, distance: Math.round(distance), azimuth: azimuth, coords: targetCoords}
  return(output);
}

const targetReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, coords: action.value };
    case 'REGENERATE_TARGET':
      const newTarget = initTarget(action.value);
      return { ...state, ...newTarget };
    case 'UPDATE_HEALTH':
      const newHealth = Math.max(state.health - action.value, 0)
      return { 
        ...state,
        health: newHealth,
        isDestroyed: newHealth === 0
      };
    default:
      return { ...state };
  }
}

export { initTarget, targetReducer }