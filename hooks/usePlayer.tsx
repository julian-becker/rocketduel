import { useState, useEffect, useReducer } from 'react';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';

import * as Location from 'expo-location';

const usePlayer = () => {
  const DEFAULT_STATE = {
    location: {
      coords: [0, 0], // use geoJSON-style coordinates
      altitude: 0,
      accuracy: 0,
      speed: 0,
      heading: 0 // Azimuth direction 0-360 deg)
    },
    bearing: 0, // obtain from compass - compare with location.heading ?
    angle: 0 // obtain from gyroscope - 0 (horizontal) to 90 (vertical)
  }
  const [player, setPlayer] = useState(DEFAULT_STATE);
  // initialize the projectile as well
  const [projectile, dispatch] = useReducer(projectileReducer,initialProjectileState);
  const getPlayer = async () => {   
    // can only set timeInterval or distanceInterval - not both
    // https://github.com/expo/expo/issues/2682
    await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 10
    }, (loc) => {
      const { latitude, longitude, altitude, accuracy, speed, heading } = loc.coords;
      const mappedLocation = {
        "accuracy": accuracy, 
        "altitude": altitude,
        "coords": [latitude, longitude],
        "heading": heading,
        "speed": speed
      }
      setPlayer({location: {...player.location, ...mappedLocation}});
      dispatch({type: 'UPDATE_LOCATION', location: mappedLocation});
    })
  };

  useEffect(() => {
      getPlayer();
  }, []);

  return player;
};

export default usePlayer;