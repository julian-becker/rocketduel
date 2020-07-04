import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import { GameContext } from '../contexts/Game';
import { blue, white } from './styled/Colors';

const Azimuth = () => {

  const { dispatchGame } = useContext(GameContext);

  const handleChangeText = (text: string) => {
    dispatchGame({type: 'UPDATE_AZIMUTH', value: Number(text)});
  }
  return (
    <View style={styles.wrap}>
      <View style={{flex: 1}}>
        <BodyText color={white}>Azimuth</BodyText>
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
    backgroundColor: white,
    borderColor: blue,
    borderWidth: 2
  }
});

export default Azimuth;