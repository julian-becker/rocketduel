// 3D environment to hold the Game universe
import React, { useContext, useEffect, useState, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Canvas } from 'react-three-fiber';
import { PhysicsProvider } from '../hooks/useCannon';
import { useCannon } from '../hooks/useCannon';
import { gsap } from 'gsap';
import { TextureLoader, loadAsync } from 'expo-three';
import { PhysicsBodyWireframes } from './3d/debug';
import Scene from './3d/Scene';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';

global.THREE = global.THREE || THREE;

gsap.config({
  force3D: true
})

const GameWorld = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [assets, setAssets] = useState(
    {
      rocket: {
        mesh: new THREE.Mesh()
      },
      world: {
        tex: new THREE.Texture()
      }
    }
  );
  useEffect(() => {

    const loadAssets = async () => {

      // load rocket mesh
      const model = {
        'rocket.obj': require('../assets/3d/rocket.obj'),
        'rocket.mtl': require('../assets/3d/rocket.mtl'),
        'body.jpg': require('../assets/3d/body.jpg')
      }
      const tex = new TextureLoader().load(model['body.jpg']);
      const obj = await loadAsync(
        [
          model['rocket.obj'],
          model['rocket.mtl']
        ],
        null,
        name => model[name]
      );
      obj.children.forEach((child) => {
        if ( child.isMesh ) {
          child.material = new THREE.MeshPhongMaterial({
            map: tex
          });
        }
      });
      obj.scale.normalize().multiplyScalar(0.0015);

      // load world texture
      const worldTex = new TextureLoader().load(require('../assets/backgrounds/cyl.jpg'));
      setAssets({
        rocket: {
          mesh: obj
        },
        world: {
          tex: worldTex
        }
      });

      setAssetsLoaded(true);
    };
    loadAssets();
  }, []);

  const { game } = useContext(GameContext);
  const { player } = game;

  const { projectiles } = useContext(ProjectileContext);

  const { clip } = projectiles;

  return assetsLoaded ? (
    <Canvas>
      <ambientLight />
      <Suspense fallback={<ActivityIndicator />}>
        <PhysicsProvider>
          <Scene player={player} projectiles={projectiles} assets={assets}/>
        </PhysicsProvider>
      </Suspense>
    </Canvas>
  ) : <ActivityIndicator />

}

export default GameWorld;