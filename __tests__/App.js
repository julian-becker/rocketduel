import 'react-native';
import React from 'react';

import App from '../App.tsx';
// Note: test renderer must be required after react-native.
// import { act } from '@testing-library/react-native';
import { act, fireEvent, render, toJSON } from 'react-native-testing-library';
import { renderHook } from '@testing-library/react-hooks';
import usePlayer from '../hooks/usePlayer';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper'); 

jest.mock('expo-location', () => ({
  Accuracy: {Highest: true},
  watchPositionAsync: jest.fn()
}));

jest.mock('expo-permissions', () => ({
  getAsync: jest.fn().mockReturnValue({"ask": jest.fn(), "isChecking": false, "isDenied": false, "isGranted": true, "isUndetermined": false, "status": "granted"}),
  askAsync: jest.fn().mockReturnValue({"ask": jest.fn(), "isChecking": false, "isDenied": false, "isGranted": true, "isUndetermined": false, "status": "granted"})
})); 

jest.mock('react-native-device-info', () => {
  return {
    isEmulatorSync: true
  }
});

jest.mock('react-native-compass-heading', () => ({
  CompassHeading: jest.fn()
}));

jest.mock('expo-sensors', () => ({
  Accelerometer: jest.fn()
}));

jest.mock('expo-location', () => ({
  Accuracy: {Highest: true},
  watchPositionAsync: jest.fn()
}));

test('renders the app correctly', async () => {

    const { debug, getByTestId, getByText } = render(<App />);
    
    const newGameButton = getByText('New Game');
    expect(getByText('Welcome to Rocket Duel')).toBeTruthy();
    expect(newGameButton).toBeTruthy();
    
    const { result } = renderHook(() => usePlayer())
    await act(async() => {
      await fireEvent(newGameButton, 'press');
    })
    await expect(getByText('Launcher goes here')).toBeTruthy();
    // TODO: Testing for location is hard because the implementation in expo-location
    // expects a callback function, so I can't mock it to the state through the react hook.
    // skipping for now.
    // await expect(getByTestId('playerLatitude')).toBe(1);
    // debug();
});
