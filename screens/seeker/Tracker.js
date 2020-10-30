import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Animated, ScrollView } from 'react-native';

import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { globalStyles } from '../../styles/global';

import { NotesContext } from '../../src/Notes';
import { PROXIMITY_MESSAGES, PROXIMITY } from '../../src/Proximity';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    const inputColors = {
        FAR: 200,
        CLOSE: 2,
        AT: 1,
    };

    const outputColor = {
        FAR: 0,
        CLOSE: 1,
        AT: 2,
    }

    const getOfficialMessage = (proximity) => {
        return PROXIMITY_MESSAGES[proximity].official;
    }

    const getSillyMessage = (proximity) => {
        return PROXIMITY_MESSAGES[proximity].silly[Math.floor(Math.random() * PROXIMITY_MESSAGES[proximity].silly.length)];
    }

    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(1));
    const [textColorAnimated, setTextColorAnimated] = useState(new Animated.Value('rgb(0, 0, 0)'));
    const [isBeginning, setIsBeginning] = useState(true);

    const { notePack } = useContext(NotesContext);
    const [proximity, setProximity] = useState(PROXIMITY.FAR);
    const [proximityOfficialMessage, setProximityOfficialMessage] = useState(getOfficialMessage(proximity));
    const [proximitySillyMessage, setProximitySillyMessage] = useState(getSillyMessage(proximity));
    const [tempCount, setTempCount] = useState(0); // todo: for debugging purposes only

    let first = true;

    const startAnimation = () => {
        Animated.sequence([
            // after decay, in parallel:
            Animated.timing(opacityAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.delay(300),
        ]).start(() => {
            if (proximity !== PROXIMITY.FAR) {

                setTextColorAnimated('rgb(250, 250, 250)');
            } else {
                setTextColorAnimated('rgb(250, 250, 250)');
            }
            setProximityOfficialMessage(getOfficialMessage(proximity));
            setProximitySillyMessage(getSillyMessage(proximity));

            Animated.sequence([
                Animated.timing(animation, {
                    toValue: outputColor[proximity],
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnimation, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false,
                })
            ]).start();

        });
    }

    useEffect(() => {
        // Only after the first change can animation begin
        if (!isBeginning) {
            startAnimation();
        } else {
            // when proximity is initialized, set don't run an animation
            setIsBeginning(false);
        }
    }, [proximity]);

    // todo: for debugging purposes only to show all the levels of proximity to given location
    const nextProximity = () => {
        setTempCount((tempCount + 1) % 3);
    }

    useEffect(() => {
        setProximity(PROXIMITY[Object.entries(PROXIMITY)[tempCount][0]]);
    }, [tempCount]);

    return (
        <Animated.View style={{
            ...styles.flexContainer
        }}>

            <Animated.View style={{
                ...styles.statusContainer,
                backgroundColor: animation.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['rgb(140, 34, 50)', ' rgba(135, 206, 235, 1)', 'rgba(161, 214, 131, 1)'],
                })

            }}>
                <Animated.View style={{
                    ...styles.officialMessageContainer,
                    opacity: opacityAnimation,
                }}>
                    <Animated.Text style={{
                        ...styles.officialText,
                        color: textColorAnimated,
                    }}>{proximityOfficialMessage}</Animated.Text>
                </Animated.View>

                <Animated.View style={{
                    ...styles.sillyMessageContainer,
                    opacity: opacityAnimation,
                    color: textColorAnimated,
                }}>
                    <Animated.Text style={{
                        ...styles.sillyText,
                        color: textColorAnimated,
                    }}>{proximitySillyMessage}</Animated.Text>
                </Animated.View>

                <CustomButton title="Change location" onPress={() => { nextProximity(); }} color='orange' />
            </Animated.View>


            <View style={styles.bottomContainer}>
                <View style={styles.stuckContainer}>
                    <View style={styles.stuckButton}>
                        <CustomButton color='orange' title={(notePack.getFocused() === null) ? "Select Clue" : "Stuck"} onPress={() => { navigation.navigate("TrackerListScreen") }} />
                    </View>

                    <View style={globalStyles.stuckText}>
                        <Text>Stuck and want to try another one?</Text>
                    </View>
                </View>

                <ScrollView style={styles.noteContainer}>
                    <Text>
                        {(notePack.getFocused() === null) ? "No clue selected" : notePack.getFocused().clue}
                    </Text>
                </ScrollView>
            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    sillyText: {
        fontSize: 20,
    },
    officialText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    officialMessageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    sillyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    stuckButton: {
        marginBottom: 10,
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    noteContainer: {
        alignSelf: 'center',
        minHeight: 50,
    },
    bottomContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    statusContainer: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',

        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    stuckContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        minHeight: 70,
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
        /*backgroundColor: 'black'*/
    },
    gameButton: {
        marginBottom: 20,
        marginTop: 20,
    }
});

