import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { BodyText, Header } from './styled/Text';
import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';

const Elevation = (props) => {
  const elevation = props.value;
  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  }
  return (
    <View>
      <Header>Elevation:</Header>
      {isEmulatorSync() ? 
        <View style={{ height: 36}}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChangeText(text)}
            defaultValue={MIN_MORTAR_ELEVATION.toString()}
            autoCorrect={false}
            keyboardType={"numeric"}
            underlineColorAndroid='transparent'
          />
        </View>
      : <BodyText>{elevation}</BodyText>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  input: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default Elevation;