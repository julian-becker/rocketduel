import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';
import { initTargets } from '../actions/targets';

const DEFAULT_STATE = {
  level: 0,
  levelOver: false,
  player: {
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
  },
  targets: []
}

const gameReducer = (state, action) => {
  switch (action.type) {
    // Game management
    case 'NEXT_LEVEL':
      const newLevel = state.level++;
      //const targetsForLevel = initTargets({level: newLevel, coords: state.player.location.coords});
      return { ...state, level: state.level++, levelOver: false};
    case 'LEVEL_OVER':
      return { ...state, levelOver: true };
    case 'RESTART_GAME':
      return { ...state, level: 0, levelOver: false };
    // player management
    case 'UPDATE_LOCATION':
      return { ...state, player: { ...state.player, location: action.value, isLocated: true } };
    case 'UPDATE_AZIMUTH':
      return { ...state, player: { ...state.player, azimuth: action.value } };
    case 'UPDATE_ELEVATION':
      return { ...state, player: { ...state.player, elevation: action.value } };
    case 'UPDATE_THRUST':
      return { ...state, player: { ...state.player, thrust: action.value } };
    // target management
    case 'CREATE_TARGETS':
      return { ...state, targets: action.value};
    case 'DAMAGE_TARGETS':
      const { targets, remainingTargets } = action.value;
      return { ...state, targets: targets, levelOver: remainingTargets === 0};
    default:
      return { ...state };
  }
};

export { DEFAULT_STATE, gameReducer };