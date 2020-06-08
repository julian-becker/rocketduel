import { useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = (dispatch: Function) => {

  useEffect(() => {
    const getLocation = async () => {
      const watchFunction = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 10
      }, (loc) => {
        const { latitude, longitude, altitude, accuracy, speed, heading } = loc.coords;
        const mappedLocation = {
          "accuracy": accuracy, 
          "altitude": altitude,
          "coords": [longitude, latitude],
          "heading": heading,
          "speed": speed
        }
        dispatch({type: 'UPDATE_LOCATION', value: mappedLocation});
      })
      return () =>  watchFunction.remove();
    }
    getLocation();
  }, []);

};

export default useLocation;