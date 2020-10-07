import React from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';

/**
 * RouteCard shows a route for keepers to manage, giving quick access to buttons such as edit and publish
 * TODO: styling
 */

export default function RouteCard({ data, pressPublish, pressEdit }) {
  
  return (
    // styles.box is for the box around the route name and buttons
    <View style={styles.box}>
      {/* Route name */}
      <View style={styles.textView}>
	    <Text>{data.title}</Text>
      </View>
      {/* Publish button */}
      <View style={styles.buttonView}>
	    <Button title="Publish" onPress={() => { pressPublish(data) }}/>
      </View>
      {/* Edit button */}
      <View style={styles.buttonView}>
	    <Button title="Edit" onPress={() => { pressEdit(data) }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: 'lightgray',
    },
    textView: {
        flex: 2,
    },
    buttonView: {
        flex: 1,
    },
});
