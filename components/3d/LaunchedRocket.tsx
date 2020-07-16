import React from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { useCannon } from '../../hooks/useCannon';
import { useThree } from 'react-three-fiber';
import { MICRO_MISSILE, convertThrust } from '../../lib/gameMechanics';

const LaunchedRocket = (props) => {
  const { data, mesh, position } = props;
  const { isInFlight, elevation, thrust } = data;
  const clonedMesh = mesh.clone();
  const { mass, radius, dragCoefficient } = MICRO_MISSILE;

  const ref = useCannon({ 
    mass: mass
  }, body => {
    let payload = new CANNON.Sphere(radius);
    body.addShape(payload);
    body.position.set(...position)
    body.linearDamping = body.angularDamping = dragCoefficient

    let dt = 1/8;
    let yForce = convertThrust(thrust) * Math.sin(THREE.MathUtils.degToRad(elevation));
    let zForce = -convertThrust(thrust) * Math.cos(THREE.MathUtils.degToRad(elevation));
    let launchImpulse = new CANNON.Vec3(0,dt*yForce, dt*zForce);
    
    body.applyImpulse(launchImpulse, body.position);
    // apply a local force to make the rocket rotate in a more natural trajectory
    body.applyLocalForce(new CANNON.Vec3(0, -0.02, 0), body.position);
  });

  return (
    <primitive
      {...props}
      ref={ref}
      visible={isInFlight}
      object={clonedMesh}
      />
  )
};

export default LaunchedRocket;