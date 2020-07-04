import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateImpact, convertThrust } from '../lib/gameMechanics';
import Crater from '../components/Crater';
import Crater1 from '../assets/impacts/crater_1.svg';
import Crater2 from '../assets/impacts/crater_2.svg';
import Crater3 from '../assets/impacts/crater_3.svg';
import Crater4 from '../assets/impacts/crater_4.svg';
import Crater5 from '../assets/impacts/crater_5.svg';

const generateImpact = ({origin, projectile }) => {
  const { thrust, elevation, azimuth } = projectile;
  const impact = calculateImpact({
    originCoords: origin.coords,
    velocity: convertThrust(Number(thrust)),
    elevation: Number(elevation),
    azimuth: azimuth,
    height: Number(origin.altitude)
  });
  const id = uuidv4();
  const mapComponent = pickMapComponent();
  return {
    id: id,
    mapComponent: mapComponent,
    ...impact
  };
}

const pickMapComponent = () => {
  const craters = [
    Crater1,
    Crater2,
    Crater3,
    Crater4,
    Crater5
  ];
  
  // use a random crater
  const craterIcon = craters[Math.floor(Math.random() * craters.length)];
  return (craterIcon);
}

export { generateImpact };