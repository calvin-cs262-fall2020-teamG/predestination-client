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
 * TODO: connecting tempCount and proximity to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    const getOfficialMessage = () => {
        return PROXIMITY_MESSAGES[proximity].official;
    }

    const getSillyMessage = (proximity) => {
        return PROXIMITY_MESSAGES[proximity].silly[Math.floor(Math.random() * PROXIMITY_MESSAGES[proximity].silly.length)];
    }


    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(1.0));
    const [successOpacityAnimation, setSuccessOpacityAnimation] = useState(new Animated.Value(0.0));
    
    const [textColorAnimated, setTextColorAnimated] = useState('rgb(0, 0, 0)');
    const [isBeginning, setIsBeginning] = useState(true);

    const { notePack } = useContext(NotesContext);
    const [proximity, setProximity] = useState(PROXIMITY.FAR);
    const [proximityOfficialMessage, setProximityOfficialMessage] = useState(getOfficialMessage(proximity));
    const [proximitySillyMessage, setProximitySillyMessage] = useState(getSillyMessage(proximity));
    const [tempCount, setTempCount] = useState(0); // todo: for debugging purposes only

    const [innerTargetRadius, setInnerTargetRadius] = useState(new Animated.Value(0));
    const [middleTargetRadius, setMiddleTargetRadius] = useState(new Animated.Value(1));
    const [outerTargetRadius, setOuterTargetRadius] = useState(new Animated.Value(2));




    const partyTime = () => {
        Animated.sequence([
            Animated.delay(800),
            Animated.timing(successOpacityAnimation, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateSize = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacityAnimation, {
                    toValue: 0,
                    duration: (proximity === 'SUCCESS') ? 0 : 500,
                    useNativeDriver: true,
                }),
                Animated.timing(successOpacityAnimation, {
                    toValue: 0.0,
                    duration: 10,
                    useNativeDriver: true,
                })
            ]),            
            Animated.parallel([
                Animated.timing(innerTargetRadius, {
                    toValue: tempCount,
                    duration: (proximity === 'SUCCESS') ? 300 : 500,
                    useNativeDriver: true,
                }),
                Animated.timing(middleTargetRadius, {
                    toValue: tempCount + 1,
                    duration: (proximity === 'SUCCESS') ? 200 : 500,
                    useNativeDriver: true,
                }),
                Animated.timing(outerTargetRadius, {
                    toValue: tempCount + 2,
                    duration: (proximity === 'SUCCESS') ? 200 : 500,
                    useNativeDriver: true,
                })
            ]),           
        ]).start(() => {
            setProximityOfficialMessage(getOfficialMessage(proximity));

            if (proximity !== 'SUCCESS') {
                setProximitySillyMessage(getSillyMessage(proximity));
            } else {
                partyTime();
            }

            if (proximity !== 'FAR') {
                setTextColorAnimated('rgb(255,255,255)');
            } else {
                setTextColorAnimated('rgb(0,0,0)');
            }
            
            Animated.timing(opacityAnimation, {
                toValue: (proximity === 'AT') ? 0.0 : 1.0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                if (tempCount === 2) {
                    Animated.delay(20).start(() => {
                        nextProximity();
                    });
                }
            });            
        });
    }

    useEffect(() => {
        // Only after the first change can animation begin
        if (!isBeginning) {
            animateSize();
        } else {
            // when proximity is initialized, set don't run an animation
            setIsBeginning(false);
        }
    }, [proximity]);

    // todo: for debugging purposes only to show all the levels of proximity to given location
    const nextProximity = () => {
        if (notePack.getFocused() !== null) {
            setTempCount((tempCount + 1) % 4);
        }        
    }

    useEffect(() => {
        setProximity(PROXIMITY[Object.entries(PROXIMITY)[tempCount][0]]);
    }, [tempCount]);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const targetInterpolation = {
        inputRange: [0, 1, 2, 3],
        outputRange: [0.1, 0.2, 0.3, 5]
    };


    return (
        <Animated.View style={{
            ...styles.flexContainer
        }}>

            <TouchableOpacity activeOpacity={1} style={{ flex: 3, height: '100%', width: '100%', maxWidth: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={nextProximity}>
                <Circle color='#05386B' diameter={outerTargetRadius.interpolate(targetInterpolation)} screenWidth={screenWidth}></Circle>
                <Circle color='#379683' diameter={middleTargetRadius.interpolate(targetInterpolation)} screenWidth={screenWidth}></Circle>
                <Circle color='#5CDB95' diameter={innerTargetRadius.interpolate(targetInterpolation)} screenWidth={screenWidth}></Circle>

                <Animated.Text style={{ textAlign: 'center', position: 'absolute', bottom: '3%', opacity: opacityAnimation, color: textColorAnimated,  }}>"{proximitySillyMessage}"</Animated.Text>
                <Animated.Text style={{ textAlign: 'center', position: 'absolute', top: '3%', opacity: opacityAnimation, fontWeight: 'bold', fontSize: 24, color: textColorAnimated }}>{proximityOfficialMessage}</Animated.Text>
                <Animated.Text style={{ textAlign: 'center', position: 'absolute', alignSelf: 'center', opacity: successOpacityAnimation, fontWeight: 'bold', fontSize: 128, color: textColorAnimated, padding: 20 }}>+{(notePack.getFocused() === null) ? 0 : notePack.getFocused().points}</Animated.Text>
            </TouchableOpacity>

            

            <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerHeader}>
                    
                    <View style={{
                        ...styles.pointContainer,
                        display: (notePack.getFocused() === null) ? 'none' : 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{textAlign: 'center', fontSize: 24, justifyContent: 'center',}}>{(notePack.getFocused() === null) ? '' : notePack.getFocused().points}</Text>
                        <Text style={{textAlign: 'center', fontSize: 24, justifyContent: 'center', color: 'gray'}}> Points</Text>
                    </View>

                    <View style={styles.stuckButton}>
                        <CustomButton color='orange' title={(notePack.getFocused() === null) ? "Select Clue" : (proximity === 'SUCCESS') ? 'New' : "Stuck"} onPress={() => { navigation.navigate("TrackerListScreen") }} />
                    </View>

                </View>

                <View
                    style={{
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 1,
                        width: '90%',
                        alignSelf: 'center',
                        display: (notePack.getFocused() === null) ? 'none' : 'flex',   
                    }}
                />

                <ScrollView style={{
                    ...styles.noteContainer,
                    display: (notePack.getFocused() === null) ? 'none' : 'flex',              
                }}>
                    <Text style={{ fontSize: 24, marginBottom: 50}}>
                        {(notePack.getFocused() === null) ? "This should not be shown" : notePack.getFocused().clue}  
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
        flex: 1,
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteContainer: {
        alignSelf: 'flex-start',
        minHeight: 100,
        padding: 20,
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    pointContainer: {
        flex: 1,
        justifyContent: 'center',
        
        paddingBottom: 6, //for some reason this is needed to force the text to look centered with the stuck button
    },  
    bottomContainerHeader: {
        marginBottom: 5,
        marginTop: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
    },
    gameButton: {
        marginBottom: 20,
        marginTop: 20,
    }
});

