import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { BodyText, Header } from './styled/Text';

const Azimuth = (props) => {
  const azimuth = props.value;
  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  }
  return (
    <View>
      <Header>Azimuth:</Header>
      {isEmulatorSync() ? 
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText(text)}
          defaultValue={azimuth.toString()}
          autoCorrect={false}
          keyboardType={"numeric"}
        />
      : <BodyText>{azimuth}</BodyText>
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

export default Azimuth;