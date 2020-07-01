import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as appData from '../app.json';
import * as turf from '@turf/turf';
import { azimuthToBearing } from 'projectile-trajectory';
import { PlayerContext } from '../contexts/Player';
import { TargetContext } from '../contexts/Target';
import { ImpactContext } from '../contexts/Impact';
import { black, white, silver } from './styled/Colors';
import PlayerIcon from './PlayerIcon';
import Robot from './enemies/Robot';
import CraterIcon from './CraterIcon';
import { MIN_GPS_ACCURACY } from '../lib/gameMechanics';

// panel sizing
const deviceWidth = Dimensions.get('screen').width - 10;

const componentSize = deviceWidth * 0.6;

MapboxGL.setAccessToken(appData.mapbox.apiKey);

const MapPanel = () => {

  // destructure the needed info
  const { player } = useContext(PlayerContext);

  const { location, elevation } = player;

  const isLocated = (accuracy: number) => {
    return accuracy < MIN_GPS_ACCURACY;
  }

  const { target } = useContext(TargetContext);
  const { coords, distance, health, isDestroyed } = target;
  
  const { impacts } = useContext(ImpactContext);
  
  const cameraRef = useRef(undefined);

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

 return (
  <View style={styles.panelBorder}>
    <View style={styles.panelInterior}>
      {isLocated(location.accuracy) ? 
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
            minZoomLevel={12}
            maxZoomLevel={19}
            centerCoordinate={location.coords}
          />
          <MapboxGL.MarkerView id='player' coordinate={location.coords}>
            <PlayerIcon />
          </MapboxGL.MarkerView>
          <MapboxGL.MarkerView id='target' anchor={{x: 0, y: 0}} coordinate={coords}>
            <Robot />
          </MapboxGL.MarkerView>
          {impacts.map((impact: object, i: number) => {
            return (<MapboxGL.MarkerView key={`impact${i}`} id={`impact${i}`} coordinate={impact.impactCoords}>
              <CraterIcon />
            </MapboxGL.MarkerView>)
          })}
        </MapboxGL.MapView>
      : <ActivityIndicator size='large' />}
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  panelBorder: {
    margin: 5,
    width: componentSize,
    height: componentSize,
    borderRadius: componentSize / 2,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: silver.roman,
    borderWidth: 2,
    borderColor: black
  },
  panelInterior: {
    width: componentSize - 10,
    height: componentSize - 10,
    borderRadius: componentSize - 10 / 2,
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
    width: componentSize - 15,
    height: componentSize - 15,
    borderRadius: componentSize - 15 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: black
  }
});

export default MapPanel;