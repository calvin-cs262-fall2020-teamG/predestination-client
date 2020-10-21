import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native';

import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

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
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.delay(300),
        ]).start(() => {
            if (proximity !== PROXIMITY.FAR) {
                
            setTextColorAnimated('rgb(255, 255, 255)');
            } else {
                setTextColorAnimated('rgb(0, 0, 0)');
            }
            setProximityOfficialMessage(getOfficialMessage(proximity));
            setProximitySillyMessage(getSillyMessage(proximity));

            Animated.sequence([
                Animated.timing(animation, {
                    toValue: outputColor[proximity],
                    duration: 1200,
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
        // Once the text disapears (opacityAnimation) and the color goes to red (animation), change message now, then show message by increasing opacity
        startAnimation();
    }, [proximity])

    // todo: for debugging purposes only to show all the levels of proximity to given location
    const nextProximity = () => {
        setTempCount((tempCount + 1) % 3);
    }

    useEffect(() => {
        setProximity(PROXIMITY[Object.entries(PROXIMITY)[tempCount][0]]);
    }, [tempCount]);

    return (
        <Animated.View style={{
            ...styles.flexContainer,
            backgroundColor: animation.interpolate({
                inputRange: [0, 1, 2],
                outputRange: ['rgba(255, 255, 255, 1)', ' rgba(135, 206, 235, 1)', 'rgba(193, 239, 137, 1)'],
            })
        }}>

            <View style={styles.statusContainer}>
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

                <Button title="Change location" onPress={() => { nextProximity(); }} ></Button>
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
                    content={notePack.getFocused().clue}
                    onPress={() => { }}
                    id={1}
                />
            </View>

            <View style={styles.gameButton}>
                <CustomButton color='pink' title='stats' onPress={() => { navigation.navigate("SeekerGameScreen") }} />
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
        justifyContent: 'space-around',
        alignItems: 'center',
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

