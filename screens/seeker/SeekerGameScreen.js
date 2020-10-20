import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerGameScreen({ route, navigation }) {

    const total_players = 20;

    const [notes, setNotes] = useState({
        list: [
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '0' },
            { clue: 'The better dining hall\'s entrance. At verffffffffffffffffffffffffffffffffffffffffffffffffffffffptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', archived: true, points: 2, key: '1' },
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
        focused: null,
    });

    const [cluesLeft, setCluesLeft] = useState(notes.list.filter((note) => { return !note.archived; }).length);

    // When seekers click the "hunt" button, they will be redirected to the last clue selected if they selected a clue, else they will go to a clue list screen
    const pressHunt = () => {
        if (notes.focused === null) {
            navigation.navigate('SeekerClueListScreen', { notes: notes });
        } else {
            navigation.navigate('SeekerFocusedScreen', { notes: notes });
        }
    }


    const fill = (20 / 100) * 100;

    return (
        <View style={styles.flexContainer}>

            <View style={styles.header}>
                <View style={styles.pointsSection}>
                    <Text style={styles.pointText}>33</Text>
                </View>
                <View style={styles.statusSection}>
                    <View style={styles.timeSection}>
                        <Text style={styles.timeText}>11:05</Text>
                    </View>
                    <View style={styles.rankSection}>
                        <Text style={styles.rankText}>4th Place</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.miniLeaderboardContainer}>
                    <Text>Leaderboard goes here</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton title={'Hunt'} onPress={pressHunt} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    pointText: {
        textAlign: 'center',
        fontSize: 64,
    },
    timeText: {
        textAlign: 'center',
        fontSize: 24,
    },
    rankText: {
        textAlign: 'center',
        fontSize: 24,
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 5,
    },
    pointsSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeSection: {
        flex: 1,
        justifyContent: 'center',
    },
    rankSection: {
        flex: 1,
        justifyContent: 'center',
    },
    statusSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomSection: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    miniLeaderboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginBottom: 40,
        marginTop: 20,
    }
});

