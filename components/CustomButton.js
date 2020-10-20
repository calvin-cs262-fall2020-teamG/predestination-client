import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

/**
 * CustomButton uses touchable opacity and styling to provide a better looking button than the provided Button class in react native
 */
export default function CustomButton({ title, onPress }) {

  return (

    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
    
  );

}

const radius = 7;

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 24,
  }
});
