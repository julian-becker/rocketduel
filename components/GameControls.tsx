import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerContext } from '../contexts/Player';
import { ProjectileContext } from '../contexts/Projectile';
import { BodyText } from './styled/Text';
import ThrustSlider from '../components/ThrustSlider';
import FireButton from '../components/FireButton';
import { white } from './styled/Colors';

// left to right: Thrust, Launcher, Fire Button
const GameControls = () => {

  const { player } = useContext(PlayerContext);
  const { azimuth, elevation } = player;

  const { projectile } = useContext(ProjectileContext);
  const { thrust } = projectile;
  return (
    <View style={styles.wrap}>
      {/* thrust slider */}
      <View style={styles.thrustWrap}>
        <ThrustSlider />
      </View>
      {/* launcher */}
      <View style={styles.launcherWrap}>
        <BodyText color={white}>Launcher</BodyText>
        <BodyText color={white}>{`Azimuth: ${azimuth}°`}</BodyText>
        <BodyText color={white}>{`Elevation: ${elevation}°`}</BodyText>
        <BodyText color={white}>{`Thrust: ${thrust}%`}</BodyText>
      </View>
      {/* fire button */}
      <View style={styles.fireButtonWrap}>
        <FireButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thrustWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  launcherWrap: {
    flex: 2,
  },
  fireButtonWrap: {
    flex: 2,
    flexDirection: 'column',
    alignSelf: 'center'
  }
});

export default GameControls;