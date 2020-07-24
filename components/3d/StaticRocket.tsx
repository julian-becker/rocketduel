import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';

const StaticRocket = (props) => {
  const { data, mesh, angle, position } = props;
  const { isLoaded } = data;
  const clonedMesh = useMemo(() => mesh.clone(), []);
  const ref = useRef();

  const { scene } = useThree();
  
  let vec = new THREE.Vector3();

  useFrame(() => {
    const newCam = scene.getObjectByName('camera')
    let camDir = newCam.getWorldDirection(vec);
    const clampedAngle = THREE.MathUtils.clamp(angle, 0, 90);
    const yRotation = THREE.MathUtils.degToRad(clampedAngle)

    ref.current.lookAt(camDir.x, yRotation, camDir.z)
  })
  

  return (
    <primitive
      ref={ref}
      position={position}
      visible={isLoaded}
      object={clonedMesh}
      />
  )
};

export default StaticRocket;