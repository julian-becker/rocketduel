import React, { createContext, useReducer } from 'react';
import { DEFAULT_STATE, impactReducer } from '../hooks/useImpact';

const ImpactContext = createContext(DEFAULT_STATE);

const ImpactProvider = ({ children }) => {

  const [ impacts, dispatchImpact ] = useReducer(impactReducer, DEFAULT_STATE);

  return (
    <ImpactContext.Provider value={{ impacts, dispatchImpact }}>
      {children}
    </ImpactContext.Provider>
  )
}

export { ImpactContext, ImpactProvider }