import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';

/**
 * RouteCard shows a route for keepers to manage, giving quick access to buttons such as edit and publish
 * TODO: styling
 */

export default function RouteCard({ data, pressPublish, pressEdit }) {
  
  return (
    <View style={styles.box}>
      <View style={styles.textView}>
	<Text>{data.title}</Text>
      </View>
      
      <View style={styles.buttonView}>
	<Button title="Publish" onPress={() => { pressPublish(data) }}/>
      </View>

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
