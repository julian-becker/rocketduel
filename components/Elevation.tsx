import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import { GameContext } from '../contexts/Game';
import { blue, white } from './styled/Colors';
import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';

const Elevation = () => {

  const { dispatchGame} = useContext(GameContext);

  const handleChangeText = (text: string) => {
    dispatchGame({type: 'UPDATE_ELEVATION', value: Number(text)});
  }

  return (
    <View style={styles.wrap}>
      <View style={{flex: 1}}>
        <BodyText color={white}>Elev.</BodyText>
      </View>
      <View style={{ flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChangeText(text)}
          defaultValue={MIN_MORTAR_ELEVATION.toString()}
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

export default Elevation;