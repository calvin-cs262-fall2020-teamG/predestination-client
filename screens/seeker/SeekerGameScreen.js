import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';


import { NotesContext, NotePack } from '../../src/Notes';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerGameScreen({ route, navigation }) {

    const { notePack } = useContext(NotesContext);
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState(1);
    const [time, setTime] = useState(3600);

    // When seekers click the "hunt" button, they will be redirected to the last clue selected if they selected a clue, else they will go to a clue list screen
    const pressHunt = () => {
        if (notePack.getFocused() === null) {
            navigation.navigate('SeekerClueListScreen');
        } else {
            navigation.navigate('SeekerFocusedScreen');
        }
    }

    return (
        
        <View style={styles.flexContainer}>

            <View style={styles.header}>
                <View style={styles.pointsSection}>
                    <Text style={styles.pointText}>{points}</Text>
                    <Text>Points</Text>
                </View>
                <View style={styles.statusSection}>
                    <View style={styles.timeSection}>
                        <Text style={styles.timeText}>{time}</Text>
                        <Text>Time Left</Text>
                    </View>
                    <View style={styles.rankSection}>
                        <Text style={styles.rankText}>{rank}</Text>
                        <Text>Rank</Text>
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
        alignItems: 'center'
    },
    rankSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

