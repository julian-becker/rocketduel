import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import useLocation from '../hooks/useLocation';
import useTarget from '../hooks/useTarget';

const GameScreen = () => {
    const { latitude, longitude } = useLocation();
    const target = useTarget({ latitude, longitude });

    const locationPanel = () => {
        if (latitude && longitude) {
            return (
                <View>
                    <Text>Target:</Text>
                    <Text testID='targetLatitude'>{target.latitude.toFixed(3)}</Text>
                    <Text testID='targetLongitude'>{target.longitude.toFixed(3)}</Text>
                    <Text testID='targetDistance'>{target.distance} meters</Text>
                    <Text testID='targetBearing'>{target.bearing} &deg;</Text>
                    <Text testID='targetHealth'>Health: {target.health}</Text>
                    <Text>******************</Text>
                    <Text>Your Location</Text>
                    <Text testID='playerLatitude'>{latitude}</Text>
                    <Text testID='playerLongitude'>{longitude}</Text>
                </View>
            )
        } else {
            return <ActivityIndicator />
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.interior}>
                {/* launcher half */}
                <View style={styles.launcherSide}>
                    <View style={styles.launcher}>
                        <Text>Launcher goes here</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button title={"Fire"} onPress={() => {return null}} />
                        <Button title={"Quit"} onPress={() => navigation.goBack()} />
                    </View>
                </View>
                {/* stats half */}
                <View style={styles.statsSide}>
                    <View style={styles.map}>
                        <Text>map viz goes here</Text>
                    </View>
                    <View style={styles.stats}>
                        {locationPanel()}
                    </View>
                    <View style={styles.thrust}>
                        <Slider
                          style={styles.thrustSlider}
                          minimumValue={0}
                          maximumValue={100}
                          step={1}
                          value={0}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    interior: {
        flex: 1,
        flexDirection: 'row',
        padding: 20
    },
    launcherSide: {
        flex: 1,
        flexDirection: 'column'
    },
    launcher: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    statsSide: {
        flex: 1,
        flexDirection: 'column'
    },
    map: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stats: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    thrust: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    thrustSlider: {
        width: '100%',
        flex: 1,
        transform: [ { rotate: "-90deg" } ],
    },
    header: {
        flex: 1
    },
    title: {
        fontSize: 25
    },
    main: {
        flex: 5
    },
    actions: {
        flex: 1
    },
    label: {
        fontWeight: "bold"
    },
    dataEntry: {
        fontWeight: "100"
    }
});

export default GameScreen;
