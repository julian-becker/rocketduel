// Wrapper screen for permissions checking, etc before loading the game
import React, { useReducer } from 'react';
import {
    ActivityIndicator,
    Button,
    Linking,
    Text,
    View
} from 'react-native';

import GameScreen from './Game';
import { DEFAULT_STATE as initialPlayerState, playerReducer } from '../hooks/usePlayer';
import useLocation from '../hooks/useLocation';
import usePermissions from '../hooks/usePermissions';
import useAppState from 'react-native-appstate-hook';

const GameWrapper = () => {
  const permission = usePermissions('LOCATION');
  const [player, dispatchPlayer ] = useReducer(playerReducer, initialPlayerState);
  // start getting location
  useLocation(dispatchPlayer);
  const { appState } = useAppState({
    onChange: (newAppState) => { newAppState === 'active' && permission.isDenied ? permission.ask() : null }
  });

  const permissionDeniedMessage = () => {
    return (
      <View>
        <Text>Rocket Duel needs access to your GPS. Open the </Text>
        <Button title="Settings" onPress={() => { Linking.openSettings()}}/>
        <Text> on your phone to allow them.</Text>
      </View>
    )
  }

  const permissionUnknownMessage = () => {
    return (
      <Text>I have no idea how this happened!</Text>
    )
  }
  if (permission.isGranted) {
    // render game screen
    return player.isLocated ? <GameScreen player={player} dispatchPlayer={dispatchPlayer}/> : <ActivityIndicator size="large" color="#22222" />;
  } else if (permission.isDenied) {
    // render permission denied screen
    return permissionDeniedMessage();
  } else if (permission.isChecking) {
    // spinner
    return <ActivityIndicator size="large" color="#22222" />
  } else if (permission.isUndetermined) {
    // ask
    permission.ask();
    return <ActivityIndicator size="large" color="#22222" />
  } else {
    // if all else fails
    return permissionUnknownMessage();
  }
}

export default GameWrapper;
