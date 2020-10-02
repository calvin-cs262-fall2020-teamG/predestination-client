import React, { useState } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView, TextInput, View, Text, Button, StatusBar, TouchableOpacity, FlatList } from 'react-native';

/**
 * KeeperWaitingScreen is similar to the SeekerWaitingScreen, except the ability to start the game is added.
 * TODO: styling, maybe a countdown, list of people who joined
 */

export default function KeeperWaitingScreen({ navigation }) {

  const [players, setPlayers] = useState([]);

    const code = 624359;
    
    return (
	<View>
          <View>
            <Text>Keeper Waiting Screen. Code is {code}</Text>
          </View>
          
	  <View>
            <Text>Launch game now!</Text>
            <Button title="Launch" onPress={() => navigation.navigate('KeeperGameScreen')}/> 
          </View>

        </View>
    );
}

