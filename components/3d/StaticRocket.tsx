import React, { useRef } from 'react';

const StaticRocket = (props) => {
  const { data, mesh } = props;
  const { isLoaded } = data;
  const clonedMesh = mesh.clone();
  const ref = useRef();

  const isRocketVisible = (data) => { 
    return data.isInFlight || data.isLoaded;
  };

  return (
    <primitive
      {...props}
      ref={ref}
      visible={isLoaded}
      object={clonedMesh}
      />
  )
};
// rotation-x={THREE.MathUtils.degToRad(angle - 90)}
export default StaticRocket;