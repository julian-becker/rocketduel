import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber'

const Camera = (props) => {
  const ref = useRef();
  const { azimuth } = props;
  const { setDefaultCamera } = useThree();

  // Make the camera known to the system
  useEffect(() => {
    setDefaultCamera(ref.current);
  }, []);

  // rotate it as needed
  useEffect(() => {
    ref.current.position.y = 1.7;
    ref.current.position.x = Math.cos( azimuth );  
    ref.current.position.z = Math.sin( azimuth );
    ref.current.lookAt(0, 1.7, 0)
  }, [azimuth]);

  return (
    <perspectiveCamera
    ref={ref}
    name={'camera'}
    fov={50}
    near={0.01} 
    far={4800}
    {...props} />
  )
}

export default Camera;