import React, { Children } from 'react';
import { Animated } from 'react-native';
/**
 * Circle is a custom component that makes animation of circles as easy as passing an animated radius as a prop
 */
export default function Circle(props) {

  const thickness = 30;

  return (

      <Animated.View style={{
          backgroundColor: props.color,
          width: props.diameter,
          height: props.diameter,
          opacity: props.opacity,
          borderRadius: 200,
          justifyContent: 'center',
          alignItems: 'center',
      }}>
{/* 
          <Animated.View style={{
              backgroundColor: 'white',
              width: Animated.subtract(props.diameter, thickness),
              height: Animated.subtract(props.diameter, thickness),
              borderRadius: Animated.subtract(props.diameter, thickness),
              alignItems: 'center',
              justifyContent: 'center'
          }}> */}
                {props.children}
          {/* </Animated.View> */}
          
      </Animated.View>

  );

}
