import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { color } from "react-native-reanimated";
import PointComponent from "../../components/PointComponent";

//import { NotesContext, NotePack } from "../../src/Notes";
import { GameContext } from "../../src/GameLogic";
import { globalStyles } from "../../styles/global";

/**
 * SeekerClueList shows all clues available
 * TODO: styling, connecting to server
 */
export default function SeekerClueList({ route, navigation }) {
  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { GamePack } = useContext(GameContext);

  const onPress = (key) => {
    GamePack.setFocusedClue(key);
    navigation.navigate("TrackerScreen");
  };

  return (
    <View style={globalStyles.trackerListFlexContainer}>
      <FlatList
        data={GamePack.clues
          .map((item) => item.points)
          .filter(onlyUnique)
          .sort((a, b) => {
            return b - a;
          })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

        <PointComponent
            points={item}
            onPress={onPress}
            notes={GamePack.clues.filter((clue) => {
              return clue.points === item;
            })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
