import 'react-native';
import * as turf from '@turf/turf';
import {
  BLAST_RADIUS,
  MAX_DISTANCE,
  MIN_DISTANCE,
  MAX_MORTAR_ELEVATION,
  MIN_MORTAR_ELEVATION,
  MAX_THRUST,
  MIN_THRUST,
  calculateDamage,
  calculateImpact, 
  convertThrust, 
  getImpactCoords, 
  getImpactProximity, 
  getShotDistance, 
  getShotDuration, 
  getTrajectory
} from '../lib/gameMechanics';

test('calculates minimum and maximum shot distance given game parameters', () => {
  expect(Math.round(getShotDistance(convertThrust(0), MAX_MORTAR_ELEVATION))).toBe(MIN_DISTANCE);
  expect(Math.round(getShotDistance(+convertThrust(100).toFixed(5), MIN_MORTAR_ELEVATION))).toBe(MAX_DISTANCE);
});

test('correctly converts thrusts', () => {
  expect(convertThrust(0)).toBe(MIN_THRUST);
  expect(+convertThrust(50).toFixed(5)).toBe(157.20079);
  expect(convertThrust(100)).toBe(MAX_THRUST);
});

test('calculates shot duration', () => {
  expect(+getShotDuration(convertThrust(100), MIN_MORTAR_ELEVATION).toFixed(1)).toBe(34.8);
});

test('calculates shot distance', () => {
  expect(+getShotDistance(convertThrust(100), MIN_MORTAR_ELEVATION).toFixed(5)).toBe(5934.90769);
});

test('gets impact coordinates', () => {
  const azimuth = 270;
  const originCoords = [40.21034, -80.604];
  const projectedCoords = [39.99000, -80.60393];
  const impactCoords = getImpactCoords({ originCoords: originCoords, distance: 4000, azimuth: azimuth });
  expect(+impactCoords[0].toFixed(5)).toStrictEqual(projectedCoords[0]);
  expect(+impactCoords[1].toFixed(5)).toStrictEqual(projectedCoords[1]);
  // check they also match original bearing
  expect(Math.round(turf.bearingToAzimuth(turf.bearing(originCoords, impactCoords)))).toBe(azimuth);
});

test('gets impact proximity', () => {
  const originCoords = [40.21034, -80.604];
  const destinationCoords = [40.28479, -80.61898];
  const proximity = getImpactProximity(originCoords, destinationCoords)
  expect(Math.round(proximity)).toBe(2144);
});

test('calculates trajectory', () => {
  const { distance, time } = getTrajectory({ velocity: 157.20079, elevation: 45 })
  expect(+distance.toFixed(5)).toBe(2519.93172);
  expect(+time.toFixed(5)).toBe(22.66987);
});

test('records a hit', () => {
  const params = {
    azimuth: 141,
    elevation: 60,
    velocity: convertThrust(70),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.3221, -80.6263],
  }
  const { proximity } = calculateImpact(params);
  expect(+proximity.toFixed(5)).toBeLessThanOrEqual(BLAST_RADIUS);
});

test('records a miss', () => {
  const params = {
    azimuth: 254,
    elevation: 73,
    velocity: convertThrust(50),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.17114, -80.59609],
  }
  const { proximity } = calculateImpact(params);
  expect(+proximity.toFixed(5)).toBeGreaterThanOrEqual(BLAST_RADIUS);
});

test('calculates damage', () => {
  expect(calculateDamage(8)).toBe(681);
  expect(calculateDamage(35)).toBe(100);
  expect(calculateDamage(100)).toBe(1);
  expect(calculateDamage(103)).toBe(0);
})
