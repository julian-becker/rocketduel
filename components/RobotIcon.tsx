import React from 'react';
import Robot from '../assets/robots/redbot.svg';
const RobotIcon = (props) => {

  const height = props.height || 24;
  const RATIO = 2 / 3; // robot design scale, width / height
  return ( 
    <Robot height={height} width={height * RATIO} />
  )
};

export default RobotIcon;