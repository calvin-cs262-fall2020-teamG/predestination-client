import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';

/**
 * SeekerWaitingScreen is shown to all seekers who joined a game that has not yet begun
 * TODO: styling, connecting to server, implement a countdown
 */
export default function SeekerWaitingScreen({ route, navigation }) {

  return (
    <View>
      <Text>Waiting for game to start... The more the merrier! Share the code { route.params.code }!</Text>
      <Button title='Start' onPress={ () => { navigation.navigate('SeekerGameScreen'); } }/>
    </View>
  );
  
}



