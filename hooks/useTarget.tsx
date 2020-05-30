import { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import { INITIAL_HEALTH, MAX_DISTANCE, MIN_DISTANCE, MAX_MORTAR_ELEVATION, MIN_MORTAR_ELEVATION, azimuthToBearing, convertThrust, getRandomInt } from '../lib/gameMechanics';


const useTarget = (coords) => {
    const [target, setTarget] = useState({
        coords: coords,
        azimuth: 0,
        distance: 0,
        altitude: 0,
        health: INITIAL_HEALTH
    });

    const getTarget = () => {    
        const distance = getRandomInt(MIN_DISTANCE, MAX_DISTANCE);
        const azimuth = getRandomInt(0, 360);
        const origin = turf.point(coords);
        // turf expects bearing in range ( -180, 180 )
        const targetLocation = turf.destination(origin, distance, azimuthToBearing(azimuth), {units: 'meters'});
        const targetCoords = targetLocation.geometry && targetLocation.geometry.coordinates;
        
        // QA - check distance between origin and target coords
        const targetDistance = turf.distance(origin, turf.point(targetCoords), {units: 'meters'});
        // console.log(targetDistance)
        
        // return the calculated data on the target. 
        const output = {...target, distance: Math.round(distance), azimuth: azimuth, coords: targetCoords}
        setTarget({...target, ...output});
    };

    useEffect(() => {
        getTarget();
    }, []);

    return target;
}   

export { convertThrust, useTarget };