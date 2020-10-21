import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import PointComponent from '../../components/PointComponent';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerClueList({ route, navigation }) {

    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const onPress = (key) => {
        navigation.navigate("SeekerFocusedScreen", { selectedNote: route.params.notes.list.filter(item => item.key === key)[0] });
    }

    return (
        <View style={styles.flexContainer}>

            <FlatList
                data={route.params.notes.list.map(item => item.points).filter(onlyUnique).sort((a, b) => {
                    return b - a;
                })}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PointComponent points={item} onPress={onPress} notes={route.params.notes.list.filter(note => { return note.points === item; })}/>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        flexDirection: 'column'
    },
});

