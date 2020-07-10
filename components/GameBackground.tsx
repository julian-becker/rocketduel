import React, { useContext, useState }  from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { PanoramaView } from '@lightbase/react-native-panorama-view';
import { isEmulatorSync } from 'react-native-device-info';
import { Asset } from 'expo-asset';
import { GameContext } from '../contexts/Game';
import { calculateOffset, calculateXPos } from '../lib/helpers';
import TopHalf from '../components/TopHalf';
import BottomHalf from '../components/BottomHalf';
import Robot from './enemies/Robot';
import Launcher from './Launcher';
import FireButton from '../components/FireButton';
import GameWorld from './GameWorld';
import ThrustSlider from './ThrustSlider';

const backgroundImage = Asset.fromModule(require('../assets/backgrounds/seamless-panoramic.jpg'));
const imageWidth = backgroundImage.width;

const GameBackground = () => {
  const [offset, setOffset] = useState(0);

  const { game } = useContext(GameContext);
  const { player, targets } = game;
  const { azimuth } = player;

  const onBackgroundLoaded = () => {
    const initialOffset = azimuth;
    setOffset(initialOffset);
  }
  // player pixel orientation: (adjusted player azimuth / 360) * imageWidth;
  // target is (target azimuth / 360) * imageWidth
  // x position is negative when the target is to the left of the player, positive to the right
  // targetPos = playerPos ?
  const currentPlayerOffset = calculateOffset(imageWidth, offset, azimuth);
  const getAdjustedXPosForTarget = (azimuth: number) => {
    const currentTargetOffset = calculateOffset(imageWidth, offset, azimuth);
    const rawXPos = calculateXPos(imageWidth, currentPlayerOffset, currentTargetOffset);
    const viewOffset = Dimensions.get("window").width / 2;
    return  rawXPos + viewOffset;
  }

  const renderTarget = (target) => {
    return (
      <View style={{position: 'absolute', top: 320, right: getAdjustedXPosForTarget(target.azimuth) }}>
        <Robot type={target.type} useScale={true} {...target} />
      </View>
    )
  }
 
  return (
    <View style={{flex: 1}}>
      <GameWorld />
      <ThrustSlider />
      <FireButton />
    </View>
  );
}


const styles = StyleSheet.create({
  panorama: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default GameBackground;
