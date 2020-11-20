import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { globalStyles } from "../../styles/global";
/**
 * ProximityView gives a clean user interface for showing whether a user is far, close, or at a location
 * TODO: styling, connect to gps
 */
export default function ProximityView() {
  let PROXIMITY = {
    FAR: "FAR",
    CLOSE: "CLOSE",
    AT: "AT",
  };

  const PROXIMITY_MESSAGES = {
    FAR: {
      official: "Keep looking!",
      silly: ["Are we there yet?", "Zzzzzzz", "How much longer?", "I'm bored"],
    },
    CLOSE: {
      official: "You are close!",
      silly: [
        "It's gotta be around here somewhere, right?",
        "It's over there. See?",
        "I told you it's over there. Not here. SMH",
      ],
    },
    AT: {
      official: "You found it!",
      silly: [
        "Finally",
        "If you would've listened to me, we would have gotten here a loooong time ago",
        "Nice one!",
        "And you thought I wasn't helpful. lol",
      ],
    },
  };

  const [locationProximity, setLocationProximity] = useState(PROXIMITY.FAR);

  const [tempCount, setTempCount] = useState(0);

  useEffect(() => {
    setLocationProximity(PROXIMITY[Object.entries(PROXIMITY)[tempCount][0]]);
  }, [tempCount]);

  const tempToggleProximity = () => {
    setTempCount((tempCount + 1) % 3);
  };

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor:
          locationProximity === PROXIMITY.CLOSE
            ? "lightpink"
            : locationProximity === PROXIMITY.AT
            ? "lightgreen"
            : null,
      }}
    >
      <TouchableOpacity activeOpacity={1} onPress={tempToggleProximity}>
        <View style={styles.touchableOpacityStyle}>
          <View style={globalStyles.proximityOfficalTextContainer}>
            <Text style={globalStyles.proximityOfficialText}>
              
              {PROXIMITY_MESSAGES[locationProximity].official}
            </Text>
          </View>
          <View style={styles.sillyTextContainer}>
            <Text style={styles.sillyText}>
              
              {
                PROXIMITY_MESSAGES[locationProximity].silly[
                  Math.floor(
                    Math.random() *
                      PROXIMITY_MESSAGES[locationProximity].silly.length
                  )
                ]
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const radius = 7;

const styles = StyleSheet.create({
  sillyTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  sillyText: {
    fontSize: 16,
    textAlign: "center",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  touchableOpacityStyle: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
