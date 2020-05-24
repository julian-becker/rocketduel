import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

import useLocation from '../hooks/useLocation';


const GameScreen = () => {
    const { latitude, longitude } = useLocation();
    const locationPanel = () => {
        if (latitude && longitude) {
            return (
                <View>
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
                        <Text>thrust control goes here</Text>
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
