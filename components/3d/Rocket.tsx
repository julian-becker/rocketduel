import React, { useRef } from 'react';
import * as THREE from 'three';
import LaunchedRocket from './LaunchedRocket';
import StaticRocket from './StaticRocket';

const Rocket = (props) => {
  const { angle, data, id, mesh, position } = props;
  const { isInFlight } = data;
  const clonedMesh = mesh.clone();

  const ref = useRef();

  const xRot = THREE.MathUtils.degToRad(angle - 90)
  const rotation = [xRot, 0, -0.08] //give the rocket a slight angle

  return isInFlight ? <LaunchedRocket id={id} data={data} mesh={clonedMesh} rotation={rotation} position={position}/>
  : <StaticRocket id={id} data={data} mesh={clonedMesh} angle={angle} rotation={rotation} position={position}/>
};
// rotation-x={THREE.MathUtils.degToRad(angle - 90)}
export default Rocket;