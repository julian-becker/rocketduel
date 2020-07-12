// 3D environment to hold the Game universe
import React, { useContext, useEffect, useState, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { gsap } from 'gsap';
import Scene from './3d/Scene';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';

global.THREE = global.THREE || THREE;

gsap.config({
  force3D: true
})

const GameWorld = () => {

  const { game } = useContext(GameContext);
  const { player } = game;

  const { projectiles } = useContext(ProjectileContext);

  return (
    <Canvas>
      <ambientLight />
      <Suspense fallback={<ActivityIndicator />}>
        <Scene player={player} projectiles={projectiles} />
      </Suspense>
    </Canvas>
  )

}

export default GameWorld;