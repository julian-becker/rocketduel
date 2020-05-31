import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    isLocated: false,
    location: {
      coords: [0, 0], // use geoJSON-style coordinates
      altitude: 0,
      accuracy: 0,
      speed: 0,
      heading: 0 // Azimuth direction 0-360 deg)
    },
    bearing: 0, // obtain from compass - compare with location.heading ?
    angle: 0 // obtain from gyroscope - 0 (horizontal) to 90 (vertical)
  });

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
          "coords": [latitude, longitude],
          "heading": heading,
          "speed": speed
        }
        setPlayer({
          ...player,  
          location: { ...player.location, ...mappedLocation },
          isLocated: true
        });
      })
      return () =>  watchFunction.remove();
    }
    getLocation();
  }, []);
  return player;
};

export default usePlayer;