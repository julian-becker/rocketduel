import 'react-native';
import * as turf from '@turf/turf';
import {
  BLAST_RADIUS,
  IMPACT_RADIUS,
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
import { generateImpact } from '../actions/impact';

test('correctly converts thrusts', () => {
  expect(convertThrust(0)).toBe(MIN_THRUST);
  expect(+convertThrust(50).toFixed(5)).toBe(95);
  expect(convertThrust(100)).toBe(MAX_THRUST);
});

test('calculates shot duration', () => {
  expect(+getShotDuration(convertThrust(100), MIN_MORTAR_ELEVATION).toFixed(1)).toBe(8.4);
});

test('calculates shot distance', () => {
  expect(+getShotDistance(convertThrust(100), MIN_MORTAR_ELEVATION).toFixed(5)).toBe(943.86376);
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
  const origin = {
    coords: [40.21034, -80.604]
  };
  const projectile = {
    azimuth: 141,
    elevation: 60,
    thrust: convertThrust(70),
    height: 0,
  }
  const targetCoords = [40.24332, -80.61072];
  const impact = generateImpact({origin: origin, projectile: projectile});
  const proximity = getImpactProximity(impact.impactCoords, targetCoords);
  expect(+proximity.toFixed(5)).toBeLessThanOrEqual(BLAST_RADIUS);
});

test('records a miss', () => {
  const origin = {
    coords: [40.21034, -80.604]
  };
  const projectile = {
    azimuth: 254,
    elevation: 73,
    thrust: convertThrust(50),
    height: 0,
  }
  const targetCoords = [40.21712, -80.59608];
  const impact = generateImpact({origin: origin, projectile: projectile});
  const proximity = getImpactProximity(impact.impactCoords, targetCoords);
  expect(+proximity.toFixed(5)).toBeGreaterThanOrEqual(BLAST_RADIUS);
});

test('records maximum flight duration', () => {
  const params = {
    azimuth: 254,
    elevation: MAX_MORTAR_ELEVATION,
    velocity: convertThrust(100),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.17114, -80.59609],
  }
  const { time } = calculateImpact(params);
  expect(+time.toFixed(5)).toBe(21.88542);
});

test('records minimum flight duration', () => {
  const params = {
    azimuth: 254,
    elevation: MIN_MORTAR_ELEVATION,
    velocity: convertThrust(0),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.17114, -80.59609],
  }
  const { time } = calculateImpact(params);
  expect(+time.toFixed(5)).toBe(4.80122);
});

test('records maximum flight distance', () => {
  const params = {
    azimuth: 254,
    elevation: 45,
    velocity: convertThrust(100),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.17114, -80.59609],
  }
  const { distance } = calculateImpact(params);
  expect(+distance.toFixed(5)).toBe(1099.47213);
});

test('records minimum flight distance', () => {
  const params = {
    azimuth: 254,
    elevation: MAX_MORTAR_ELEVATION,
    velocity: convertThrust(0),
    height: 0,
    originCoords: [40.21034, -80.604],
    targetCoords: [40.17114, -80.59609],
  }
  const { distance } = calculateImpact(params);
  expect(+distance.toFixed(5)).toBeGreaterThanOrEqual(152.73398);
});

test('calculates damage', () => {
  console.log(`Damage at 5m: ${calculateDamage(5)}`);
  console.log(`Damage at kill radius: ${calculateDamage(BLAST_RADIUS)}`);
  console.log(`Damage at halfway between kill & impact: ${calculateDamage((BLAST_RADIUS + IMPACT_RADIUS) / 2)}`);
  console.log(`Damage at impact radius: ${calculateDamage(IMPACT_RADIUS)}`);
  console.log(`Damage at impact radius + 1m: ${calculateDamage(IMPACT_RADIUS + 1)}`);
  expect(calculateDamage(8)).toBe(425);
  expect(calculateDamage(BLAST_RADIUS)).toBe(100);
  expect(calculateDamage((BLAST_RADIUS + IMPACT_RADIUS) / 2)).toBe(10);
  expect(calculateDamage(IMPACT_RADIUS + 1)).toBe(0);
})
