import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Dimensions
} from "react-native";

import { PROXIMITY_MESSAGES, PROXIMITY } from '../src/Proximity';
import Circle from './Circle';

/**
 * TrackerTargetVisualizer visualizes location of user relative to given region with an animated target status
 * TODO: styling, add location indicator (maybe a link to a map?)
 */
export default function TrackerTargetVisualizer({ proximity, points }) {
    const getOfficialMessage = () => {
	return PROXIMITY_MESSAGES[proximity].official;

    };

    const getSillyMessage = (proximity) => {
	return PROXIMITY_MESSAGES[proximity].silly[
	    Math.floor(Math.random() * PROXIMITY_MESSAGES[proximity].silly.length)
	];
    };

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(1.0));
    const [successOpacityAnimation, setSuccessOpacityAnimation] = useState(new Animated.Value(0.0));

    const [textColorAnimated, setTextColorAnimated] = useState("rgb(0, 0, 0)");
    const [isBeginning, setIsBeginning] = useState(true);

    const [proximityOfficialMessage, setProximityOfficialMessage] = useState(getOfficialMessage(proximity)
									    );
    const [proximitySillyMessage, setProximitySillyMessage] = useState(getSillyMessage(proximity));

    const [innerTargetRadius, setInnerTargetRadius] = useState(	new Animated.Value(0));
    const [middleTargetRadius, setMiddleTargetRadius] = useState(new Animated.Value(1));
    const [outerTargetRadius, setOuterTargetRadius] = useState(new Animated.Value(2));

    const animationPosition = {
	FAR: {
	    name: 'FAR',
	    value: 0,
	},
	CLOSE: {
	    name: 'CLOSE',
	    value: 1,
	},
	AT: {
	    name: 'SUCCESS_START',
	    value: 2,
	},
	SUCCESS_FINISH: {
	    name: 'SUCCESS_FINISH',
	    value: 3,
	}	
    }

    const [animationStep, setAnimationStep] = useState(animationPosition.FAR);

    
    const partyTime = () => {
	// show success text by gradually increasing opacity
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
	    // before transitioning, make text disappear for a cleaner effect
	    Animated.parallel([
		Animated.timing(opacityAnimation, {
		    toValue: 0,
		    duration: animationStep.name === "SUCCESS_FINISH" ? 0 : 500,
		    useNativeDriver: true,
		}),
		Animated.timing(successOpacityAnimation, {
		    toValue: 0.0,
		    duration: 10,
		    useNativeDriver: true,
		}),
	    ]),
	    // transition to next animationStep value, where inner, middle, and outer radii keep their order in terms of radii size
	    Animated.parallel([
		Animated.timing(innerTargetRadius, {
		    toValue: animationStep.value,
		    duration: animationStep.name === "SUCCESS_FINISH" ? 300 : 500,
		    useNativeDriver: true,
		}),
		Animated.timing(middleTargetRadius, {
		    toValue: animationStep.value + 1,
		    duration: animationStep.name === "SUCCESS_FINISH" ? 200 : 500,
		    useNativeDriver: true,
		}),
		Animated.timing(outerTargetRadius, {
		    toValue: animationStep.value + 2,
		    duration: animationStep.name === "SUCCESS" ? 200 : 500,
		    useNativeDriver: true,
		}),
	    ]),
	]).start(() => {
	    setProximityOfficialMessage(getOfficialMessage(proximity));

	    if (animationStep.name !== "SUCCESS_FINISH") {
		setProximitySillyMessage(getSillyMessage(proximity));
	    } else {
		partyTime();
	    }

	    if (animationStep.name !== "FAR") {
		setTextColorAnimated("rgb(255,255,255)");
	    } else {
		setTextColorAnimated("rgb(0,0,0)");
	    }

	    Animated.timing(opacityAnimation, {
		toValue: animationStep.name === "SUCCESS_START" ? 0.0 : 1.0,
		duration: 500,
		useNativeDriver: true,
	    }).start(() => {
		if (animationStep.name === "SUCCESS_START") {
		    Animated.delay(20).start(() => {
			setAnimationStep(animationPosition.SUCCESS_FINISH);
		    });
		}
	    });
	});
    };
    
    useEffect(() => {
	if (!isBeginning) {
	    animateSize();
	} else {
	    setIsBeginning(false);
	}
    }, [animationStep]);
    
    useEffect(() => {
	// sets position of target circles according to given proximity
	setAnimationStep(animationPosition[proximity]);
	
    }, [proximity]);


    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const targetInterpolation = {
	inputRange: [0, 1, 2, 3],
	outputRange: [0.1, 0.2, 0.3, 5],
    };

    return (
	<TouchableOpacity
            activeOpacity={1}
            style={{
		flex: 3,
		height: "100%",
		width: "100%",
		maxWidth: "100%",
		justifyContent: "center",
		alignItems: "center",
            }}
	>
            <Circle
		color="#05386B"
		diameter={outerTargetRadius.interpolate(targetInterpolation)}
		screenWidth={screenWidth}
            ></Circle>
            <Circle
		color="#379683"
		diameter={middleTargetRadius.interpolate(targetInterpolation)}
		screenWidth={screenWidth}
            ></Circle>
            <Circle
		color="#5CDB95"
		diameter={innerTargetRadius.interpolate(targetInterpolation)}
		screenWidth={screenWidth}
            ></Circle>
            <Animated.Text
		style={{
		    textAlign: "center",
		    position: "absolute",
		    bottom: "3%",
		    opacity: opacityAnimation,
		    color: textColorAnimated,
		}}
            >
		"{proximitySillyMessage}"
            </Animated.Text>
            <Animated.Text
		style={{
		    textAlign: "center",
		    position: "absolute",
		    top: "3%",
		    opacity: opacityAnimation,
		    fontWeight: "bold",
		    fontSize: 24,
		    color: textColorAnimated,
		}}
            >
		{proximityOfficialMessage}
            </Animated.Text>
            <Animated.Text
		style={{
		    textAlign: "center",
		    position: "absolute",
		    alignSelf: "center",
		    opacity: successOpacityAnimation,
		    fontWeight: "bold",
		    fontSize: 128,
		    color: textColorAnimated,
		    padding: 20,
		}}
            >
		{points === undefined ? 'An error occurred' : `+${points}`}
            </Animated.Text>
	</TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    mainContainer: {
	borderColor: "lightgray",
	borderBottomWidth: 1,
	margin: 10,
	shadowColor: "#000",
	shadowOffset: {
	    width: 0,
	    height: 1,
	},
	shadowOpacity: 0.18,
	shadowRadius: 1.0,
	elevation: 1,
	borderRadius: 7,
	backgroundColor: "white",
    },
    contentSection: {
	justifyContent: "center",
	paddingTop: 20,
	paddingBottom: 20,
	paddingLeft: 20,
	paddingRight: 20,
    },
    contentText: {
	fontSize: 15,
    },
});
