import React, { Children } from 'react';
import { Animated } from 'react-native';
/**
 * Circle is a custom component that makes animation of circles as easy as passing an animated radius as a prop
 */
export default function Circle(props) {

  return (

      <Animated.View style={{
          backgroundColor: props.color,
          width: props.diameter,
          height: props.diameter,
          borderRadius: 200,
          justifyContent: 'center',
          alignItems: 'center',
      }}>
          {props.children}
      </Animated.View>

  );

}
