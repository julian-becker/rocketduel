import { v4 as uuidv4 } from 'uuid';

const CLIP_SIZE = 3;

const DEFAULT_PROJECTILE_PROPS = {
  coords: null, // projectile coords are only set on impact
  altitude: 0,
  thrust: 0, // set at launch
  elevation: 0, // set at launch
  azimuth: 0,
  isInFlight: false,
  isLoaded: false
};

const initProjectiles = (initialState: object) => {
  let rockets:Array<object> = [];

    [...Array(CLIP_SIZE)].forEach((_, i) => {
      rockets.push({
        ...DEFAULT_PROJECTILE_PROPS,
        id: uuidv4(),
        isLoaded: i === 0
      })
    });
  return {...initialState, clip: rockets};
};

const fireProjectile = ({projectiles, params}) => {
  let newClip:Array<object> = [];
  projectiles.map((projectile: object) => {
    newClip.push(projectile.isLoaded ? { ...projectile, ...params, isLoaded: false, isInFlight: true } : projectile);
  })

  return newClip;
};

const landProjectile = (id:string, projectiles:Array<object>) => {
  return projectiles.filter(projectile => id != projectile.id);
};

// find the next projectile that's not visible and make it visible
const loadNextProjectile = (projectiles:Array<object>) => {
  const projectileToLoad = projectiles.find((projectile: object) => {
    return !projectile.isLoaded && !projectile.isInFlight;
  })
  const newClip:Array<object> = [];
  if (projectileToLoad) {
    projectiles.map((projectile) => {
      newClip.push(projectile.id === projectileToLoad.id ? { ...projectile, isLoaded: true} : projectile);
    })
  }
  
  return newClip;
};

export { DEFAULT_PROJECTILE_PROPS, fireProjectile, initProjectiles, landProjectile, loadNextProjectile };