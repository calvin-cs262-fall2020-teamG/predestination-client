import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';

import CustomButton from '../../components/CustomButton';
import { globalStyles } from '../../styles/global';

import { NotesContext } from '../../src/Notes';
import { PROXIMITY_MESSAGES, PROXIMITY } from '../../src/Proximity';
import Circle from '../../components/Circle';

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


    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(1));
    const [textColorAnimated, setTextColorAnimated] = useState(new Animated.Value('rgb(0, 0, 0)'));
    const [isBeginning, setIsBeginning] = useState(true);

    const { notePack } = useContext(NotesContext);
    const [proximity, setProximity] = useState(PROXIMITY.FAR);
    const [proximityOfficialMessage, setProximityOfficialMessage] = useState(getOfficialMessage(proximity));
    const [proximitySillyMessage, setProximitySillyMessage] = useState(getSillyMessage(proximity));
    const [tempCount, setTempCount] = useState(0); // todo: for debugging purposes only

    const [innerTargetRadius, setInnerTargetRadius] = useState(new Animated.Value(0));
    const [middleTargetRadius, setMiddleTargetRadius] = useState(new Animated.Value(1));
    const [outerTargetRadius, setOuterTargetRadius] = useState(new Animated.Value(2));

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

            Animated.parallel([
                Animated.sequence([
                    Animated.timing(innerTargetRadius, {
                        toValue: tempCount,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.sequence([
                    Animated.delay(200),
                    Animated.timing(middleTargetRadius, {
                        toValue: tempCount+1,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.sequence([
                    Animated.delay(300),
                    Animated.timing(outerTargetRadius, {
                        toValue: tempCount+2,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ])
                
                

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
        setTempCount((tempCount + 1) % 4);
    }

    useEffect(() => {
        setProximity(PROXIMITY[Object.entries(PROXIMITY)[tempCount][0]]);
    }, [tempCount]);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    const targetInterpolation = {
        inputRange: [0, 1, 2, 3],
        outputRange: [0.2, 0.3, 0.4, 10].map(i => i*screenWidth)
    }

    return (
        <Animated.View style={{
            ...styles.flexContainer
        }}>

        <TouchableOpacity activeOpacity={1} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={nextProximity}>
            <Circle color='#05386B' diameter={Animated.add(outerTargetRadius.interpolate(targetInterpolation), 50)}>
                <Circle color='#379683' diameter={Animated.add(middleTargetRadius.interpolate(targetInterpolation), 20)}>
                    <Circle color='#5CDB95' diameter={innerTargetRadius.interpolate(targetInterpolation)}>

                    </Circle>
                </Circle>
            </Circle>
        </TouchableOpacity>
            

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
    farCircle: {
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeCircle: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    atCircle: {
        backgroundColor: 'yellow',
    },
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
        justifyContent: 'center',
        alignItems: 'center',
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

