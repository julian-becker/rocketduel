import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import { PlayerContext } from '../contexts/Player';
import { MIN_MORTAR_ELEVATION } from '../lib/gameMechanics';

const Elevation = () => {

  const { dispatchPlayer } = useContext(PlayerContext);

  const handleChangeText = (text: string) => {
    dispatchPlayer({type: 'UPDATE_ELEVATION', value: Number(text)});
  }

  return (
    <View style={styles.wrap}>
      <View style={{flex: 1}}>
        <BodyText bold={true}>Elev.</BodyText>
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
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default Elevation;