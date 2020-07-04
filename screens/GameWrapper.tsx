// Wrapper screen for permissions checking, etc before loading the game
import React, { useReducer } from 'react';
import {
    ActivityIndicator
} from 'react-native';

import GameScreen from './Game';
import YouWin from './YouWin';
import LocationDenied from '../components/LocationDenied';
import { DEFAULT_STATE as initialGameState, gameReducer } from '../hooks/useGame';
import { GameProvider } from '../contexts/Game';
import { ProjectileProvider } from '../contexts/Projectile';
import { ImpactProvider } from '../contexts/Impact';
import useLocation from '../hooks/useLocation';
import usePermissions from '../hooks/usePermissions';

const GameWrapper = () => {
  const permission = usePermissions('LOCATION');
  const [game, dispatchGame ] = useReducer(gameReducer, initialGameState);
  // start getting location
  useLocation(dispatchGame);

  if (permission.isGranted) {
    // render game screen
    const { isLocated } = game.player;
    if (isLocated) {
      return (
        <GameProvider game={game} dispatchGame={dispatchGame}>
          <ProjectileProvider>
            <ImpactProvider>
              { game.levelOver ? <YouWin /> : <GameScreen /> }
            </ImpactProvider>
          </ProjectileProvider>
        </GameProvider>
      )
    } else {
      return <ActivityIndicator size="large" color="#22222" />;
    }
  } else if (permission.isChecking) {
    // spinner
    return <ActivityIndicator size="large" color="#22222" />
  } else if (permission.isUndetermined) {
    // ask
    permission.ask();
    return <ActivityIndicator size="large" color="#22222" />
  } else {
    // if all else fails
    return <LocationDenied />;
  }
}

export default GameWrapper;
