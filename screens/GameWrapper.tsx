// Wrapper screen for permissions checking, etc before loading the game
import React, { useReducer } from 'react';
import {
    ActivityIndicator
} from 'react-native';

import GameScreen from './Game';
import LocationDenied from '../components/LocationDenied';
import { DEFAULT_STATE as initialPlayerState, playerReducer } from '../hooks/usePlayer';
import useLocation from '../hooks/useLocation';
import usePermissions from '../hooks/usePermissions';

const GameWrapper = () => {
  const permission = usePermissions('LOCATION');
  const [player, dispatchPlayer ] = useReducer(playerReducer, initialPlayerState);
  // start getting location
  useLocation(dispatchPlayer);

  if (permission.isGranted) {
    // render game screen
    return player.isLocated ? <GameScreen player={player} dispatchPlayer={dispatchPlayer}/> : <ActivityIndicator size="large" color="#22222" />;
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
