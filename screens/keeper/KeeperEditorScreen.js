import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, TextInput, View, Text, Button, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

/**
 * KeeperEditorScreen will show running list of clues, give the ability to set down a new clue,
 * TODO: styling, embedded map would be nice
 */

export default function KeeperEditorScreen({ navigation }) {
    [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }

    const [clues, setClues] = useState([]);

    const pressHandler = (key) => {
        setClues((prevClues) => {
            return prevClues.filter(todo => todo.key != key)
        })
    }

    const submitHandler = (text) => {
        if (text) {
            setClues((prevClues) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevClues
                ];
            })
        } else {
            Alert.alert('OOPS', 'Please enter a clue', [
                {
                    text: 'Ok', onPress: () => console.log('alert closed')
                }
            ])
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard');
        }}>
            <View style={globalStyles.container}>
                <TextInput
                    style={globalStyles.clueInput}
                    placeholder='new clue...'
                    onChangeText={changeHandler}
                    value={text}
                />
                <Button onPress={() => submitHandler(text)} title='add clue' />
                <View style={globalStyles.content}>
                    {/* <AddTodo submitHandler={submitHandler} /> */}
                    <View style={globalStyles.list}>
                        <FlatList
                            data={clues}
                            renderItem={({ item }) => (
                                <View style={globalStyles.item}><Text>{item.text}</Text></View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='new todo...'
                onChangeText={changeHandler}
                value={text}
            />
            <Button onPress={() => submitHandler(text)} title='add todo' color='coral' />
        </View>
    );
}


