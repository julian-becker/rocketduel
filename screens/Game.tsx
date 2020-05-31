import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Container from '../components/styled/Container'
import { BodyText, ButtonText, Header } from '../components/styled/Text';
import Button from '../components/styled/Button';
import { blue, red, white } from '../components/styled/Colors';
import { useNavigation } from '@react-navigation/native';

import usePlayer from '../hooks/usePlayer';
import { initTarget, targetReducer } from '../hooks/useTarget';
import { DEFAULT_STATE as initialProjectileState, projectileReducer } from '../hooks/useProjectile';
import { IMPACT_RADIUS, MAX_MORTAR_ELEVATION, MIN_MORTAR_ELEVATION, calculateImpact, convertThrust, calculateDamage } from '../lib/gameMechanics';

import * as turf from '@turf/turf';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GameScreen = () => {
    // temporary, to report impact back to the screen
    const [impact, setImpact] = useState({
        isLanded: false,
        isAHit: false,
        isAKill: false,
        damage: 0,
        distance: 0,
        proximity: 0,
        time: 0,
    });
    const navigation = useNavigation();

    const { location } = usePlayer();
    const { coords, altitude } = location;
    const [ target, dispatchTarget ] = useReducer(targetReducer, coords, initTarget);
    const [ projectile, dispatch ] = useReducer(projectileReducer, initialProjectileState);
    const { thrust, elevation, azimuth } = projectile;

    const setThrust = (thrust) => {
        dispatch({type: 'UPDATE_THRUST', value: thrust});
    }

    const onPressFire = () => {
        dispatch({type: 'FIRE'});
        const impact = calculateImpact({
            originCoords: coords,
            targetCoords: target.coords,
            velocity: convertThrust(Number(thrust)),
            elevation: Number(elevation),
            azimuth: azimuth,
            height: Number(altitude)
        });
        const damage = calculateDamage(impact.proximity);
        setImpact({
            isLanded: true,
            isAHit: impact.proximity <= IMPACT_RADIUS,
            isAKill: damage >= target.health,
            damage: damage,
            distance: Math.round(impact.distance),
            proximity:  Math.round(impact.proximity),
            time:  Math.round(impact.time)
        })
    }

    const onChangeInput = (value, parameter = 'azimuth') => {
        const num = Number(value);
        const minRange = parameter === 'elevation' ? MIN_MORTAR_ELEVATION : 0;
        const maxRange = parameter === 'elevation' ? MAX_MORTAR_ELEVATION : 360;
        // hacky validation - check that value is valid before dispatch
        if (Number.isInteger(num) && minRange <= num && num <= maxRange) {
          dispatch({type: `UPDATE_${parameter.toUpperCase()}`, value: num});
        }
    }

    const impactPanel = () => {
        const { isLanded, isAKill, damage, distance, proximity, time } = impact;
        if (isLanded) {
            return (
                <View>
                    <Text>{`Shot traveled ${distance} meters in ${time} seconds and landed ${proximity} meters from the target, causing ${damage} damage. ${isAKill ? 'It was destroyed!' : ''}.`}</Text>
                </View>
            )
        }
    }

    const targetPanel = () => {
        if (target && target.coords) {
            return (
                <View>
                    <Header>Target:</Header>
                    <BodyText accessibilityID='targetCoords'>{`[${target.coords[0].toFixed(3)}, ${target.coords[1].toFixed(3)}]`}</BodyText>
                    <BodyText accessibilityID='targetDistance'>{target.distance} meters</BodyText>
                    <BodyText accessibilityID='targetBearing'>{target.azimuth} &deg;</BodyText>
                    <BodyText accessibilityID='targetHealth'>Health: {target.health}</BodyText>
                </View>
            )
        } else {
            return <ActivityIndicator />
        }
    }
    const locationPanel = () => {
        if (coords) {
            return (
                <View style={styles.playerLocation}>
                    <Header>Your Location</Header>
                    <BodyText accessibilityID='playerLatitude'>{coords[0]}</BodyText>
                    <BodyText accessibilityID='playerLongitude'>{coords[1]}</BodyText>
                </View>
            )
        } else {
            return <ActivityIndicator />
        }
    }

    return (
        <Container>
            <View style={styles.interior}>
                {/* launcher half */}
                <View style={styles.launcherSide}>
                    <View style={styles.impactPanel}>
                        {impactPanel()}
                    </View>
                    <View style={styles.launcher}>
                        <BodyText>Launcher goes here</BodyText>
                    </View>
                    <View style={styles.buttons}>
                        <Button onPress={() => onPressFire()} >
                            <BodyText bold align='center' color={white}>Fire</BodyText>
                        </Button>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <BodyText align='center' color={blue}>Quit</BodyText>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* stats half */}
                <View style={styles.statsSide}>
                    <View style={styles.map}>
                        {targetPanel()}
                    </View>
                    <View style={styles.stats}>
                        {locationPanel()}
                        <Header>Bearing:</Header>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => onChangeInput(text, 'azimuth')}
                            defaultValue="0"
                            autoCorrect={false}
                            keyboardType={"numeric"}
                        />
                        <Header>Elevation:</Header>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => onChangeInput(text, 'elevation')}
                            defaultValue="0"
                            autoCorrect={false}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View style={styles.thrust}>
                        <Slider
                          style={styles.thrustSlider}
                          minimumValue={0}
                          maximumValue={100}
                          step={1}
                          value={projectile.thrust}
                          onSlidingComplete={setThrust}
                        />
                        <BodyText>Thrust: {projectile.thrust}</BodyText>
                    </View>
                </View>
            </View>
        </Container>
    );
}


const styles = StyleSheet.create({
    interior: {
        flex: 1,
        flexDirection: 'row',
        margin: 3
    },
    launcherSide: {
        flex: 1,
        flexDirection: 'column'
    },
    impactPanel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        flexDirection: 'column',
        margin: 3
    },
    map: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    stats: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerLocation: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    thrust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thrustSlider: {
        width: '100%',
        flex: 1,
        transform: [ { rotate: "-90deg" } ],
    },
    input: {
        height: 30,
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
    bold: {
        fontWeight: "bold"
    },
    dataEntry: {
        fontWeight: "100"
    }
});

export default GameScreen;
