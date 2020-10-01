import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

export default function StartScreen({ navigation }) {
    
    const [code, setCode] = useState('');

    // inform user via alert an invalid code was entered
    const handleError = () => {
	Alert.alert('Oops!', 'Code must be 6 digits', [ { text: 'Understood' }]);
    };

    // ensure given code is valid
    const handleJoinPress = () => {
	(code.length === 6) ? navigation.navigate('SeekerWaitingScreen', { code }) : handleError();
    };
    
    return (
	<View style={styles.container}>
	  <View style={styles.titleSection}>
	    <Text>PreDestination</Text>
	    <Text>Insert Cool Logo</Text> 
          </View>

          <View style={styles.entrySection}>

            <View style={styles.inputContainer}>
              <TextInput
	        style={styles.input}
	        placeholder='Enter Code'
	        keyboardType='numeric'
	        value={code}
	        onChangeText={val => setCode(val)} 
              />
            </View>

              <View style={styles.joinButton}>
	        <Button title='Join' onPress={handleJoinPress}/>
	      </View>
              
              <View style={styles.createButton}>
                <Button title="Create" onPress={() => navigation.navigate('KeeperListScreen')}/> 
              </View>
	                
          </View>
          
	</View>
    );
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	flexDirection: 'column',
        alignItems: 'center',
    },
    titleSection: {
        flex: 1,
        width: '100%'
    },
    entrySection: {
        flex: 2,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputContainer: {
       
    },
    input: {
        fontSize: 70,
        textAlign: 'center',
    },
    joinButton: {
        paddingTop: 20,
        width: '50%',
    },
    createButton: {
        paddingTop: 15,
        width: '30%',
        textAlign: 'center',
    },
    
});

