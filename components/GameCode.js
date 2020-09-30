import React, { useState } from 'react';
import { StyleSheet, View, Alert, TextInput, Button } from 'react-native';

export default function GameCode({ submitHandler }) {
    const [code, setCode] = useState('');

    const handleError = () => {
	Alert.alert('Oops!', 'Code must be 6 digits', [ { text: 'Understood', onPress: () => console.log('alert closed')}]);
    };
    
    const validCode = (code) => {
	submitHandler(code);
    };
    
    const handlePress = () => {
	(code.length === 6) ? validCode(code) : handleError();
    };
    
    return (
        <View style={styles.flexSection}>

          <View style={styles.inputContainer}>
            <TextInput
	      style={styles.input}
	      placeholder='Enter Code'
	      keyboardType='numeric'
	      value={code}
	      onChangeText={val => setCode(val)} 
            />
          </View>
          
	  <View style={styles.button}>
	    <Button title='Join' onPress={handlePress}/>
	  </View>
          
        </View>
    );
}

const styles = StyleSheet.create({
    flexSection: {
	alignSelf: 'stretch',
	flex: 1,
	flexDirection: 'column',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: 70,
        textAlign: 'center'
    },
    button: {
        flex: 1,
        width: 200,
        justifyContent: 'center'
    },
});
