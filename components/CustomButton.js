import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { color } from 'react-native-reanimated';
import { globalStyles } from '../styles/global';
/**
 * CustomButton uses touchable opacity and styling to provide a better looking button than the provided Button class in react native
 */
export default function CustomButton({ title, onPress, color }) {

  return (

    <TouchableOpacity onPress={onPress}>
      <View style={globalStyles.buttonView}>
        <Text style={{
          ...globalStyles.buttonText,
          color: 'white'//color === undefined ? 'maroon' : color,
          }}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>

  );

}

const radius = 7;
