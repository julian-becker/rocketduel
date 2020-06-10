/*
//  Represents an impact in the map view
//
//
*/

import React from 'react';
import { Image, StyleSheet } from 'react-native';

const crater = require('../assets/crater.png');

const CraterIcon = () => {

  return (
    <Image style={styles.crater} source={crater} />
  )
}

const styles = StyleSheet.create({
  crater: {
    backgroundColor: 'transparent',
    height: 12,
    width: 28
  }
});

export default CraterIcon;