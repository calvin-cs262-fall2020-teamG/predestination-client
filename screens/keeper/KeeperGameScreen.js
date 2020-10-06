import React, { useState } from "react";
import Leaderboard from "react-native-leaderboard";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";

/**
 * KeeperGameScreen will show the current status of players similar to SeekerGameScreen, with the addition of a few features
 * 1. ability to broadcast hints for a specific clue
 * 2. some easy graph or visual of how much time people are spending per clue
 * TODO: styling, components, and everything actually
 */

export default function KeeperGameScreen({ navigation }) {
  this.state = {
    data: [
      { userName: "JBrink", clueStatus: 2 },
      { userName: "NWang", clueStatus: 2 },
      { userName: "AScaria", clueStatus: 3 },
      { userName: "EWalters", clueStatus: 3 },
      { userName: "HAnderson", clueStatus: 2 },
    ],
  };

  return (
    <View>
      <Text style={styles.headerText}>Leaderboard Goes Here</Text>
      <Leaderboard
        data={this.state.data}
        sortBy="clueStatus"
        labelBy="userName"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "gold",
  },
});
