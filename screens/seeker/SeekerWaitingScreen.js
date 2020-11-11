import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import CustomButton from '../../components/CustomButton';
import FloatingView from '../../components/FloatingView';

/**
 * SeekerWaitingScreen is shown to all seekers who joined a game that has not yet begun
 * TODO: styling, connecting to server, implement a countdown
 */
export default function SeekerWaitingScreen({ route, navigation }) {

  const [timeLeft, setTimeLeft] = useState(13);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeLeft <= 0) {
        setDisabled(false);
      } else {
        setTimeLeft(timeLeft-1);
      }
    }, 1000)
    return () => clearInterval(timerId);
  }, [timeLeft])

  return (
    <View style={{ alignItems: 'center',  }}>

        <FloatingView title="Game will begin shortly" style={{ width: '90%', marginTop: '10%'}}>
          <Text>While you wait, share the game code with a friend! As they say, the more the merrier!</Text>
          
          <CustomButton style={{ marginTop: 20 }} title={disabled ? `${timeLeft}` : "Join"} disabled={disabled} onPress={disabled ? () => {} : () => navigation.navigate('SeekerGameTabStack', {screen: 'SeekerGameScreen'})}/>
        </FloatingView>

        <View>
        </View>

      {/* <Text style={globalStyles.seekerBodyText}>
        Waiting for game to start... {"\n"}The more the merrier!{"\n"}
      Share the code:
      </Text>
      <Text style={{textAlign: "center", fontFamily: "constan", fontSize: 40,}}>{ route.params.code }!</Text>
      { <TouchableOpacity style={globalStyles.seekerStartButton} onPress={ () => { navigation.navigate('SeekerGameTabStack', {screen: 'SeekerGameScreen'}); } }> }
      <View>
        <CustomButton title="join" color="gold" onPress={() => navigation.navigate('SeekerGameTabStack', {screen: 'SeekerGameScreen'})}/>
      </View> */}

    </View>
  );

}