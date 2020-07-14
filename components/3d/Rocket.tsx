import React, { useRef } from 'react';
import * as THREE from 'three';

const Rocket = (props) => {
  const { angle, data, id, mesh } = props;
  const clonedMesh = mesh.clone();
  const ref = useRef();

  const isRocketVisible = (data) => { 
    return data.isInFlight || data.isLoaded;
  };

  return (
    <primitive
      {...props}
      ref={ref}
      rotation-x={THREE.MathUtils.degToRad(angle - 90)}
      visible={isRocketVisible(data)}
      object={clonedMesh}
      />
  )
};

export default Rocket;