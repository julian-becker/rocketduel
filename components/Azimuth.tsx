import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';

const Azimuth = (props) => {
  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  }
  return (
    <View style={styles.wrap}>
      <View style={{flex: 1}}>
        <BodyText>Azimuth</BodyText>
      </View>
      <View style={{ flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText(text)}
          defaultValue={"0"}
          autoCorrect={false}
          keyboardType={"numeric"}
          underlineColorAndroid='transparent'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 40,
    padding: 2,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default Azimuth;