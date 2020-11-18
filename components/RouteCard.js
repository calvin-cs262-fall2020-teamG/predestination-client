import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
/**
 * RouteCard shows a route for keepers to manage, giving quick access to buttons such as edit and publish
 * TODO: styling
 */

export default function RouteCard({ data, pressPublish, pressEdit }) {
  return (
    // styles.box is for the box around the route name and buttons
    <View style={globalStyles.huntBox}>
       
      {/* <View style={styles.textView}> */} 
      <View>
        <Text style={globalStyles.keeperHuntName}> "{data.title}" </Text> 
      </View> 
      {/* seen in keeper list screen */} 
      <View style={globalStyles.publishEditButton}>
        <CustomButton
          title="Publish"
          onPress={() => {
            pressPublish(data);
          }}
        /> 
      </View> 
      <View style={globalStyles.publishEditButton}>
        <CustomButton
          title="Edit"
          onPress={() => {
            pressEdit(data);
          }}
        /> 
      </View> 
    </View>
  );
}

// const styles = StyleSheet.create({
//     textView: {
//         flex: 2,
//     },
// });
