import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Header } from './styled/Text';

const Readout = (props) => {

  const header = props.name;
  const handleChangeText = (text: string) => {
    props.onChangeText(text);
  }

  return (
    <View>
      <Header>{header}:</Header>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChangeText(text)}
        defaultValue="0"
        autoCorrect={false}
        keyboardType={"numeric"}
      />
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

export default Readout;