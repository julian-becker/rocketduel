import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Rocket Duel</Text>
            </View>
            <View style={styles.main}>
                <Opponent/>
                <Settings/>
            </View>
            <View style={styles.actions}>
                <FireButton/>
            </View>
        </View>
    );
}

export function Opponent() {
    return (
        <View>
            <Text style={styles.label}>Opponent</Text>
            <Text>{coordinate()}°, {coordinate()}°</Text>
        </View>
    )
}

function coordinate() {
    return Math.trunc(Math.random() * 10000000) / 100000
}

function fire() {
}

export function Settings() {
    return (
        <View>
            <Thrust/>
            <Angle/>
        </View>
    )
}

export function Thrust() {
    return (
        <View>
            <Text style={styles.label}>Thrust</Text>
            <TextInput style={styles.dataEntry}>999</TextInput><Text>N</Text>
        </View>
    )
}

export function Angle() {
    return (
        <View>
            <Text style={styles.label}>Angle</Text>
            <CoordinateEntry axis="X"/>
            <CoordinateEntry axis="Y"/>
            <CoordinateEntry axis="Z"/>
        </View>
    )
}

interface CoordinateEntryParams {
    axis: String;
}

export function CoordinateEntry(props: CoordinateEntryParams) {
    return (
        <View>
            <TextInput style={styles.dataEntry}>100</TextInput>
            <Text>{props.axis}</Text>
        </View>
    )
}

function FireButton() {
    return <Button title={"Fire!!!"} onPress={fire}/>;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 75,
        paddingLeft: 25
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
