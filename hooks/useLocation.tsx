import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        altitude: null,
        accuracy: null,
        speed: null,
        heading: null
    });

    const getLocation = async () => {    
        // can only set timeInterval or distanceInterval - not both
        // https://github.com/expo/expo/issues/2682
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 10
        }, (loc) => setLocation({...location, ...loc.coords}))
    };

    useEffect(() => {
        getLocation();
    }, []);

    return location;
};

export default useLocation;