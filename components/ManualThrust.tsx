import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BodyText } from './styled/Text';
import { ProjectileContext } from '../contexts/Projectile';

const ManualThrust = () => {

  const { dispatchProjectile } = useContext(ProjectileContext);

  const handleChangeText = (text: string) => {
    dispatchProjectile({type: 'UPDATE_THRUST', value: Number(text)})
  }
  return (
    <View style={styles.wrap}>
      <View style={{flex: 1}}>
        <BodyText>Thrust</BodyText>
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

export default ManualThrust;