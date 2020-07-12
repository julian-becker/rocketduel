import React, { useEffect, useRef, useState } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { TextureLoader, loadAsync } from 'expo-three';
import World from './World';
import Camera from './Camera';
import Rocket from './Rocket';

const Scene = (props) => {
  const { player, projectiles } = props;
  const { azimuth, elevation } = player;

  const isRocketVisible = (rocket) => { 
    return rocket.isInFlight || rocket.isLoaded;
  };

  const renderRocket = (rocket) => {
    // set up ref
    const rocketRef = useRef();
    return <Rocket setRef={rocketRef} key={rocket.id} id={rocket.id} visible={isRocketVisible(rocket)} angle={elevation} position={[-0.05,-0.27,-1]} />
  };

  return (
    <>
      <World />
      <Camera azimuth={azimuth} position={[0, 1.5, -1]} >
        {projectiles.clip.map(rocket => renderRocket(rocket))}
      </Camera>
    </>
  )
};

export default Scene;