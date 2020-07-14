import React from 'react';
import World from './World';
import Rocket from './Rocket';
import Camera from './Camera';

const Scene = (props) => {
  const { player, projectiles, assets } = props;
  const { rocket, world } = assets
  const { clip } = projectiles;
  const { azimuth, elevation } = player;


  const renderRocket = (_, i) => {
    return (
      <Rocket key={_.id} id={_.id} data={_} mesh={rocket.mesh} angle={elevation} position={[-0.05, -0.4, -1.8]} />
    )
  };

  return (
    <>
      <World tex={world.tex}/>
      <Camera azimuth={azimuth} position={[0, 1.5, -1]}>
      
        {clip.map((_, i) => renderRocket(_, i))} 
      </Camera>
        
    </>
  )
};

export default Scene;