import { useState, useEffect } from 'react';
import { point, destination, bearingToAzimuth } from '@turf/turf';

// don't place targets outside this distance from the player
const MIN_DISTANCE = 91;
const MAX_DISTANCE = 5935;
const INITIAL_HEALTH = 100;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

const useTarget = (coords) => {
    const [target, setTarget] = useState({
        coords: coords,
        bearing: 0,
        distance: 0,
        altitude: 0,
        health: INITIAL_HEALTH
    });

    const getTarget = () => {    
        const distance = getRandomInt(MIN_DISTANCE, MAX_DISTANCE) / 1000; // turf expects km
        const bearing = getRandomInt(-180, 180);
        const origin = point(coords);
        const targetLocation = destination(origin, distance, bearing, {units: 'kilometers'});
        const coordinates = targetLocation.geometry && targetLocation.geometry.coordinates;
        // return the calculated data on the target. 
        // convert kilometers back to meters, and convert bearing to azimuth directions users are more familiar with
        const output = {...target, distance: distance * 1000, bearing: bearingToAzimuth(bearing), coords: coordinates}
        setTarget({...target, ...output});
    };

    useEffect(() => {
        getTarget();
    }, []);

    return target;
}   

export default useTarget;