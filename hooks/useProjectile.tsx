const DEFAULT_STATE = {
  "coords": [0, 0],
  "bearing": 0,
  "angle": 0,
  "altitude": 0,
  "thrust": 1,
  "blastRadius": 35, //in meters
  "isInFlight": false
}

const projectileReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, ...action.location };
    case 'UPDATE_THRUST':
      return { ...state, thrust: action.thrust };
    case 'UPDATE_ANGLE':
      return { ...state, angle: action.angle };
    case 'FIRE':
      return { ...state, isInFlight: true };
    default:
      return { ...state };
  }
}

export { DEFAULT_STATE, projectileReducer }