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

const World = (props) => {

  const meshRef = useRef();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [panoramaTex, setPanoramaTex] = useState(new THREE.Texture());
  useEffect(() => {

    const loadAssets = async () => {

      const tex = new TextureLoader().load(require('../../assets/backgrounds/cyl.jpg'));
      
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

export default World;