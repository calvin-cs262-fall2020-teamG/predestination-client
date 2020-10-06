import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

export default function KeeperNewHuntScreen({ navigation }) {

    const [name, setName] = useState('');

    return (
        <View>
            <Text styles={styles.huntnameHeader}>Enter a scavenger hunt name:</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter name'
                value={name}
                onChangeText={val => setName(val)}
            />
        </View>
    );

}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        huntnameHeader: {
            flex: 1,
            flexDirection: 'column',
            paddingTop: 20,
            marginTop: 20,
            alignItems: 'center',
        },
});
