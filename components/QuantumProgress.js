import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

/**
 * QuantumProgress will display a graphical progress bar for finding clues
 * TODO: styling, maybe a way to adapt to a large total (current idea is to have each clue be represented by a circle, green if collected, gray if not, but maybe that wouldn't scale well with many clues)
 */

export default function ScavengerProgress({ total, current }) {
  return (
    <View>
      <FlatList
        data={[
          ...Array(total).map((i) => {
            return { key: n.toString() };
          }),
        ]}
        renderItem={({ index }) => (
          <View>
            <View
              style={
                index <= current ? styles.finishedCircle : styles.todoCircle
              }
            />{" "}
            {index < total ? (
              <View
                style={index < current ? styles.finishedLine : styles.todoLine}
              />
            ) : null}{" "}
          </View>
        )}
      />{" "}
    </View>
  );
}

const styles = StyleSheet.create({});
