import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync, utils } from 'expo-three';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';
import { BodyText } from './styled/Text';
import ThrustSlider from '../components/ThrustSlider';
import FireButton from '../components/FireButton';
import { white } from './styled/Colors';

global.THREE = global.THREE || THREE;

window.performance.clearMeasures = ()=>{}
window.performance.clearMarks = ()=>{}
window.performance.measure = ()=>{}
window.performance.mark = ()=>{}

// left to right: Thrust, Launcher, Fire Button
const GameControls = () => {
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
      utils.scaleLongestSideToSize(mesh, 16); // larger numbers -> bigger render
      setRocket(mesh);
      setAssetsLoaded(true);
    };
    loadAssets();
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const { player } = useContext(PlayerContext);
  const { azimuth, elevation } = player;

  const { projectile } = useContext(ProjectileContext);
  const { thrust } = projectile;

  // show rocket at the same angle as the device rotation
  rocket.rotation.x = THREE.MathUtils.degToRad(elevation - 90);
  
  const _onGLContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    const { drawingBufferWidth: width, drawingBufferHeight: height} = gl;
    renderer.setSize(width, height);
 
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, 0, 24);
    // const scene = new THREE.Scene();
 
    camera.lookAt(scene.position);


    rocket.rotation.x = - Math.PI / 4; // x is towards/away, y is spin, z is clockwise
    scene.add(rocket);

    const light = new THREE.AmbientLight(new THREE.Color(0xffffff), 1); //
    scene.add(light);

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      rocket.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  }

  return (
    <View style={styles.wrap}>
      {/* thrust slider */}
      <View style={styles.thrustWrap}>
        <ThrustSlider />
      </View>
      {/* launcher */}
      <View style={styles.launcherWrap}>
      { assetsLoaded ? <GLView
        style={{ flex: 1 }}
        onContextCreate={_onGLContextCreate}
      /> : null }
      </View>
      {/* fire button */}
      <View style={styles.fireButtonWrap}>
        <FireButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thrustWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  launcherWrap: {
    flex: 2,
  },
  fireButtonWrap: {
    flex: 2,
    flexDirection: 'column',
    alignSelf: 'center'
  }
});

export default GameControls;