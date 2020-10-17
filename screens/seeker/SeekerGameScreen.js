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
export default function SeekerGameScreen({ route, navigation }) {

    const total_players = 20;

    const [notes, setNotes] = useState({
        list: [
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '0' },
            { clue: 'The better dining hall\'s entrance. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', archived: true, points: 2, key: '1' },
            { clue: 'Not starbucks At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', archived: false, points: 2, key: '2' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '3' },
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '4' },
            { clue: 'The better dining hall\'s entrance', archived: true, points: 2, key: '5' },
            { clue: 'Not starbucks', archived: false, points: 2, key: '6' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '7' },
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '8' },
            { clue: 'The worst dining hall\'s entrance', archived: false, points: 5, key: '9' },
            { clue: 'Not starbucks', archived: false, points: 2, key: '10' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '11' },
        ],
        focused: '0',
    });

    const [cluesLeft, setCluesLeft] = useState(notes.list.filter((note) => { return !note.archived; }).length);


    const changeFocused = (newClueKey) => {
        setNotes({ ...notes, focused: newClueKey });
    }

    return (
        <View style={styles.flexContainer}>

            <View style={styles.header}>
                

                <View style={styles.selectedClueContainer}>
                    <Text style={styles.selectedClueText}>{notes.list.filter(item => item.key === notes.focused)[0].clue}</Text>
                </View>

                <View style={styles.statisticsContainer}>
                    <Text>Currently in 3rd place.</Text>
                </View>

            </View>

            <View style={styles.todoList}>
                <FlatList
                    data={notes.list.sort((a, b) => {
                        if (a.archived === b.archived) {
                            return b.points - a.points;
                        } else {
                            return a.archived ? 1 : -1;
                        }
                    })}
                    renderItem={({ item, index }) => (
                        <NoteWidget
                            content={item.clue}
                            archived={item.archived}
                            first={item.archived ? (index === cluesLeft) : (index === 0)}
                            last={item.archived ? (index === (notes.list.length-1)) : (index === (cluesLeft - 1))}
                            points={item.points}
                            focused={item.key === notes.focused}
                            id={item.key}
                            onPress={changeFocused}
                        />
                    )}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    selectedClueText: {
        fontSize: 16,
    },
    flexContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: 'gold',
    },
    scrollable: {
        flex: 15,
    },
    scrollableNotes: {

    },
    todoList: {
        flex: 4,
    }
});

