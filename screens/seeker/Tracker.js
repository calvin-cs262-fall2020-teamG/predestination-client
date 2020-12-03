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

import { GameContext } from "../../src/GameLogic";
import { PROXIMITY_MESSAGES, PROXIMITY } from "../../src/Proximity";
import Tracker from "../../components/TrackerTargetVisualizer";

// allows us to easilly set a location and a radius and let expo trigger an event if the user walks into that region
import * as Location from 'expo-location';
import { LocationGeofencingEventType, Accuracy } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

//const GEOFENCE_TASK_NAME = 'GEOFENCE_HOP';

const unlockRadius = 15;
const nearRadius = 25;

const ACCEPTABLE_ACCURACY = 6; // radius in meters of accuracy (i.e. the actual location of the user is within 5 meters of the given location)

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: connecting tempCount and proximity to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

    const { GamePack } = useContext(GameContext);
    const [location, setLocation] = useState(null);
    const [currentAccuracy, setCurrentAccuracy] = useState(true); // true if acceptable, false if not
    const [proximity, setProximity] = useState(PROXIMITY.FAR);
    const [target, setTarget] = useState({ latitude: 42.2942481, longitude: -83.2518054}); // my house

    useEffect(() => {
        
    }, []);
    
    // todo: have a status indicator indicating quality of GPS
    useEffect(() => {
        // whenever the current accuracy of the GPS changes, this code will run
        if (currentAccuracy) {

        } else {
            Alert.alert("Poor GPS Signal!", "This is usually caused by being inside a building or having the signal be obstructed.\nThis game will not proceed until this is fixed.");
        }
    }, [currentAccuracy]);

    // https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6378.137;

        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return earthRadiusKm * c;
    }

    // when a new accurate location is polled
    useEffect(() => {
        // only change proximity if the clue has not been unlocked yet
        if (location != null && proximity !== PROXIMITY.AT) {
            const dist = distanceInKmBetweenEarthCoordinates(location.latitude, location.longitude, target.latitude, target.longitude) * 1000;
            
            if (dist < unlockRadius) {
                setProximity(PROXIMITY.AT);
            } else if (dist < nearRadius) {
                setProximity(PROXIMITY.CLOSE);
            } else {
                setProximity(PROXIMITY.FAR);
            }            
        }
        
    }, [location]);

    // on every new location poll
    const watcher = (location) => {
	if (location !== null) {
	    if (location.coords.accuracy <= ACCEPTABLE_ACCURACY) {
                setCurrentAccuracy(true);
                setLocation(location.coords);
	    } else {
                setCurrentAccuracy(false);
            }
	    
	} else {
	    setLocation('an error occurred');
	}
    };
    
    // https://docs.expo.io/versions/latest/sdk/location/#usage
    const initialize = async () => {
	try {
	    const { status } = await Location.requestPermissionsAsync();
	    if (status === 'granted') {
		
		// for some reason this never works, so I guess we gotta do stuff ourselves :(
		// await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, [
		//     exampleLocation
		// ]);

		const taskList = await TaskManager.getRegisteredTasksAsync();
		console.log(taskList);
		await Location.watchPositionAsync({
		    accuracy: Accuracy.High,
		    timeInterval: 100,
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
	  <Tracker proximity={proximity} points={GamePack.getFocusedClue() !== null ? GamePack.getFocusedClue().points : 'Oops'}></Tracker>
	  <View style={styles.bottomContainer}>
	    <View style={styles.bottomContainerHeader}>
	      <View
		style={{
		    ...styles.pointContainer,
		    display: GamePack.getFocusedClue() === null ? "none" : "flex",
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
		  {GamePack.getFocusedClue() === null
		   ? ""
		   : GamePack.getFocusedClue().points}
		  Points
		</Text>
	      </View>
	      <View style={styles.stuckButton}>
		<CustomButton
		  color="orange"
		  title={
		      GamePack.getFocusedClue() === null
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
		  display: GamePack.getFocusedClue() === null ? "none" : "flex",
	      }}
	    />
	    <ScrollView
	      style={{
		  ...styles.noteContainer,
		  display: GamePack.getFocusedClue() === null ? "none" : "flex",
	      }}
	    >
		<Text style={{ fontSize: 24, marginBottom: 50 }}>
		{GamePack.getFocusedClue() === null
		 ? "This should not be shown"
		 : GamePack.getFocusedClue().description}
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
