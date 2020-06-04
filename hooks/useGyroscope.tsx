import { useEffect } from 'react';
import { Platform } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { Accelerometer } from 'expo-sensors';

const useGyroscope = (dispatch: Function) => {

  useEffect(() => {
    const getGyroscope = async () => {
      const isGyroscopeAvailable = await Accelerometer.isAvailableAsync();
      if (isGyroscopeAvailable && !isEmulatorSync()) {
        Accelerometer.setUpdateInterval(1000);
        const _subscription = Accelerometer.addListener(data => {
          // iOS and Android report these values differently
          // iOS reports pitch as the y value, in degrees
          // when y is -1 that corresponds to a 90 degree elevation
          // when y is 0, that's 0 elevation.
          // fwiw, y of 1 is when the phone is facing directly down
          // Android makes you work for it. 

          // data in the form of { x, y, z }
          const { x, y, z } = data;

          const androidPitch = (Math.atan2(z, -y) * 180 / Math.PI) - 90; // convert to degrees
          const iOSPitch = - 180 * (y / 2);
          const elevation = Platform.OS === 'ios' ? iOSPitch : androidPitch ;
          dispatch({type: 'UPDATE_ELEVATION', value: Math.round(elevation)});
        });
      }
      return () => Accelerometer.removeAllListeners();
    }
    getGyroscope();
  }, []);
};

export default useGyroscope;