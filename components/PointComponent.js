import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Card from "../components/Card";

/**
 * CustomButton uses touchable opacity and styling to provide a better looking button than the provided Button class in react native
 */
export default function PointComponent({ points, notes, onPress }) {
  return (
    <View>
      <View style={styles.pointTextContainer}>
        <Text style={styles.pointText}> -{points} - </Text>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card content={item.clue} id={item.key} onPress={onPress} />
        )}
      />
    </View>
  );
}

const radius = 7;

const styles = StyleSheet.create({
  pointTextContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  pointText: {
    fontSize: 24,
    color: "gray",
  },
});
