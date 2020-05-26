import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

import usePlayer from '../hooks/usePlayer';
import useTarget from '../hooks/useTarget';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';

const GameScreen = () => {
    const navigation = useNavigation();

    const { location, bearing, angle } = usePlayer();
    const { coords, altitude, accuracy, speed, heading } = location;
    const target = useTarget(coords);
    const [projectile, dispatch] = useReducer(projectileReducer, initialProjectileState);

    useEffect(() => {
        // update the projectile location when the player location changes
        dispatch({type: 'UPDATE_LOCATION', value: location})
    }, [location]);

    const setThrust = (thrust) => {
        dispatch({type: 'UPDATE_THRUST', value: thrust});
    }

    onChangeInput = (value, parameter = 'bearing') => {
        const num = Number(value);
        const maxRange = parameter === 'angle' ? 90 : 360;
        // hacky validation - check that value is valid before dispatch
        if (Number.isInteger(num) && 0 <= num && num <= maxRange) {
          dispatch({type: `UPDATE_${parameter.toUpperCase()}`, value: num});
        }
    }

    const locationPanel = () => {
        if (coords) {
            return (
                <View>
                    <Text>Target:</Text>
                    <Text testID='targetLatitude'>{target.coords[0].toFixed(3)}</Text>
                    <Text testID='targetLongitude'>{target.coords[1].toFixed(3)}</Text>
                    <Text testID='targetDistance'>{target.distance} meters</Text>
                    <Text testID='targetBearing'>{target.bearing} &deg;</Text>
                    <Text testID='targetHealth'>Health: {target.health}</Text>
                    <Text>******************</Text>
                    <Text>Your Location</Text>
                    <Text testID='playerLatitude'>{coords[0]}</Text>
                    <Text testID='playerLongitude'>{coords[1]}</Text>
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
                        <Text>Bearing:</Text><TextInput
                            style={styles.input}
                            onChangeText={text => onChangeInput(text, 'bearing')}
                            defaultValue="0"
                            autoCorrect={false}
                            keyboardType={"numeric"}
                        />
                        <Text>Angle:</Text><TextInput
                            style={styles.input}
                            onChangeText={text => onChangeInput(text, 'angle')}
                            defaultValue="0"
                            autoCorrect={false}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View style={styles.thrust}>
                        <Slider
                          style={styles.thrustSlider}
                          minimumValue={1}
                          maximumValue={100}
                          step={1}
                          value={projectile.thrust}
                          onSlidingComplete={setThrust}
                        />
                        <Text>Thrust: {projectile.thrust}</Text>
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
    input: {
        height: 26,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1
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
