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
} from "react-native";

import CustomButton from "../../components/CustomButton";
import { globalStyles } from "../../styles/global";

import { NotesContext } from "../../src/Notes";
import { PROXIMITY_MESSAGES, PROXIMITY } from "../../src/Proximity";
import Tracker from "../../components/TrackerTargetVisualizer";

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: connecting tempCount and proximity to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {

  const { notePack } = useContext(NotesContext);
    
  return (
    <Animated.View
      style={{
        ...styles.flexContainer,
      }}
    >
	<Tracker proximity={PROXIMITY.AT} points={21}></Tracker>
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
