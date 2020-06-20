import React, { useContext, useState }  from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { PanoramaView } from '@lightbase/react-native-panorama-view';
import { Asset } from 'expo-asset';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { calculateOffset, calculateXPos } from '../lib/helpers';
import TopHalf from '../components/TopHalf';
import BottomHalf from '../components/BottomHalf';
import RobotIcon from './RobotIcon';

const backgroundImage = Asset.fromModule(require('../assets/backgrounds/seamless-panoramic.jpg'));
const imageWidth = backgroundImage.width;
const robotYPos = backgroundImage.height / 2;

const GameBackground = () => {
  const [offset, setOffset] = useState(0);

  const { player } = useContext(PlayerContext);
  const { azimuth } = player;
  const { target } = useContext(TargetContext);
  const onBackgroundLoaded = () => {
    const initialOffset = azimuth;
    setOffset(initialOffset);

  }
  // player pixel orientation: (adjusted player azimuth / 360) * imageWidth;
  // target is (target azimuth / 360) * imageWidth
  // x position is negative when the target is to the left of the player, positive to the right
  // targetPos = playerPos ?
  const currentPlayerOffset = calculateOffset(imageWidth, offset, azimuth);
  const currentTargetOffset = calculateOffset(imageWidth, offset, target.azimuth);
  const rawXPos = calculateXPos(imageWidth, currentPlayerOffset, currentTargetOffset);
  const viewOffset = Dimensions.get("window").width / 2;
  const adjustedXPos = rawXPos + viewOffset;
 
  return (
    <PanoramaView
      style={styles.panorama}
      dimensions={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width }}
      inputType="mono"
      enableTouchTracking={false}
      onImageLoaded={onBackgroundLoaded}
      imageUrl={backgroundImage.uri}>
        { /* robots go here */ }
        <View style={{position: 'absolute', top: robotYPos, right: adjustedXPos }}>
          <RobotIcon />
        </View>
        <TopHalf />
        <BottomHalf />
    </PanoramaView>
  );
}


const styles = StyleSheet.create({
  panorama: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default GameBackground;
