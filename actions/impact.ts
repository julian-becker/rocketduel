import { calculateImpact, convertThrust } from '../lib/gameMechanics';

const generateImpact = ({origin, projectile }) => {
  const { thrust, elevation, azimuth } = projectile;
  const impact = calculateImpact({
    originCoords: origin.coords,
    velocity: convertThrust(Number(thrust)),
    elevation: Number(elevation),
    azimuth: azimuth,
    height: Number(origin.altitude)
  });
  return impact;
}

export { generateImpact };