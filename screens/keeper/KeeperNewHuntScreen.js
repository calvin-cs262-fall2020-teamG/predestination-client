import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

export default function KeeperNewHuntScreen({ navigation }) {

    const [name, setName] = useState('');
    const [numPlayers, setNumPlayers] = useState(0);
    
    return (

        <View>
            <View>
                {/* New scavenger hunt label and text input field */}
                <Text styles={styles.huntNameHeader}>Enter a scavenger hunt name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter name'
                    value={name}
                    onChangeTex={val => setName(val)}
                />
            </View>
            <View>
                {/* Min players label and numerical input */}
                <Text>Enter a minimum number of players:</Text>
                <TextInput
                    placeholder='number of players'
                    keyboardType='numeric'
                    value={numPlayers}
                    onChangeText={val => setNumPlayers(val)}
                />
            </View>
            <View>
                {/* TODO: Add timer input */}
            </View>
            <View>
                <Button title="OK" onPress={() => navigation.navigate('KeeperListScreen')}/>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
        huntNameHeader: {
            flex: 1,
            fontSize: 24
        },
});