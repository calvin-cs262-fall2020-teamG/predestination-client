import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, } from 'react-native';

/*
The AddNewRoute component takes input from the user
and adds it to the FlatList of routes.
TODO: add min players input, add timer input - maybe?
*/

export default function AddNewRoute({ submitHandler }) {

    const [name, setName] = useState('');

    const changeNameHandler = (val) => {
        setName(val);
    }

    return (

        <View>
            <View>
                {/* New scavenger hunt label and text input field */}
                <Text style={styles.header}>Enter a scavenger hunt name:</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder='Enter name'
                    value={name}
                    // Fires changeNameHandler which in turn sets the name to whatever the user types in
                    onChangeText={changeNameHandler}
                />
            </View>
            <View>
                {/* TODO: Add min players input */}
            </View>
            <View>
                {/* TODO: Add timer input */}
            </View>
            <View>
                <Button title="OK" onPress={() => submitHandler(name)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        fontWeight: 'bold'
        },
    nameInput: {
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
});