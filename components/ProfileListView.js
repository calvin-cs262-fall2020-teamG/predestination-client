import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

/**
 * ProfileListView shows a snapshot of the people in a list and number of others not shown
 * TODO: styling, add location indicator (maybe a link to a map?)
 */
export default function ProfileListView({
  totalWidth,
  height,
  list,
  profileSize,
}) {
  const maxNumber = Math.floor(width / profileSize);

  return (
    <View style={styles.mainContainer}>
      <FlatList data={list} />
    </View>
  );
}

const radius = 7;

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,

    elevation: 2,
  },
  contentSection: {
    flex: 2,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  bannerSubSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  pointText: {
    fontSize: 24,
    paddingRight: 5,
  },
});
