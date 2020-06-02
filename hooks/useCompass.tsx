import { useEffect, useReducer } from 'react';
import { isEmulatorSync } from 'react-native-device-info';
import CompassHeading from 'react-native-compass-heading';
import { DEFAULT_STATE, playerReducer } from './usePlayer';

const useCompass = (dispatch: Function) => {

  if(!isEmulatorSync()) {
    useEffect(() => {
      const getAzimuth = () => {
        const degree_update_rate = 3;
  
        CompassHeading.start(degree_update_rate, degree => {
          dispatch({type: 'UPDATE_AZIMUTH', value: Math.round(degree)});
        });
  
        return () => {
          CompassHeading.stop();
        };
      }
      getAzimuth();
    }, []);
  }
};

export default useCompass;