import React from 'react';

import Bluebot from '../../assets/robots/bluebot.svg';
import Pinkbot from '../../assets/robots/pinkbot.svg';
import Purplebot from '../../assets/robots/purplebot.svg';
import Redbot from '../../assets/robots/redbot.svg';
import Silverbot from '../../assets/robots/silverbot.svg';
import Yellowbot from '../../assets/robots/yellowbot.svg';

const RobotIcon = (props) => {

  const height = props.height || 24;
  const robotType = props.type || 'red'
  switch (robotType) {
    case 'blue':
      return <Bluebot height={height} />;
    case 'pink':
      return <Pinkbot height={height} />;
    case 'purple':
      return <Purplebot height={height} />;
    case 'red':
      return <Redbot height={height} />;
    case 'silver':
      return <Silverbot height={height} />;
    case 'yellow':
      return <Yellowbot height={height} />;
    default:
      return <Redbot height={height} />;
  }
};

export default RobotIcon;