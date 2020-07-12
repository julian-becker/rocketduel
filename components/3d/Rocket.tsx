import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader, loadAsync } from 'expo-three';
import { TweenLite } from 'gsap';

const Rocket = (props) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [mesh, setMesh] = useState(new THREE.Mesh());
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
      setMesh(obj);

      setAssetsLoaded(true);
    };
    loadAssets();
  }, []);
  const { angle, visible } = props;
  
  // mimic player device angle while in hand
  useEffect (() => {
    TweenLite.to(mesh.rotation, 1/30, {
      x: THREE.MathUtils.degToRad(angle - 90)
    })
  }, [angle]);

  return assetsLoaded && visible ? (
    <primitive
      {...props}
      object={mesh}
      />
  ) : null
};

export default Rocket;