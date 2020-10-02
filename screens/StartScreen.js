import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';
import { globalStyles } from '../styles/global';

export default function StartScreen({ navigation }) {

    const [code, setCode] = useState('');

    // inform user via alert an invalid code was entered
    const handleError = () => {
        Alert.alert('Oops!', 'Code must be 6 digits', [{ text: 'Understood' }]);
    };

    // ensure given code is valid
    const handleJoinPress = () => {
        (code.length === 6) ? navigation.navigate('SeekerWaitingScreen', { code }) : handleError();
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.titleSection}>
                <Text>PreDestination</Text>
                <Text>Insert Cool Logo</Text>
            </View>

            <View style={globalStyles.entrySection}>

                <View style={globalStyles.inputContainer}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder='Enter Code'
                        keyboardType='numeric'
                        value={code}
                        onChangeText={val => setCode(val)}
                    />
                </View>

                <View style={globalStyles.joinButton}>
                    <Button title='Join' onPress={handleJoinPress} />
                </View>

                <View style={globalStyles.createButton}>
                    <Button title="Create" onPress={() => navigation.navigate('KeeperListScreen')} />
                </View>

            </View>

        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
// 	flex: 1,
// 	flexDirection: 'column',
//         alignItems: 'center',
//     },
//     titleSection: {
//         flex: 1,
//         width: '100%'
//     },
//     entrySection: {
//         flex: 2,
//         width: '100%',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     inputContainer: {

//     },
//     input: {
//         fontSize: 70,
//         textAlign: 'center',
//     },
//     joinButton: {
//         paddingTop: 20,
//         width: '50%',
//     },
//     createButton: {
//         paddingTop: 15,
//         width: '30%',
//         textAlign: 'center',
//     },

// });

