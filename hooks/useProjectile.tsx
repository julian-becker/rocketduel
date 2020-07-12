import { fireProjectile, initProjectiles, landProjectile, loadNextProjectile } from '../actions/projectiles';

const DEFAULT_STATE = {
  isReady: true,
  clip: []
}

const projectileReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_PROJECTILES':
      return { ...DEFAULT_STATE, clip: action.value}
    case 'FIRE':
      return { ...state, clip: fireProjectile({projectiles: state.clip, params: action.value}), isReady: false };
    case 'READY_TO_FIRE':
      return { ...state, clip: loadNextProjectile(state.clip), isReady: true };
    case 'LAND_PROJECTILE':
      return { ...state, clip: landProjectile(action.value, state.clip) };
    case 'RELOAD':
      const newState = initProjectiles(DEFAULT_STATE);
      return { ...newState };
    case 'CLEAR_PROJECTILE':
      return { ...state, ...DEFAULT_STATE};
    default:
      return { ...state };
  }
}

export { DEFAULT_STATE, projectileReducer }