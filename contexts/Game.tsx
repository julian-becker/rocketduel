import React, { createContext, useEffect } from 'react';
import { initTargets } from '../actions/targets';
import { DEFAULT_STATE as initialGameState } from '../hooks/useGame';

const GameContext = createContext(initialGameState);

const GameProvider = (props) => {

  const { children, game, dispatchGame } = props;
  useEffect(() => {
    const { location } = game.player;
    const targets = initTargets({ level: game.level, coords: location.coords});
    dispatchGame({type: 'CREATE_TARGETS', value: targets});
  }, [game.level]) // only run when the level changes
  return (
    <GameContext.Provider value={{ game, dispatchGame }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }