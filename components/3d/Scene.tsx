import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { useCannon } from '../../hooks/useCannon';
import World from './World';
import Rocket from './Rocket';
import StaticRocket from './StaticRocket';
import LaunchedRocket from './LaunchedRocket';
import Camera from './Camera';

const Surroundings = (props) => {
  const { tex } = props;

  const ref = useRef();

  return (
    <mesh
      {...props}
      ref={ref}
      position={[0,300,0]}
      rotation={[0,-Math.PI/2,0]}
      >
      <cylinderGeometry attach="geometry" args={[1200, 1200, 600, 128, 1, true]} />
      <meshStandardMaterial attach="material" map={tex} side={THREE.BackSide} />
    </mesh>
  )
}

const Plane = ({ position, color }) => {
  // Register plane as a physics body with zero mass
  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Plane());
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[5000, 5000]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  )
}

const Box = (props) => {
  // Register box as a physics body with mass
  const ref = useCannon({ mass: 100000 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...props.position)
  })
  return (
    <mesh {...props} ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  )
}

const Scene = (props) => {
  const { player, projectiles, assets } = props;
  const { rocket, world } = assets;
  const mesh = useMemo(() => rocket.mesh, [])
  const { clip } = projectiles;
  const launchedRockets = clip.filter((_) => _.isInFlight);
  const unlaunchedRockets = clip.filter((_) => !_.isInFlight);
  const { azimuth, elevation } = player;


  const renderLaunchedRocket = (_) => {
    //<Box key={_.id} id={_.id} position={[36, 4, -8]} />
    
    return (
      <LaunchedRocket key={_.id} id={_.id} data={_} mesh={mesh} azimuth={azimuth} position={[-0.19, 0.9, -2.3]} />
    )
  };

  const renderUnlaunchedRocket = (_) => {
    // <Rocket key={_.id} id={_.id} data={_} mesh={mesh} angle={elevation} position={[-0.05, -0.4, -1.8]} />
    return (
      <StaticRocket key={_.id} id={_.id} data={_} mesh={mesh} angle={elevation} position={[-0.05, -0.4, -1.8]} />
    )
  };

  const renderRocket = (_) => {
    return (
      <Rocket key={_.id} id={_.id} data={_} mesh={mesh} angle={elevation} />
    )
  };

  return (
    <>
        <Plane position={[0, 0, 0]} color={'#004f2d'}/>
        <Camera azimuth={azimuth} position={[0, 1.7, 0]}/>
        {clip.map((_) => renderRocket(_))}
        <Surroundings tex={world.tex}/>
    </>
  )
};

export default Scene;