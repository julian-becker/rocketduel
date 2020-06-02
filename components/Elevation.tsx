import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { BodyText, Header } from './styled/Text';
import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';

const Elevation = (props) => {
  const { elevation } = props;
  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  }
  return (
    <View>
      <Header>Elevation:</Header>
      {isEmulatorSync() ? 
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText(text)}
          defaultValue={MIN_MORTAR_ELEVATION.toString()}
          autoCorrect={false}
          keyboardType={"numeric"}
        />
      : <BodyText>{elevation}</BodyText>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default Elevation;