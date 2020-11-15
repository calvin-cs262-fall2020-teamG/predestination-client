import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

/* EmbeddedMap will display a google map of the current location and surroudning markers
 * Each marker will describe a location and annotation text
 * FocusPoint will be used to change the view of the map to the selected location (could be a marker location or currentLocation)
 */

export default function EmbeddedMap({ markers, currentLocation, focusPoint }) {
  return (
    <MapView
      zoomEnabled={true}
      mapType="standard"
      mapPadding={{
        top: 500,
        right: 50,
        bottom: 50,
        left: 50,
      }}
      showsMyLocationButton={false}
      style={styles.mapStyle}
    ></MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").height - 10,
  },
});
