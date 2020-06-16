import React from 'react';
import { isEmulatorSync } from 'react-native-device-info';
import GameControls from '../components/GameControls';
import EmulatorGameControls from '../components/EmulatorGameControls';

// Bottom Half of the game screen is used to display controls
const BottomHalf = () => {

  return (
    isEmulatorSync() ? <EmulatorGameControls /> : <GameControls />
  )
}

export default BottomHalf;