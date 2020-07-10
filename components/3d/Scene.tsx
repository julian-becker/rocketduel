import React, { useRef } from 'react';
import { useThree } from 'react-three-fiber';
import World from './World';
import Camera from './Camera';
import Rocket from './Rocket';

const Scene = (props) => {

  const { azimuth, elevation } = props.player;
  const { isInFlight } = props.projectile;
  // set up refs
  const rocketRef = useRef();

  return (
    <>
      <World />
      <Camera azimuth={azimuth} position={[0, 1.5, -1]} >
        <Rocket setRef={rocketRef} visible={!isInFlight} angle={elevation} projectile={props.projectile} position={[-0.05,-0.27,-1]} />
      </Camera>
    </>
  )
};

export default Scene;