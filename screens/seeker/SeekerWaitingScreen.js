import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import CustomButton from '../../components/CustomButton';

/**
 * SeekerWaitingScreen is shown to all seekers who joined a game that has not yet begun
 * TODO: styling, connecting to server, implement a countdown
 */
export default function SeekerWaitingScreen({ route, navigation }) {

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.seekerBodyText}>
        Waiting for game to start... {"\n"}The more the merrier!{"\n"}
      Share the code:
      </Text>
      <Text style={{textAlign: "center", fontFamily: "constan", fontSize: 40,}}>{ route.params.code }!</Text>
      {/* <TouchableOpacity style={globalStyles.seekerStartButton} onPress={ () => { navigation.navigate('SeekerGameTabStack', {screen: 'SeekerGameScreen'}); } }> */}
      <View>
        <CustomButton title="join" color="gold" onPress={() => navigation.navigate('SeekerGameTabStack', {screen: 'SeekerGameScreen'})}/>
      </View>
    </View>
  );

}