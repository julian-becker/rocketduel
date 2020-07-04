import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import GameBackground from '../components/GameBackground';

import useCompass from '../hooks/useCompass';
import useGyroscope from '../hooks/useGyroscope';

import { PlayerContext } from '../contexts/Player';
import { GameContext } from '../contexts/Game';
import { TargetProvider } from '../contexts/Target';
import { ProjectileProvider } from '../contexts/Projectile';
import { ImpactProvider } from '../contexts/Impact';


const GameScreen = () => {
  // start getting compass data
  const { dispatchGame } = useContext(GameContext);
  useCompass(dispatchGame);
  useGyroscope(dispatchGame);
  
  return (
    <ProjectileProvider>
      <ImpactProvider>
        <GameBackground />
      </ImpactProvider>
    </ProjectileProvider>
  );
}


const styles = StyleSheet.create({
  panorama: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default GameScreen;
