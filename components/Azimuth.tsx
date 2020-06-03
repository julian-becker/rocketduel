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
        <View style={{ height: 36}}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleChangeText(text)}
            defaultValue={azimuth.toString()}
            autoCorrect={false}
            keyboardType={"numeric"}
            underlineColorAndroid='transparent'
          />
        </View>
      : <BodyText>{azimuth}</BodyText>
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

export default Azimuth;