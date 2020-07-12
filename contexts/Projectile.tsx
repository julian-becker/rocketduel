import React, { createContext, useReducer } from 'react';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';
import { initProjectiles } from '../actions/projectiles';

const ProjectileContext = createContext(initialProjectileState);

const ProjectileProvider = ({ children }) => {

  const [ projectiles, dispatchProjectile ] = useReducer(projectileReducer, initialProjectileState, initProjectiles);

  return (
    <ProjectileContext.Provider value={{ projectiles, dispatchProjectile }}>
      {children}
    </ProjectileContext.Provider>
  )
}

export { ProjectileContext, ProjectileProvider }