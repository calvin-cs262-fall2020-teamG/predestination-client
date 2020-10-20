import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import NoteWidget from '../../components/NoteWidget';
import { globalStyles } from '../../styles/global';

import { NOTE_TYPE } from '../../components/NoteWidget';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    return (
        <View style={styles.flexContainer}>
            
            <View style={styles.noteContainer}>
                <NoteWidget
                    content={route.params.item.clue}
                    points={route.params.item.points}
                    onPress={() => {}}
                    id={0}
                />
            </View>

            <View style={styles.bottomContainer}>
                
                <View style={styles.statusContainer}>
                    <Text>Not here</Text>
                </View>

                <View style={styles.backContainer}>
                    <View><Text>Stuck and want to try another one?</Text></View>
                    <View><Button title="Another One" onPress={() => { navigation.navigate("SeekerClueListScreen")} }></Button></View>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    noteContainer: {
        flex: 1,
    },
    bottomContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'blue',
    },
    statusContainer: {
        flex: 3,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    backContainer: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'flex-end',
    },



});

