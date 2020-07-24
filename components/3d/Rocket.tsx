import React, { useRef } from 'react';
import * as THREE from 'three';
import LaunchedRocket from './LaunchedRocket';
import StaticRocket from './StaticRocket';

const Rocket = (props) => {
  const { angle, data, id, mesh, position } = props;
  const { isInFlight } = data;

  return <StaticRocket id={id} data={data} mesh={mesh} angle={angle} position={[0, 1.45, 0]}/>
};

export default Rocket;