import React, { createContext, useReducer } from 'react';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';

const ProjectileContext = createContext(initialProjectileState);

const ProjectileProvider = ({ children }) => {

  const [ projectile, dispatchProjectile ] = useReducer(projectileReducer, initialProjectileState);

  return (
    <ProjectileContext.Provider value={{ projectile, dispatchProjectile }}>
      {children}
    </ProjectileContext.Provider>
  )
}

export { ProjectileContext, ProjectileProvider }