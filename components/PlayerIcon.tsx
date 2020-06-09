/*
//  Represents the player's icon in the map view
//
//
*/

import React from 'react';
import { Image, StyleSheet } from 'react-native';

const player = require('../assets/player.png');

const PlayerIcon = () => {

  return (
    <Image style={styles.player} source={player} />
  )
}

const styles = StyleSheet.create({
  player: {
    backgroundColor: 'transparent',
    height: 35,
    width: 35
  }
});

export default PlayerIcon;