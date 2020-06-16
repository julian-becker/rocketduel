import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapPanel from '../components/MapPanel';

// Top Half of the game screen is used to display the map
const TopHalf = () => {

  return (
    <View style={styles.wrap}>
      <MapPanel />
    </View>

  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

export default TopHalf;