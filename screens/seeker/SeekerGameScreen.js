import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import NoteWidget from '../../components/NoteWidget';
import { globalStyles } from '../../styles/global';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerRaceScreen({ route, navigation }) {

    const total_players = 20;

    const notes = {
        list: [
            { title: 'Performing Arts Center Main Entrance', clue: 'Insert a witty clue here.', visited: 5, key: '13', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '12', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '11', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '10', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '9', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '8', timeFound: '13:01' },
            { title: 'Devos Center', clue: 'Insert a witty clue here.', visited: 5, key: '7', timeFound: '13:01' },
            { title: 'Performing Arts Center Main Entrance', clue: 'Insert a witty clue here.', visited: 5, key: '6', timeFound: '13:01' },
            { title: 'Performing Arts Center Main Entrance', clue: 'Insert a witty clue here.', visited: 5, key: '5', timeFound: '13:01' },
            { title: 'Performing Arts Center Main Entrance', clue: 'Insert a witty clue here.', visited: 5, key: '4', timeFound: '13:01' },
            { title: 'Science Building', clue: 'Insert a witty clue here.', visited: 5, key: '3', timeFound: '13:01' },
            { title: 'Science Building', clue: 'Insert a witty clue here.', visited: 5, key: '2', timeFound: '13:01' },
            { title: 'Big Cheese', clue: 'Insert a witty clue here.', visited: 10, key: '1', timeFound: '13:00' },
            { title: 'Start', clue: 'What is holey, made out of metal, and yellow at Calvin?', visited: 20, key: '0', timeFound: '12:00' },
        ],
        focused: 1,
    };

    const handleScroll = (e) => {
        console.log(e.nativeEvent.contentOffset.y);
    };

    return (
        <View style={globalStyles.flexContainer}>

            <View style={globalStyles.header}>
                <Text>Currently in 19th place!</Text>
            </View>

            <View style={globalStyles.scrollable}>
                <View style={globalStyles.historyBar}>

                </View>

                <View style={globalStyles.scrollableNotes}>
                    <FlatList
                        onScroll={handleScroll}
                        data={notes.list}
                        renderItem={({ item }) => (
                            <NoteWidget content={item} focused={false} />
                        )}
                    />
                </View>
            </View>

            <View style={globalStyles.progressSection}>

            </View>

        </View>
    );
}

// const styles = StyleSheet.create({
//     flexContainer: {
//         flexDirection: 'column',
//         flex: 1,
//     },
//     header: {
//         flex: 5,
//         backgroundColor: 'skyblue',
//     },
//     scrollable: {
//         flex: 15,
//     },
//     scrollableNotes: {

//     },
//     progressSection: {
//         flex: 1,
//         borderTopWidth: 1,
//         borderColor: 'lightgray',
//     },
// });

