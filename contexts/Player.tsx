import React, { createContext } from 'react';
import { DEFAULT_STATE as initialPlayerState } from '../hooks/usePlayer';

const PlayerContext = createContext(initialPlayerState);

const PlayerProvider = (props) => {

  const { children, player, dispatchPlayer } = props;
  return (
    <PlayerContext.Provider value={{ player, dispatchPlayer }}>
      {children}
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider }