import React, { createContext, useReducer } from 'react';
import { DEFAULT_STATE as initialTargetState, initTarget, targetReducer } from '../hooks/useTarget';

const TargetContext = createContext(initialTargetState);

const TargetProvider = (props) => {

  const { coords, children } = props;
  const [ target, dispatchTarget ] = useReducer(targetReducer, coords, initTarget);

  return (
    <TargetContext.Provider value={{ target, dispatchTarget }}>
      {children}
    </TargetContext.Provider>
  )
}

export { TargetContext, TargetProvider }