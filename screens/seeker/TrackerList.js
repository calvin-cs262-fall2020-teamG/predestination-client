import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import { color } from 'react-native-reanimated';
import PointComponent from '../../components/PointComponent';

import { NotesContext, NotePack } from '../../src/Notes';
import { globalStyles } from '../../styles/global';
/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerClueList({ route, navigation }) {

    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const { notePack } = useContext(NotesContext);

    const onPress = (key) => {
        notePack.setFocused(key);
        navigation.navigate("TrackerScreen");
    }

    return (
        <View style={globalStyles.trackerListFlexContainer}>

            <FlatList
                data={notePack.notes.map(item => item.points).filter(onlyUnique).sort((a, b) => {
                    return b - a;
                })}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PointComponent points={item} onPress={onPress} notes={notePack.notes.filter(note => { return note.points === item; })}/>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

});

