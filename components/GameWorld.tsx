// 3D environment to hold the Game universe
import React, { useContext, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader, loadAsync, utils } from 'expo-three';
import { Asset } from 'expo-asset';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import { TweenLite, gsap } from 'gsap';
import { convertThrust } from '../lib/gameMechanics';
import { GameContext } from '../contexts/Game';
import { ProjectileContext } from '../contexts/Projectile';

global.THREE = global.THREE || THREE;

gsap.config({
  force3D: true
})

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
    far={1200}
    {...props} />
  )
}

const Rocket = (props) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [rocket, setRocket] = useState(new THREE.Mesh());
  const ref = useRef();

  const { elevation } = props;
  useEffect(() => {

    const loadAssets = async () => {

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
      obj.name = 'rocket';

      obj.scale.normalize().multiplyScalar(0.0008);
      obj.rotation.z = -0.08;
      setRocket(obj);

      setAssetsLoaded(true);
    };
    loadAssets();
  }, []);
  
  useEffect (() => {
    TweenLite.to(rocket.rotation, 1/30, {
      x: THREE.MathUtils.degToRad(elevation - 90)
    })
  }, [elevation]);

  return assetsLoaded ? 
    <primitive
      {...props}
      ref={ref}
      object={rocket}
      />
  : null
}

const World = (props) => {

  const meshRef = useRef();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [panoramaTex, setPanoramaTex] = useState(new THREE.Texture());
  useEffect(() => {

    const loadAssets = async () => {

      const tex = new TextureLoader().load(require('../assets/backgrounds/cyl.jpg'));
      
      setPanoramaTex(tex);
      setAssetsLoaded(true);
    };
    loadAssets();
  }, []);

  return assetsLoaded ? 
    <mesh
      {...props}
      ref={meshRef}
      position={[0,0,0]}
      >
      <cylinderGeometry attach="geometry" args={[1200, 1200, 1119, 128, 1, true]} />
      <meshStandardMaterial attach="material" map={panoramaTex} side={THREE.BackSide} />
    </mesh>
  : null
};

const GameWorld = () => {
  const { game } = useContext(GameContext);
  const { player } = game;
  const { azimuth, elevation } = player;
  return (
    <Canvas>
      <ambientLight />
      <Suspense fallback={<ActivityIndicator />}>
        <World />
        <Camera azimuth={azimuth} position={[0, 1.5, -1]} >
          <Rocket elevation={elevation} position={[-0.09,-0.27,-1]} />
        </Camera>
      </Suspense>
    </Canvas>
  )
  /*
  let timeout;

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [sceneMesh, setSceneMesh] = useState(new THREE.Mesh());
  const [rocket, setRocket] = useState(new THREE.Mesh());
  const { game } = useContext(GameContext);
  const { player } = game;
  const { azimuth } = player;
  const scene = new THREE.Scene();
  useEffect(() => {

    const loadAssets = async () => {

      const tex = new TextureLoader().load(require('../assets/backgrounds/cyl.jpg'));
      var geometry = new THREE.CylinderGeometry(1200, 1200, 1119, 64, 1, true);
      var materialInner = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.BackSide
      });
      var world = new THREE.Mesh(geometry, materialInner);
      setSceneMesh(world);
      // etRocket(mesh);
      setAssetsLoaded(true);
    };
    loadAssets();
    // Clear the animation loop when the component unmounts
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  
  useEffect(() => {

    const rotateCamera = () => {
      const camera = scene.getObjectByName(camera)
        console.log(camera?.rotation.y);
      
    };
    rotateCamera();

  }, [azimuth]);
  const _onGLContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    const { drawingBufferWidth: width, drawingBufferHeight: height} = gl;
    renderer.setSize(width, height);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.001, 1200);
    camera.rotation.order = 'YXZ';
    camera.position.set( 0, 1.5, 0 );
    
    scene.add(sceneMesh);
  
    const light = new THREE.AmbientLight(new THREE.Color(0xffffff), 1); //
    scene.add(light);
  
    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);

      //camera.rotation.y += 0.01;//THREE.MathUtils.degToRad(azimuth);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
    */
  }

export default GameWorld;