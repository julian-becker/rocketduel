import React, { createContext, useReducer } from 'react';
import { DEFAULT_STATE as initialTargetState, initTargets, targetReducer } from '../hooks/useTarget';

const TargetContext = createContext(initialTargetState);

const TargetProvider = (props) => {

  const { player, children } = props;
  const [ targets, dispatchTarget ] = useReducer(targetReducer, player, initTargets);
  return (
    <TargetContext.Provider value={{ targets, dispatchTarget }}>
      {children}
    </TargetContext.Provider>
  )
}

export { TargetContext, TargetProvider }