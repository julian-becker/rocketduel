import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as appData from '../app.json';
import * as turf from '@turf/turf';
import { black, white, silver } from './styled/Colors';
import PlayerIcon from './PlayerIcon';
import RobotIcon from './RobotIcon';
import { azimuthToBearing } from '../lib/gameMechanics';

// panel sizing
const deviceWidth = Dimensions.get('screen').width - 10;

MapboxGL.setAccessToken(appData.mapbox.apiKey);

const MapPanel = (props) => {

  const cameraRef = useRef(undefined);
  const { location, elevation  } = props.player;
  const { coords, distance, azimuth, health, isDestroyed } = props.target;
  const [visible, setVisible] = useState(false);
  // scope the map so that all targets are on it, but no broader
  const mapDist = Math.sqrt(2 * (distance * distance)); // the mf'n Pythagorean Theorem y'all
  const neCoords = turf.destination(turf.point(location.coords), mapDist, azimuthToBearing(45), {units: 'meters'}).geometry.coordinates;
  const swCoords = turf.destination(turf.point(location.coords), mapDist, azimuthToBearing(225), {units: 'meters'}).geometry.coordinates;

  const mapBounds = [
    [neCoords[0], neCoords[1]],
    [swCoords[0], swCoords[1]],
  ];
  const [ bounds, setBounds ] = useState({
    ne: mapBounds[0],
    sw: mapBounds[1],
    padding: 20,
    animationDuration: 1000,
  })
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /*
  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <Header>🤖 Sighted!</Header>
        <BodyText accessibilityID='targetCoords'>{`[${coords[0].toFixed(3)}, ${coords[1].toFixed(3)}]`}</BodyText>
        <BodyText accessibilityID='targetDistance'>{distance} meters</BodyText>
        <BodyText accessibilityID='targetBearing'>{azimuth} &deg;</BodyText>
        <BodyText color={isDestroyed ? red : black} accessibilityID='targetHealth'>{isDestroyed ? `Destroyed` : `Health: ${health}`}</BodyText>
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.mapScreen}>
        <BodyText>Some Modal Content</BodyText>
      </Overlay>
    </View>
  )
  */
 return (
  <View style={styles.panelBorder}>
    <View style={styles.panelInterior}>
      <MapboxGL.MapView
      style={styles.map}
      styleURL={'mapbox://styles/mekablitz/ckb5jru9k1oi51ila2hu6dwbw'}
      compassEnabled={false}
      logoEnabled={false}
      >
        <MapboxGL.Camera
          bounds={bounds}
          animationDuration={2000}
          animationMode='easeTo'
          followUserLocation={true}
          followUserMode='compass'
          followPitch={90-elevation}
          minZoomLevel={10.5}
          maxZoomLevel={19}
          centerCoordinate={location.coords}
        />
        <MapboxGL.MarkerView id='player' anchor={{x: 0.5, y: 0.5}} coordinate={location.coords}>
          <PlayerIcon />
        </MapboxGL.MarkerView>
        <MapboxGL.MarkerView id='target' coordinate={coords}>
          <RobotIcon distance={distance} health={health} isDestroyed={isDestroyed}/>
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  panelBorder: {
    width: deviceWidth - 30,
    height: deviceWidth - 30,
    borderRadius: deviceWidth - 30 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: silver.roman,
    borderWidth: 2,
    borderColor: black
  },
  panelInterior: {
    width: deviceWidth - 40,
    height: deviceWidth - 40,
    borderRadius: deviceWidth - 40 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: silver.metallic,
  },
  container: {
    height: 250,
    width: 250,
    backgroundColor: white
  },
  map: {
    width: deviceWidth - 50,
    height: deviceWidth - 50,
    borderRadius: deviceWidth - 50 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: black
  }
});

export default MapPanel;