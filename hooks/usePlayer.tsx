import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';

const DEFAULT_STATE = {
  isLocated: false,
  location: {
    coords: [0, 0], // use geoJSON-style coordinates
    altitude: 0,
    accuracy: 0,
    speed: 0,
    heading: 0 // Azimuth direction 0-360 deg)
  },
  azimuth: 0, // obtain from compass
  elevation: MIN_MORTAR_ELEVATION, // obtain from gyroscope - 0 (horizontal) to 90 (vertical)
  thrust: 0
}

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, location: action.value, isLocated: true };
    case 'UPDATE_AZIMUTH':
      return { ...state, azimuth: action.value };
    case 'UPDATE_ELEVATION':
      return { ...state, elevation: action.value };
    case 'UPDATE_THRUST':
      return { ...state, thrust: action.value };
    default:
      return { ...state };
  }
};

export { DEFAULT_STATE, playerReducer };