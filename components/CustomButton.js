import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { color } from 'react-native-reanimated';
import { globalStyles } from '../styles/global';
/**
 * CustomButton uses touchable opacity and styling to provide a better looking button than the provided Button class in react native
 */
export default function CustomButton({ title, onPress, style, disabled }) {

  return (

    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={{
        ...globalStyles.buttonView,
        backgroundColor: disabled === undefined ? '#5CDB95' : (disabled === true ? 'lightgray' : '#5CDB95'),
        ...style,
      }}>
        <Text style={{
          ...globalStyles.buttonText,
          color: 'white'
          }}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>

  );

}
