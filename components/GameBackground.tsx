import React, { useContext, useState }  from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { PanoramaView } from '@lightbase/react-native-panorama-view';
import { isEmulatorSync } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ImpactContext } from '../contexts/Impact';
import { calculateOffset, calculateXPos } from '../lib/helpers';
import levels from '../lib/levels';
import TopHalf from '../components/TopHalf';
import BottomHalf from '../components/BottomHalf';
import Robot from './enemies/Robot';
import Launcher from './Launcher';

const backgroundImage = Asset.fromModule(require('../assets/backgrounds/seamless-panoramic.jpg'));
const imageWidth = backgroundImage.width;

const GameBackground = () => {
  const navigation = useNavigation();
  const [offset, setOffset] = useState(0);

  const { player, dispatchPlayer } = useContext(PlayerContext);
  const { azimuth } = player;
  const { targets, dispatchTarget } = useContext(TargetContext);
  const { dispatchImpact } = useContext(ImpactContext);

  const onBackgroundLoaded = () => {
    const initialOffset = azimuth;
    setOffset(initialOffset);
  }

  const handleEndLevel = () => {
    const gameOver = player.level >= levels.length - 1;
    if (!gameOver) {
      dispatchPlayer({type: 'LEVEL_UP'});
      dispatchTarget({type: 'CREATE_TARGETS', value: player});
      dispatchImpact({type: 'CLEAR_IMPACTS'});
      navigation.navigate('YouWin', { level: player.level });
    }
  }
  // Check if all targets are destroyed and forward if true
  const remainingTargets = targets.filter((target) => target.isDestroyed === false);
  if (remainingTargets.length === 0) {
    handleEndLevel();
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
    <PanoramaView
      style={styles.panorama}
      dimensions={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width }}
      inputType="mono"
      enableTouchTracking={false}
      onImageLoaded={onBackgroundLoaded}
      imageUrl={backgroundImage.uri}>
        { /* robots go here */ }
        { targets.length > 0 ? targets.forEach((target) => renderTarget(target)) : null }
        { /* rlauncher needs to be full-screen */ }
        { !isEmulatorSync() ? <Launcher /> : null }
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
