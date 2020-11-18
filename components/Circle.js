import React, { Children, useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
/**
 * Circle is a custom component that makes animation of circles as easy as passing an animated radius as a prop
 */
export default function Circle(props) {
  const [waveOffset, setWaveOffset] = useState(new Animated.Value(0));

  const wave = () => {
    Animated.sequence([
      Animated.timing(waveOffset, {
        toValue: 0.03,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(waveOffset, {
        toValue: -0.03,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      wave();
    });
  };

  useEffect(() => {
    wave();
  }, []);

  const styles = {
    backgroundColor: props.color,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    width: props.screenWidth,
    height: props.screenWidth,
    position: "absolute",
  };

  return (
    <Animated.View
      style={[
        styles,
        {
          transform: [
            {
              scaleY: Animated.add(props.diameter, waveOffset),
              scaleX: Animated.add(props.diameter, waveOffset),
            },
          ],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
}
