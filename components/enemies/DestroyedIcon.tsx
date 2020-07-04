import React from 'react';

import Bluebot from '../../assets/robots/destroyed/bluebot.svg';
import Pinkbot from '../../assets/robots/destroyed/pinkbot.svg';
import Purplebot from '../../assets/robots/destroyed/purplebot.svg';
import Redbot from '../../assets/robots/destroyed/redbot.svg';
import Silverbot from '../../assets/robots/destroyed/silverbot.svg';
import Yellowbot from '../../assets/robots/destroyed/yellowbot.svg';

const DestroyedIcon = (props) => {

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

export default DestroyedIcon;