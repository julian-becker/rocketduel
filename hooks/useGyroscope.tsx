import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

const useGyroscope = (dispatch: Function) => {

  useEffect(() => {
    const getGyroscope = async () => {
      const isGyroscopeAvailable = await Accelerometer.isAvailableAsync();
      if (isGyroscopeAvailable) {
        Accelerometer.setUpdateInterval(200);
        const _subscription = Accelerometer.addListener(data => {
          // data in the form of { x, y, z } - We only care about y
          const { y } = data;
          // when y is -1 that corresponds to a 90 degree elevation
          // when y is 0, that's 0 elevation.
          // fwiw, y of 1 is when the phone is facing directly down
          const elevation = - 180 * (y / 2);
          dispatch({type: 'UPDATE_ELEVATION', value: Math.round(elevation)});
        });
      }
      return () => Accelerometer.removeAllListeners();
    }
    getGyroscope();
  }, []);
};

export default useGyroscope;