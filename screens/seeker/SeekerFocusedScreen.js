import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import ProximityView from '../../components/ProximityView';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    const [note, setNote] = useState(route.params.selectedNote);

    return (
        <View style={styles.flexContainer}>

            <View style={styles.statusContainer}>
                <ProximityView/>
            </View>

            <View style={styles.stuckContainer}>
                <View style={styles.stuckButton}>
                    <CustomButton color='orange' title="Stuck" onPress={() => { navigation.navigate("SeekerClueListScreen") }} />
                </View>

                <View style={styles.stuckText}>
                    <Text>Stuck and want to try another one?</Text>
                </View>
            </View>

            <View style={styles.noteContainer}>
                <Card
                    content={note.clue}
                    onPress={() => { }}
                    id={1}
                />
            </View>

            <View style={styles.gameButton}>
                <CustomButton color='lightblue' title='stats' onPress={() => { navigation.navigate("SeekerGameScreen") }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stuckText: {

    },
    stuckButton: {
        marginBottom: 10,
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    noteContainer: {
        alignSelf: 'center',
    },
    bottomContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    statusContainer: {
        flex: 3,
    },
    stuckContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    gameButton: {
        marginBottom: 20,
        marginTop: 20,
    }
});

