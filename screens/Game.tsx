import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import GameBackground from '../components/GameBackground';

import useCompass from '../hooks/useCompass';
import useGyroscope from '../hooks/useGyroscope';
import { useNavigation } from '@react-navigation/native';

import { PlayerContext } from '../contexts/Player';
import { TargetProvider } from '../contexts/Target';
import { ProjectileProvider } from '../contexts/Projectile';
import { ImpactProvider } from '../contexts/Impact';


const GameScreen = () => {
  const navigation = useNavigation();
  // start getting compass data
  const { player, dispatchPlayer } = useContext(PlayerContext);
  useCompass(dispatchPlayer);
  useGyroscope(dispatchPlayer);

  const { location } = player;
  const { coords } = location;

  return (
    <TargetProvider coords={coords}>
      <ProjectileProvider>
        <ImpactProvider>
          <GameBackground />
        </ImpactProvider>
      </ProjectileProvider>
    </TargetProvider>
  );
}


const styles = StyleSheet.create({
  panorama: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default GameScreen;
