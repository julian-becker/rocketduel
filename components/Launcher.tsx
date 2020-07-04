import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync, utils } from 'expo-three';
import { TweenLite, gsap } from 'gsap';
import { convertThrust } from '../lib/gameMechanics';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';
import { trigToDegrees } from '../lib/gameMechanics';

global.THREE = global.THREE || THREE;

gsap.config({
  force3D: true
})

const Launcher = () => {
  let timeout;

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [rocket, setRocket] = useState(new THREE.Mesh());

  const scene = new THREE.Scene();
  useEffect(() => {

    const loadAssets = async () => {
      const model = {
        'rocket.obj': require('../assets/3d/rocket.obj'),
        'rocket.mtl': require('../assets/3d/rocket.mtl'),
        'body.jpg': require('../assets/3d/body.jpg')
      }
      const tex = new TextureLoader().load(model['body.jpg']);
      const mesh = await loadAsync(
        [
          model['rocket.obj'],
          model['rocket.mtl']
        ],
        null,
        name => model[name]
      );
      mesh.children.forEach((child) => {
        if ( child.isMesh ) {
          child.material = new THREE.MeshPhongMaterial({
            map: tex
          });
        }
      });
      utils.scaleLongestSideToSize(mesh, 3); // larger numbers -> bigger render
      setRocket(mesh);
      setAssetsLoaded(true);
    };
    loadAssets();
    // Clear the animation loop when the component unmounts
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const { game } = useContext(GameContext);
  const { player } = game;
  const { projectile } = useContext(ProjectileContext);
  const { azimuth, elevation, isInFlight, thrust } = projectile;

  /* projectile motion calculations
  // TODO: move these somewhere that makes more sense
  */
  if (isInFlight) {
    // move the rocket up and scale it a little bit
    // these will be somewhat arbitrary since all we want to do is show the player they
    // launched a rocket
 
    const speedAdjustment = 0.03; // the max we want it to move in any direction at full thrust
    const convertedThrust = convertThrust(thrust);
    const v_0_z = convertedThrust * trigToDegrees(Math.cos, elevation) * speedAdjustment;
    const v_0_y = convertedThrust * trigToDegrees(Math.sin, elevation) * speedAdjustment;
    TweenLite.to(rocket.position, 1/60, {
      y: `+= ${v_0_y}`,
      z: `-= ${v_0_z}`
    })
  } else {
    rocket.position.set(-0.5, -3, 0);
  }

  // show rocket at the same angle as the device rotation
  TweenLite.to(rocket.rotation, 1/60, {
    x: THREE.MathUtils.degToRad(player.elevation - 90)
  })

  const _onGLContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    const { drawingBufferWidth: width, drawingBufferHeight: height} = gl;
    renderer.setSize(width, height);
 
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    scene.add(rocket);

    const light = new THREE.AmbientLight(new THREE.Color(0xffffff), 1); //
    scene.add(light);

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  }

  return (
    assetsLoaded ? <GLView
      style={styles.glView}
      onContextCreate={_onGLContextCreate}
    /> : null
  )
}

const styles = StyleSheet.create({
  glView: {
    position: 'absolute',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 0,
    left: 0
  },
});

export default Launcher;