import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber'
import { TweenLite } from 'gsap';

const rotateCamera = (deg, camera) => {
  // TODO: There's examples on the web of using quaternions here for smoother rotation
  camera.rotation.y = THREE.MathUtils.degToRad(deg);
  camera.updateMatrixWorld();
}

const Camera = (props) => {
  const ref = useRef();
  const { azimuth } = props;
  const { scene, setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => {
    setDefaultCamera(ref.current);
    ref.current.rotation.order = 'YXZ';

    TweenLite.to(ref.current, 1/16, { onUpdate: rotateCamera(azimuth, ref.current) });
  }, [azimuth]);

  return (
    <perspectiveCamera
    ref={ref}
    fov={50}
    near={0.01} 
    far={5000}
    {...props} />
  )
}

export default Camera;