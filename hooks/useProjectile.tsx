const DEFAULT_STATE = {
  "coords": null, // projectile coords are only set on impact
  "altitude": 0,
  "thrust": 0,
  "isInFlight": false,
  "isLanded": false
}

const projectileReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COORDS':
      return { ...state, coords: action.value };
    case 'UPDATE_THRUST':
      return { ...state, thrust: action.value };
    case 'FIRE':
      return { ...state, isInFlight: true };
    case 'LANDED':
      return { ...state, isInFlight: false, isLanded: true, coords: action.value};
    case 'CLEAR_PROJECTILE':
      return { ...state, ...DEFAULT_STATE};
    default:
      return { ...state };
  }
}

export { DEFAULT_STATE, projectileReducer }