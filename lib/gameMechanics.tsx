import * as turf from '@turf/turf';
import calculateTrajectory from 'projectile-trajectory';
// constants
const GRAVITY = 9.80665; // m/s^2
// TODO: calculate this from atmospheric data
// https://www.omnicalculator.com/physics/air-density#air-density-definition-what-is-the-density-of-air-formula
const AIR_DENSITY = 1.225; // kg/m^3 TODO: This can be obtained from APIs

// game ranges
// don't place targets outside this distance from the player
// these should also be the maximum and minimum firing distances
const MIN_DISTANCE = 91;
const MAX_DISTANCE = 5935;

const MIN_MORTAR_ELEVATION = 45; // don't allow the mortar to fire if held lower than this
const MAX_MORTAR_ELEVATION = 85.2; // don't let the player shoot themselves

// Reported in meters (https://docs.expo.io/versions/latest/sdk/location/#location
// if GPS accuracy is above this, the game isn't playable
const MIN_GPS_ACCURACY = 35; 

// thrust is represented in the game as a slider between 1 and 100 but we need
// real values in meters/second to match the physics. These are the thrust values needed
// to only go min distance if elevation is MAX_MORTAR_ELEVATION, and go max distance if
// elevation is MIN_MORTAR_ELEVATION
const MIN_THRUST = 73.15158;
const MAX_THRUST = 241.25;

// data on projectiles; arbitrary, to balance gameplay
const BLAST_RADIUS = 35; // meters
const IMPACT_RADIUS = 150; // beyond this, targets should take no damage
const DAMAGE_SCALE_FACTOR = 24.95; // designed to set BLAST_RADIUS as kill

const microMissile = {
  radius: 0.02, // in meters
  mass: 0.77, // in kg
  dragCoefficient: 0.295
}

// settings for enemies
const INITIAL_HEALTH = 100;

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

const toMeters = (km: number) => {
  return km * 1000;
}

const toKm = (meters: number) => {
  return meters / 1000;
}

const trigToDegrees = (func: Function, angle: number) => {
  return func(angle * Math.PI / 180);
}
// not part of turfjs for some reason
const azimuthToBearing = (azimuth: number) => {
  return azimuth < 0 ? 360 + azimuth : azimuth;
}
// convert thrust in percentage to meters used in the constants
const convertThrust = (thrust: number) => {
  return ( ((MAX_THRUST - MIN_THRUST) / 100) * thrust + MIN_THRUST);
}

// given origin coordinates, distance in meters, and a bearing in azimuth (0-360)
// return a coordinate pair representing the impact point
const getImpactCoords = (origin: Object) => {
  const { originCoords, distance, azimuth } = origin;
  const point = turf.point(originCoords);
  const bearing = azimuthToBearing(azimuth);
  const impactLocation = turf.destination(point, distance, bearing, {units: 'meters'});
  const impactCoords = impactLocation.geometry && impactLocation.geometry.coordinates;
  return impactCoords;
}

// given two coordinate pairs, return the distance in meters between them
const getImpactProximity = (targetCoords: Array<number>, impactCoords: Array<number>) => {
  const proximity = turf.distance(turf.point(targetCoords), turf.point(impactCoords), {units: 'meters'})
  return proximity;
}

const getShotDistance = (velocity: number, elevation: number) => {
  const distance = ( (velocity * velocity) * trigToDegrees(Math.sin, (2 * elevation) ) ) / GRAVITY;
  return ( distance ) ;
}

const getShotDuration = (velocity: number, elevation: number) => {
  const duration = 2 * velocity * trigToDegrees(Math.sin, elevation) / GRAVITY;
  return (duration);
}

const getTrajectory = (parameters: Object) => {
  // velocity in m/s. elevation in degrees, 0-90
  let { velocity, elevation } = parameters; // TODO: add height into equation
  const distance = getShotDistance(velocity, elevation);
  const time = getShotDuration(velocity, elevation);
  return ({distance: distance, time: time})
}

const calculateImpact = (parameters: Object) => {
  const { azimuth, originCoords, targetCoords, elevation, height, velocity } = parameters;
  // new library!  🎉
  const shotParams = {
    initialCoords: originCoords,
    thrust: velocity,
    azimuth: azimuth,
    elevation: elevation
  };
  const projectileParams = microMissile;
  const environmentParams = {
    // TODO: integrate weather API
  };
  
  const { finalCoords, distance, duration } = calculateTrajectory(shotParams, projectileParams, environmentParams);
  const proximity = getImpactProximity(finalCoords, targetCoords);
  return { distance: distance, impactCoords: finalCoords, proximity: proximity, time: duration };
}

const calculateDamage = (proximity: number) => {
  return Math.floor(Math.exp((IMPACT_RADIUS - proximity) / DAMAGE_SCALE_FACTOR));
}

export { BLAST_RADIUS, IMPACT_RADIUS, INITIAL_HEALTH, MAX_DISTANCE, MIN_DISTANCE, MIN_GPS_ACCURACY, MAX_MORTAR_ELEVATION, MIN_MORTAR_ELEVATION, MAX_THRUST, MIN_THRUST, azimuthToBearing, calculateDamage, calculateImpact, convertThrust, getImpactCoords, getImpactProximity, getRandomInt, getShotDistance, getShotDuration, getTrajectory }