import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Dimensions,
    Alert
} from "react-native";

import CustomButton from "../../components/CustomButton";
import { globalStyles } from "../../styles/global";

import { NotesContext } from "../../src/Notes";
import { PROXIMITY_MESSAGES, PROXIMITY } from "../../src/Proximity";
import Tracker from "../../components/TrackerTargetVisualizer";

// allows us to easilly set a location and a radius and let expo trigger an event if the user walks into that region
import * as Location from 'expo-location';
import { LocationGeofencingEventType, Accuracy } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const GEOFENCE_TASK_NAME = 'GEOFENCE_HOP';

TaskManager.defineTask(GEOFENCE_TASK_NAME, ({ data: { eventType, region }, error }) => {
    console.log('help');
    if (error) {
	// check `error.message` for more details.
	console.log("hello");
	return;
    }
    if (eventType === LocationGeofencingEventType.Enter) {
	console.log("You've entered region:", region);
	Alert('You entered a region');
    } else if (eventType === LocationGeofencingEventType.Exit) {
	console.log("You've left region:", region);
	Alert('You left a region');
    }
});

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: connecting tempCount and proximity to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    const { notePack } = useContext(NotesContext);
    const [location, setLocation] = useState('waiting');
    
    const watcher = (location) => {
	if (location !== null) {
	    setLocation(`latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`);
	} else {
	    setLocation('an error occurred');
	}
    };
    
    const initialize = async () => {
	try {
	    const { status } = await Location.requestPermissionsAsync();
	    if (status === 'granted') {
		await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, [
		    {
			latitude: 42.2943209,
			longitude: -83.2517007,
			radius: 8,
		    }
		]);
		await Location.watchPositionAsync({
		    accuracy: Accuracy.BestForNavigation,
		    timeInterval: 500,
		    distanceInterval: 1,
		    mayShowUserSettingsDialog: true,
		}, watcher);
	    }

	} catch (error) {
	    console.log(error);
	}
    };

    useEffect(() => {
	initialize();
    }, []);
    
    return (
	<Animated.View
	    style={{
		...styles.flexContainer,
	    }}
	>
	    <Tracker proximity={PROXIMITY.AT} points={21}></Tracker>
	    <Text>{location}</Text>
	    <View style={styles.bottomContainer}>
		<View style={styles.bottomContainerHeader}>
		    <View
			style={{
			    ...styles.pointContainer,
			    display: notePack.getFocused() === null ? "none" : "flex",
			    flexDirection: "row",
			    justifyContent: "center",
			    alignItems: "center",
			}}
		    >
			<Text
			    style={{
				textAlign: "center",
				fontSize: 24,
				justifyContent: "center",
				fontWeight: "bold",
			    }}
			>
			    {notePack.getFocused() === null
			     ? ""
			     : notePack.getFocused().points}
			    Points
			</Text>
		    </View>
		    <View style={styles.stuckButton}>
			<CustomButton
			    color="orange"
			    title={
				notePack.getFocused() === null
				    ? "Select Clue"
				    : proximity === "SUCCESS"
				    ? "New"
				    : "Stuck"
			    }
			    onPress={() => {
				navigation.navigate("TrackerListScreen");
			    }}
			/>
		    </View>
		</View>
		<View
		    style={{
			borderBottomColor: "lightgray",
			borderBottomWidth: 1,
			width: "90%",
			alignSelf: "center",
			display: notePack.getFocused() === null ? "none" : "flex",
		    }}
		/>
		<ScrollView
		    style={{
			...styles.noteContainer,
			display: notePack.getFocused() === null ? "none" : "flex",
		    }}
		>
		    <Text style={{ fontSize: 24, marginBottom: 50 }}>
			
			{notePack.getFocused() === null
			 ? "This should not be shown"
			 : notePack.getFocused().clue}
		    </Text>
		</ScrollView>
	    </View>
	</Animated.View>
    );
}

const styles = StyleSheet.create({
    farCircle: {
	backgroundColor: "skyblue",
	justifyContent: "center",
	alignItems: "center",
    },
    closeCircle: {
	backgroundColor: "red",
	justifyContent: "center",
	alignItems: "center",
    },
    atCircle: {
	backgroundColor: "yellow",
    },
    sillyText: {
	fontSize: 20,
    },
    officialText: {
	fontSize: 36,
	fontWeight: "bold",
    },
    officialMessageContainer: {
	flex: 1,
	justifyContent: "center",
    },
    sillyMessageContainer: {
	flex: 1,
	justifyContent: "center",
	paddingLeft: 20,
	paddingRight: 20,
    },
    stuckButton: {
	flex: 1,
    },
    flexContainer: {
	flex: 1,
	flexDirection: "column",
	backgroundColor: "#f8f9fa",
	justifyContent: "center",
	alignItems: "center",
    },
    noteContainer: {
	alignSelf: "flex-start",
	minHeight: 100,
	padding: 20,
    },
    bottomContainer: {
	flexDirection: "column",
	justifyContent: "space-around",
	width: "100%",
	height: "30%",
	backgroundColor: "white",
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
	justifyContent: "center",
    },
    bottomContainerHeader: {
	marginBottom: 5,
	marginTop: 15,
	flexDirection: "row",
	alignContent: "center",
	justifyContent: "space-around",
	paddingBottom: 10,
    },
    gameButton: {
	marginBottom: 20,
	marginTop: 20,
    },
});
