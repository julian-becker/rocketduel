import React, { useRef } from 'react';
import * as THREE from 'three';

const World = (props) => {

  const { tex } = props;

  const ref = useRef();

  return (
    <mesh
      {...props}
      ref={ref}
      position={[0,0,0]}
      >
      <cylinderGeometry attach="geometry" args={[1200, 1200, 1119, 128, 1, true]} />
      <meshStandardMaterial attach="material" map={tex} side={THREE.BackSide} />
    </mesh>
  )
};

export default World;