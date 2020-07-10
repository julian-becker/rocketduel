import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader, loadAsync } from 'expo-three';
import { TweenLite } from 'gsap';

const Rocket = (props) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [rocket, setRocket] = useState(new THREE.Mesh());

  const angle = props.angle;
  const visible = props.visible;

  useEffect(() => {

    const loadAssets = async () => {

      const model = {
        'rocket.obj': require('../../assets/3d/rocket.obj'),
        'rocket.mtl': require('../../assets/3d/rocket.mtl'),
        'body.jpg': require('../../assets/3d/body.jpg')
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
  
  // mimic player device angle while in hand
  useEffect (() => {
    TweenLite.to(rocket.rotation, 1/30, {
      x: THREE.MathUtils.degToRad(angle - 90)
    })
  }, [angle]);

  return assetsLoaded ? 
    <primitive
      {...props}
      ref={props.setRef}
      visible={visible}
      object={rocket}
      />
  : null
};

export default Rocket;